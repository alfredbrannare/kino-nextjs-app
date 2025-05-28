import connectDB from "src/lib/mongodb";
import Screening from "src/models/model.screenings";
import { NextResponse } from "next/server";
import { checkAuth } from "src/lib/auth";
import Movie from "src/models/model.movies";
import Auditorium from "src/models/model.auditorium";

export const GET = async (req, { params }) => {
  const id = await params.id;
  await connectDB();
  const screenings = await Screening.findById(id).populate("movieId", "title")
  .populate("auditoriumId", "name seats");

  return new Response(JSON.stringify(screenings), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const DELETE = async (req, { params }) => {
  try {
    await connectDB();
    const authenticatedUser = await checkAuth(req);

    if (!authenticatedUser || !authenticatedUser.role.includes('admin')) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const id = params.id;
    const deleted = await Screening.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "Screening not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

export const PUT = async (req, { params }) => {
  await connectDB();
  const authenticatedUser = await checkAuth(req);
  console.log(authenticatedUser);

  if (!authenticatedUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const isAdmin = authenticatedUser.role.includes('admin');

  if (!isAdmin) {
    return NextResponse.json(
      { message: "You dont have the right to use this feature!" },
      { status: 403 }
    );
  }

  const id = params.id;
  const body = await req.json();
  const { inCinemas } = body;

  const updatedMovie = await Movie.findByIdAndUpdate(
    id,
    { inCinemas },
    { new: true, runValidators: true }
  );

  return NextResponse.json(updatedMovie, { status: 200 });
};
