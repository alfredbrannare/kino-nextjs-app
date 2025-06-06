import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Offer from '@/models/model.offer';
import { checkAuth } from '@/lib/auth';

export async function GET() {
  await connectDB();
  const offers = await Offer.find();
  return NextResponse.json({ offers });
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const user = await checkAuth();
    if (!user || !user.role.includes('admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { offer } = await req.json();
    if (!offer || !offer.trim()) {
      return NextResponse.json(
        { error: 'Offer text is required' },
        { status: 400 },
      );
    }

    const newOffer = new Offer({ text: offer });
    await newOffer.save();

    return NextResponse.json(newOffer);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
