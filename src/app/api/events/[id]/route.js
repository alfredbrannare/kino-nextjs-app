import connectDB from "src/lib/mongodb";
import { NextResponse } from "next/server";
import { checkAuth } from "src/lib/auth";
import Event from "src/models/model.events";

export const GET = async (req, { params }) => {
    const id = await params.id;
    await connectDB();
    const movie = await Event.findById(id);

    return new Response(JSON.stringify(movie), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
};

export const DELETE = async (req, { params }) => {
    await connectDB();
    const authenticatedUser = await checkAuth(req);

    if (!authenticatedUser) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = authenticatedUser.role === "admin";

    if (!isAdmin) {
        return NextResponse.json(
            { message: "You dont have the right to use this feature!" },
            { status: 403 }
        );
    }

    try {
        const id = params.id;
        const result = await Event.findByIdAndDelete(id);
        if (!result) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse({ message: "Internal server error during deletion" }, { status: 500 });
    }
};

export const PUT = async (req, { params }) => {
    await connectDB();
    const authenticatedUser = await checkAuth(req);

    if (!authenticatedUser) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = authenticatedUser.role === "admin";

    if (!isAdmin) {
        return NextResponse.json(
            { message: "You dont have the right to use this feature!" },
            { status: 403 }
        );
    }

    const id = params.id;
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
        { new: true, runValidators: true }
    );

    return NextResponse.json(updatedEvent, { status: 200 });
};

