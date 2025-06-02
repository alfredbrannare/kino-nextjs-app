import connectDB from '@/lib/mongodb';
import Screening from '@/models/model.screenings';
import { checkAuth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import Movie from '@/models/model.movies';

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const movieId = searchParams.get('movieId');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const query = {
      ...(movieId && { movieId }),
      startTime: { $gte: today },
    };
    const screenings = await Screening.find(query)
      .populate('movieId', 'title')
      .populate('auditoriumId', 'name slug capacity')
      .populate('bookedSeats', 'seats');

    return new Response(JSON.stringify(screenings), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in /api/screenings:', error);
    return new Response(JSON.stringify({ error: 'Database error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST = async (req: NextRequest) => {
  await connectDB();

  const authenticatedUser = await checkAuth();

  if (!authenticatedUser) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const isAdmin = authenticatedUser.role.includes('admin');

  if (!isAdmin) {
    return NextResponse.json(
      { message: 'You dont have the right to use this feature!' },
      { status: 403 },
    );
  }

  try {
    const body = await req.json();
    console.log('Received request body:', body);
    const { movieId, auditoriumId, startTime } = body;

if (!body.movieId || !body.auditoriumId || !body.startTime) {
  return NextResponse.json(
    { message: 'movieId, auditoriumId and startTime are required' },
    { status: 400 },
  );
}
        
            const movie = await Movie.findById(movieId);
            if (!movie) {
              return NextResponse.json({ message: 'Movie not found' }, { status: 404 });
            }
        
            const durationMinutes = parseInt(movie.runtime, 10);
            const duration = isNaN(durationMinutes) ? 120 : durationMinutes;
        
            const start = new Date(startTime);
            const end = new Date(start.getTime() + duration * 60000);
        
            const conflict = await Screening.findOne({
              auditoriumId,
              startTime: { $lt: end },
            }).where('startTime').gt(start.getTime() - duration * 60000);
        
            if (conflict) {
              return NextResponse.json(
                { message: 'There is already a screening in this auditorium at that time.' },
                { status: 409 }
      );
    }

    const screening = new Screening({
      movieId: body.movieId,
      auditoriumId: body.auditoriumId,
      startTime: body.startTime,
    });

    await screening.save();
    return new Response(JSON.stringify(screening), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
  console.error('Error creating screening:', err);
  return NextResponse.json(
    { message: 'Server error while creating screening.' },
    { status: 500 },
  );
}
};
