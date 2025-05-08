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

  const authenticatedUser = await checkAuth(req);
  const isAdmin = authenticatedUser.role.includes('admin');

  if (!authenticatedUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!isAdmin) {
    return NextResponse.json({ message: "You dont have the right to use this feature!" }, { status: 401 });
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
      `https://api.themoviedb.org/3/movie/${body.id}?api_key=${process.env.TMDB}&language=en-EN`
      // `http://www.omdbapi.com/?i=${body.id}&apikey=${process.env.OMDB}`
    );
    const data = await response.json();
    if (data.Error) {
      return NextResponse.json(
        { status: "IMDb ID is invalid or OMDb API error." },
        { status: 400 }
      );
    }

    const movie = new Movie({
      title: data.title,
      description: data.overview,
      year: data.release_date,
      image: `https://image.tmdb.org/t/p/original/${data.poster_path}`,
      rating: data.vote_average,
    });

    // Kolar om filmen finns redan i databasen
    const existing = await Movie.findOne({ title: data.title });
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