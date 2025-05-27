import { checkAuth } from "../../../../lib/auth";
import Booking from "@/models/model.booking";
import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";

export const GET = async (req) => {
  try {
    await connectDB();
    const authenticatedUser = await checkAuth(req);

    if (!authenticatedUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = authenticatedUser._id;

    const bookings = await Booking.find({ userId }).populate("movieId", "title");
    return new Response(JSON.stringify(bookings), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Error gettings users:${error}` }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
