import connectDB from "@/lib/mongodb";
import Movie from "@/models/model.movies";
import { NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";

export const GET = async (req, { params }) => {
  const id = await params.id;
  await connectDB();
  const movie = await Movie.findById(id);

  return new Response(JSON.stringify(movie), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const DELETE = async (req, { params }) => {
  await connectDB();
  const authenticatedUser = await checkAuth(req);

  if (!authenticatedUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const isAdmin = authenticatedUser.role === "admin";

  if (!isAdmin) {
    return NextResponse.json(
      { message: "You dont have the right to use this feature!" },
      { status: 403 }
    );
  }

  try {
    const id = params.id;

    await Movie.findByIdAndDelete(id);
  } catch (error) {
    console.error(error);
  }
};

export const PUT = async (req, { params }) => {
  await connectDB();
  const authenticatedUser = await checkAuth(req);

  if (!authenticatedUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const isAdmin = authenticatedUser.role === "admin";

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
