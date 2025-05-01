import connectDB from "src/lib/mongodb";
import Movie from "src/models/model.movies.js";
import { checkAuth } from "src/lib/auth";
import { NextResponse } from "next/server"; // Import NextResponse

export const GET = async () => {
  try {
    await connectDB();
    const movies = await Movie.find();
    return new Response(JSON.stringify(movies), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const POST = async (req) => {
  await connectDB();

  if (!checkAuth(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    console.log("Received request body:", body);

    if (!body.id) {
      return new Response(
        JSON.stringify({
          status: "IMDb film ID is required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const response = await fetch(
      `http://www.omdbapi.com/?i=${body.id}&apikey=${process.env.OMDB}`
    );
    const data = await response.json();

    if (data.Error) {
      return NextResponse.json(
        { status: "IMDb ID is invalid or OMDb API error." },
        { status: 400 }
      );
    }

    const movie = new Movie({
      title: data.Title,
      description: data.Plot,
      year: parseInt(data.Year),
      image: data.Poster,
      rating: parseFloat(data.imdbRating),
    });

    // Kolar om filmen finns redan i databasen
    const existing = await Movie.findOne({ title: data.Title });
    if (existing) {
      return new Response(
        JSON.stringify({
          status: "Movie already exists in the database.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    // Sparar till databasen och returnerar response
    await movie.save();
    return new Response(JSON.stringify(movie), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(
      JSON.stringify({
        status: "IMDb ID is invalid or the OMDb API is not responding.",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
