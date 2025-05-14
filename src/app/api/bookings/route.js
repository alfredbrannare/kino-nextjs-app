import connectDB from "src/lib/mongodb";
import Booking from "src/models/model.booking.js";

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

export async function  POST(request) {
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

        const booking = await Booking.create({ movieId, screeningTime, seats, userId, auditorium, totalPrice });
        return Response.json(booking, { status: 201 });
    } catch (err) {
        console.error('Booking error', err);
        return Response.json({ error: 'Något gick fel'}, { status: 500 });
    }
}