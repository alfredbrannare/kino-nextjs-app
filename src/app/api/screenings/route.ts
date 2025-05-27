import connectDB from "@/lib/mongodb";
import Screening from "@/models/model.screenings";
import { checkAuth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const movieId = searchParams.get("movieId");

    const query = movieId ? { movieId } : {};
    const screenings = await Screening.find(query).populate("movieId", "title")
    .populate("auditoriumId", "name")
    .populate("bookedSeats", "seats");

    return new Response(JSON.stringify(screenings), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error('Error in /api/screenings:', error);
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const POST = async (req) => {
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
    const body = await req.json();
    console.log("Received request body:", body);

    if (!body.movieId || !body.auditoriumId || !body.startTime) {
      return new Response(
        JSON.stringify({
          status: "movieId, auditoriumIdis and startTime is required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const screening = new Screening({
      movieId: body.movieId,
      auditoriumId: body.auditoriumId,
      startTime: body.startTime
    });

    await screening.save();
    return new Response(JSON.stringify(screening), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(
      JSON.stringify({
        status: "Server is not responding.",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
