import connectDB from '../../../lib/mongodb';
import Event from '@/models/model.events';
import { checkAuth } from '../../../lib/auth';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        await connectDB();
        const events = await Event.find();
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
    if (!authenticatedUser.role.includes('admin')) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    try {
        const body = await req.json();
        const { title, date, time, description, image } = body;

        if (!title || !date || !time || !description || !image) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const existing = await Event.findOne({ title, date });
        if (existing) {
            return NextResponse.json(
                { message: "Event already exists" },
                { status: 409 }
            );
        }

        const event = new Event({ title, date, time, description, image });
        await event.save();

        return NextResponse.json({ event }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};