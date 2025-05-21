import { NextResponse } from "next/server";
import connectDB from "src/lib/mongodb";
import Offer from "src/models/model.offer";
import { checkAuth } from "src/lib/auth";

export async function GET() {
  await connectDB();
  const offers = await Offer.find();
  return NextResponse.json({ offers });
}

export async function POST(req) {
  try {
    await connectDB();
    const user = await checkAuth(req);
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { offer } = await req.json();
    if (!offer || !offer.trim()) {
      return NextResponse.json({ error: "Offer text is required" }, { status: 400 });
    }

    const newOffer = new Offer({ text: offer });
    await newOffer.save();

    return NextResponse.json(newOffer);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}