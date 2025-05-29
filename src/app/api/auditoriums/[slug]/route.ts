import connectDB from "@/lib/mongodb";
import Auditorium from "@/models/model.auditorium";
import { Context } from "@/ts/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, context: Context) {
  const slug = context.params.slug;

  try {
    await connectDB();
    const auditorium = await Auditorium.findOne({ slug });

    if (!auditorium) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(auditorium, { status: 200 });
  } catch (error) {
    console.error("GET /api/auditoriums/[slug] error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
