import connectDB from "@/lib/mongodb";
import Booking from "@/models/model.booking.js";
import Movie from "@/models/model.movies.js";
import Auditorium from "@/models/model.auditorium";
import Screening from "@/models/model.screenings";
import { checkAuth } from "@/lib/auth";
import User from "@/models/model.users.js";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const movieId = searchParams.get('movieId');
    const screeningTime = searchParams.get('screeningTime');
    const auditorium = searchParams.get('auditorium');

    try {
        await connectDB();
        const bookings = await Booking.find({ movieId, screeningTime });

        const allSeats = bookings.flatMap((b) => b.seats);
        return Response.json(allSeats);
    } catch (err) {
        console.error('GET /bookings error:', err);
        return Response.json({ error: 'Något gick fel'}, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();

        const authenticatedUser = await checkAuth();
        const userId = authenticatedUser?._id || null;

        const body = await request.json();
        const { movieId, screeningTime, seats, auditorium, ticketInfo } = body;

        if (!movieId || !screeningTime || !seats || !auditorium || !ticketInfo) {
            return Response.json({ error: "Missing required booking fields" }, { status: 400 });
        }

        //Controls that seats aren't booked already
        const existing = await Booking.find({ movieId, screeningTime, auditorium });
        const alreadyBooked = existing.flatMap(b => b.seats);

        const isOverlap = seats.some(incoming =>
             alreadyBooked.some(booked => booked.row === incoming.row && booked.seat === incoming.seat));

        if (isOverlap) {
            return Response.json({ error: "One or more seats already booked" }, { status: 409 });
        }

        //Price calculation
        const basePrice = 140;
        const discounts = {
            child: 0.80, // 20% discount
            retired: 0.80, // 20% discount
            student: 0.85,  // 15% discount
            member: 0.75,   // 25% discount
        };

        let totalPrice = 0;
        for (const [type, count] of Object.entries(ticketInfo)) {
            const discount = discounts[type] || 1;
            totalPrice += count * basePrice * discount;
        }

        // Seat label
        const labeledSeats = [];
        const seatQueue = [...seats];

        for (const [type, count] of Object.entries(ticketInfo)) {
            for (let i = 0; i < count; i++) {
                const seat = seatQueue.shift();
                if (!seat) break;
                labeledSeats.push({ ...seat, type });
            }
        }

        // Create booking
        const bookingData = {
            movieId,
            screeningTime,
            seats: labeledSeats,
            auditorium,
            totalPrice
        };

        if (userId) {
            bookingData.userId = userId;
        }

        const booking = await Booking.create(bookingData);

        if (userId) {
            await User.findByIdAndUpdate(
                userId,
                { $inc: { points: totalPrice } },
                { new: true }
            );
        }

        // Get movie title
        const movie = await Movie.findById(movieId);

        // Get auditoriumId
        const auditoriumDoc = await Auditorium.findOne({ slug: auditorium });
        if (!auditoriumDoc) {
            return Response.json({ error: "Auditorium not found" }, { status: 404 });
        }

        // Add booking to Screening.bookedSeats[]
        await Screening.findOneAndUpdate(
            {
            movieId,
            startTime: new Date(screeningTime),
            auditoriumId: auditoriumDoc._id
            },
            {
            $push: { bookedSeats: booking._id }
            }
        );

        // Return booking + movie title
        return Response.json({
            booking,
            movieTitle: movie?.title || "Okänd titel"
        }, { status: 201 });

        } catch (err) {
        console.error('Booking error', err);
        return Response.json({ error: 'Något gick fel' }, { status: 500 });
    }
}