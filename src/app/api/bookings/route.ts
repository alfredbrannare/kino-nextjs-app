import connectDB from '@/lib/mongodb';
import Booking from '@/models/model.booking';
import Movie from '@/models/model.movies';
import Auditorium from '@/models/model.auditorium';
import Screening from '@/models/model.screenings';
import { checkAuth } from '@/lib/auth';
import User from '@/models/model.users';
import { NextRequest } from 'next/server';
import { BookingType, Seat } from '@/ts/types';
import { DiscountType } from '@/ts/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get('movieId');
  const screeningTime = searchParams.get('screeningTime');
  const auditoriumSlug = searchParams.get('auditorium');

  try {
    await connectDB();
    
    if (!auditoriumSlug || !movieId || !screeningTime) {
      return Response.json(
        { error: 'Missing required query parameters: auditorium, movieId, or screeningTime' },
        { status: 400 },
      );
    }

    const auditorium = await Auditorium.findOne({ slug: auditoriumSlug });
    if (!auditorium) {
      return Response.json({ error: 'Salong hittades inte' }, { status: 404 });
    }
    
    const screening = await Screening.findOne({
      movieId,
      startTime: new Date(screeningTime),
      auditoriumId: auditorium._id,
    });

    if (!screening) {
      return Response.json([], { status: 200 });
    }

    const bookings = await Booking.find({
      _id: { $in: screening.bookedSeats },
    });

    const allSeats = bookings.flatMap((b) => b.seats);
    return Response.json(allSeats);
  } catch (err) {
    console.error('GET /bookings error:', err);
    return Response.json({ error: 'Något gick fel' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const authenticatedUser = await checkAuth();
    const userId = authenticatedUser?._id || null;

    const body = await request.json();
    const { movieId, screeningTime, seats, auditorium, ticketInfo } = body;

    if (!movieId || !screeningTime || !seats || !auditorium || !ticketInfo) {
      return Response.json(
        { error: 'Missing required booking fields' },
        { status: 400 },
      );
    }

    //Controls that seats aren't booked already
    const existing = await Booking.find({ movieId, screeningTime, auditorium });
    const alreadyBooked: Seat[] = existing.flatMap((b) => b.seats);

    const isOverlap = seats.some((incoming: Seat) =>
      alreadyBooked.some(
        (booked) =>
          booked.row === incoming.row && booked.seat === incoming.seat,
      ),
    );

    if (isOverlap) {
      return Response.json(
        { error: 'One or more seats already booked' },
        { status: 409 },
      );
    }

    //Price calculation
    const basePrice = 140;
    const discounts: Record<DiscountType, number> = {
      ordinary: 1,
      child: 0.8, // 20% discount
      retired: 0.8, // 20% discount
      student: 0.85, // 15% discount
      member: 0.75, // 25% discount
    };

    let totalPrice = 0;
    for (const [type, value] of Object.entries(ticketInfo)) {
      const count = Number(value);
      const discount = discounts[type as DiscountType] || 1;
      totalPrice += count * basePrice * discount;
    }

    // Seat label
    const labeledSeats = [];
    const seatQueue = [...seats];

    for (const [type, value] of Object.entries(ticketInfo)) {
      const count = Number(value);
      for (let i = 0; i < count; i++) {
        const seat = seatQueue.shift();
        if (!seat) break;
        labeledSeats.push({ ...seat, type });
      }
    }

    // Create booking
    const bookingData: BookingType = {
      movieId,
      screeningTime,
      seats: labeledSeats,
      auditorium,
      totalPrice,
    };

    if (userId) {
      bookingData.userId = userId;
    }

    const booking = await Booking.create(bookingData);

    if (userId) {
      await User.findByIdAndUpdate(
        userId,
        { $inc: { points: totalPrice } },
        { new: true },
      );
    }

    // Get movie title
    const movie = await Movie.findById(movieId);

    // Get auditoriumId
    const auditoriumDoc = await Auditorium.findOne({ slug: auditorium });
    if (!auditoriumDoc) {
      return Response.json({ error: 'Auditorium not found' }, { status: 404 });
    }

    // Add booking to Screening.bookedSeats[]
    await Screening.findOneAndUpdate(
      {
        movieId,
        startTime: new Date(screeningTime),
        auditoriumId: auditoriumDoc._id,
      },
      {
        $push: { bookedSeats: booking._id },
      },
    );

    // Return booking + movie title
    return Response.json(
      {
        booking,
        movieTitle: movie?.title || 'Okänd titel',
      },
      { status: 201 },
    );
  } catch (err) {
    console.error('Booking error', err);
    return Response.json({ error: 'Något gick fel' }, { status: 500 });
  }
}
