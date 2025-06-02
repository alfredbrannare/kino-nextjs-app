import connectDB from '@/lib/mongodb';
import Movie from '@/models/model.movies';
import Screenings from '@/models/model.screenings';
import '@/models/model.auditorium';
import { BookingType } from '@/ts/types';

type EnrichedScreening = {
  _id: string;
  startTime: Date;
  auditorium: {
    name: string;
    slug: string;
  };
  availableSeats: number;
  bookedCount: number;
};

export const GET = async () => {
  try {
    await connectDB();

    const movies = await Movie.find();

    const screenings = await Screenings.find({
      startTime: { $gte: new Date() },
    }) // only future screenings
      .populate('movieId')
      .populate('auditoriumId')
      .populate({
        path: 'bookedSeats',
        populate: {
          path: 'seats',
        },
      });

    // Group screenings by movie
    const screeningsByMovie: Record<string, EnrichedScreening[]> = {};
    for (const screening of screenings) {
      const movieId = screening.movieId._id.toString();

      const bookedCount = screening.bookedSeats?.reduce(
        (sum: number, booking: BookingType) =>
          sum + (booking.seats?.length || 0),
        0,
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

    const result = movies.map((movie) => ({
      ...movie.toObject(),
      screenings: screeningsByMovie[movie._id.toString()] || [],
    }));

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in /api/movies-with-screenings:', error);
    return new Response(JSON.stringify({ error: 'Server error' + error }), {
      status: 500,
    });
  }
};
