import connectDB from 'src/lib/mongodb';
import LiveEvents from 'src/models/model.live_events';
import { checkAuth } from 'src/lib/auth';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        await connectDB();
        const events = await LiveEvents.find();
        console.log(events)
        return NextResponse.json(events, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
};

export const POST = async (req) => {
    await connectDB();
    const authenticatedUser = await checkAuth(req);

    if (!authenticatedUser) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    if (authenticatedUser.role !== "admin") {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    try {
        const body = await req.json();
        const { title, date, time, description, image, genre } = body;

        if (!title || !date || !time || !description || !image || !genre) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const existing = await LiveEvents.findOne({ title, date });
        if (existing) {
            return NextResponse.json(
                { message: "Event already exists" },
                { status: 409 }
            );
        }

        const event = new LiveEvents({ title, date, time, description, image, genre });
        await event.save();

        return NextResponse.json({ event }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};