import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";
import LiveEvents from "@/models/model.live_events";

export const GET = async (req, { params }) => {
    const id = await params.id;
    await connectDB();
    const movie = await LiveEvents.findById(id);

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
        const result = await LiveEvents.findByIdAndDelete(id);
        if (!result) {
            return NextResponse.json({ message: "Live event not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Live event deleted successfully" }, { status: 200 });
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

    const { title, time, date, image, genre, runtime, description } = body;

    const updatedEvent = await LiveEvents.findByIdAndUpdate(
        id,
        {
            title,
            time,
            date,
            image,
            genre,
            runtime,
            description,
        },
        { new: true, runValidators: true }
    );

    return NextResponse.json({ message: `Event "${updatedEvent.title}" was successfully updated!`, event: updatedEvent },
        { status: 200 });
};

