import connectDB from "src/lib/mongodb";
import Movie from "src/models/model.movies";
import Screening from "src/models/model.screenings";
import Auditorium from "src/models/model.auditorium";

export const GET = async () => {
  try {
    await connectDB();

    const movies = await Movie.find();

    const screenings = await Screening.find({ startTime: { $gte: new Date() } }) // only future screenings
      .populate("movieId")
      .populate("auditoriumId")
      .populate({
        path: "bookedSeats",
        populate: {
          path: "seats",
        },
      });

    // Group screenings by movie
    const screeningsByMovie = {};
    for (const screening of screenings) {
      const movieId = screening.movieId._id.toString();

      const bookedCount = screening.bookedSeats?.reduce(
        (sum, booking) => sum + (booking.seats?.length || 0),
        0
      );

      const totalSeats = screening.auditoriumId?.seats?.length || 100;
      const availableSeats = totalSeats - bookedCount;

      const enriched = {
        _id: screening._id,
        startTime: screening.startTime,
        auditorium: {
          name: screening.auditoriumId.name,
          slug: screening.auditoriumId.slug,
        },
        availableSeats,
        bookedCount,
      };

      if (!screeningsByMovie[movieId]) {
        screeningsByMovie[movieId] = [];
      }

      screeningsByMovie[movieId].push(enriched);
    }

    // Combine movies with their screenings
    const result = movies.map((movie) => ({
      ...movie.toObject(),
      screenings: screeningsByMovie[movie._id.toString()] || [],
    }));

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in /api/movies-with-screenings:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
};