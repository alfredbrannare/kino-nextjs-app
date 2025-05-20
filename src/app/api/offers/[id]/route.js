import { NextResponse } from "next/server";
import connectDB from "src/lib/mongodb";
import Offer from "src/models/model.offer";
import { checkAuth } from "src/lib/auth";

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const user = await checkAuth(req);
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    await Offer.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}