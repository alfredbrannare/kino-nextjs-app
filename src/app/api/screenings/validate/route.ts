import connectDB from "@/lib/mongodb";
import Screening from "@/models/model.screenings";
import Auditorium from "@/models/model.auditorium";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const movieId = searchParams.get("movieId");
    const screeningTime = searchParams.get("screeningTime");
    const auditoriumSlug = searchParams.get("auditorium");

    if (!movieId || !screeningTime || !auditoriumSlug) {
      return new Response(JSON.stringify({ error: "Missing parameters" }), { status: 400 });
    }

    const auditorium = await Auditorium.findOne({ slug: auditoriumSlug });
    if (!auditorium) {
      return new Response(JSON.stringify({ error: "Auditorium not found" }), { status: 404 });
    }

    const screening = await Screening.findOne({
      movieId,
      startTime: new Date(screeningTime),
      auditoriumId: auditorium._id,
    });

    if (!screening) {
      return new Response(JSON.stringify({ error: "Screening not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ valid: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in /api/screenings/validate:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
