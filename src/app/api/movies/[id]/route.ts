import connectDB from '@/lib/mongodb';
import Movie from '@/models/model.movies';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string[] }> },
) => {
  await connectDB();
  const id = (await params).id;
  const movie = await Movie.findById(id);

  return new Response(JSON.stringify(movie), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string[] }> },
) => {
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
    const id = (await params).id;

    await Movie.findByIdAndDelete(id);
  } catch (error) {
    console.error(error);
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string[] }> },
) => {
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
