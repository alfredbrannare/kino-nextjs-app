import connectDB from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';
import Event from '@/models/model.events';

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string[] }> },
) => {
  await connectDB();
  const id = (await params).id;

  const movie = await Event.findById(id);

  return new Response(JSON.stringify(movie), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const DELETE = async (
  _req: NextRequest,
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
    const result = await Event.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }
    return NextResponse.json(
      { message: 'Event deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error during deletion' },
      { status: 500 },
    );
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

  const { title, time, date, image, description } = body;

  const updatedEvent = await Event.findByIdAndUpdate(
    id,
    {
      title,
      time,
      date,
      image,
      description,
    },
    { new: true, runValidators: true },
  );

  return NextResponse.json(updatedEvent, { status: 200 });
};
