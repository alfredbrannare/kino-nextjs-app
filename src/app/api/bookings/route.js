import connectDB from "src/lib/mongodb";
import Booking from "src/models/model.booking.js";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const movieId = searchParams.get('movieId');
    const screeningTime = searchParams.get('screeningTime');

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
    const { movieId, screeningTime, seats, userId } = body;

    try {
        await connectDB();
        const booking = await Booking.create({ movieId, screeningTime, seats, userId });
        return Response.json(booking, { status: 201 });
    } catch (err) {
        console.error('Booking error', err);
        return Response.json({ error: 'Något gick fel'}, { status: 500 });
    }
}