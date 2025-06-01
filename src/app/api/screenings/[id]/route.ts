import connectDB from '@/lib/mongodb';
import '@/models/model.movies';
import '@/models/model.booking';
import '@/models/model.auditorium';
import Screening from '@/models/model.screenings';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';
import Movie from '@/models/model.movies';

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string[] }> },
) => {
  const id = (await params).id;
  await connectDB();
  const screenings = await Screening.findById(id)
    .populate('movieId', 'title')
    .populate('auditoriumId', 'name slug capacity seats');

  return new Response(JSON.stringify(screenings), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string[] }> },
) => {
  try {
    await connectDB();
    const authenticatedUser = await checkAuth();

    if (!authenticatedUser || !authenticatedUser.role.includes('admin')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const id = (await params).id;
    const deleted = await Screening.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: 'Screening not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: 'Deleted' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string[] }> },
) => {
  await connectDB();
  const authenticatedUser = await checkAuth();
  console.log(authenticatedUser);

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

  const id = (await params).id;
  const body = await req.json();
  const { inCinemas } = body;

  const updatedMovie = await Movie.findByIdAndUpdate(
    id,
    { inCinemas },
    { new: true, runValidators: true },
  );

  return NextResponse.json(updatedMovie, { status: 200 });
};
