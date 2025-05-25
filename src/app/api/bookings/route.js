import connectDB from "src/lib/mongodb";
import Booking from "src/models/model.booking.js";
import Movie from "src/models/model.movies.js";
import Auditorium from "src/models/model.auditorium";
import Screening from "src/models/model.screenings";

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
    const body = await request.json();
    const { movieId, screeningTime, seats, userId, auditorium, ticketInfo } = body;

    if (!movieId || !screeningTime || !seats || !auditorium || !ticketInfo) {
        return Response.json({ error: "Missing required booking fields" }, { status: 400 });
    }

    try {
        await connectDB();

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
        const booking = await Booking.create({
            movieId,
            screeningTime,
            seats: labeledSeats,
            userId: '6820d93969eddb5ac9ed9f95',
            auditorium,
            totalPrice
        });

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