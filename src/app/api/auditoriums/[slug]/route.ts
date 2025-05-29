import connectDB from "@/lib/mongodb";
import Auditorium from "@/models/model.auditorium";
import { Context } from "@/ts/types";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest, context: Context) {
  const slug = context.params.slug;

  try {
    await connectDB();
    const auditorium = await Auditorium.findOne({ slug });

    if (!auditorium) {
      return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(auditorium), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET /api/auditoriums/[slug] error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
