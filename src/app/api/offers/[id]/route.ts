import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Offer from '@/models/model.offer';
import { checkAuth } from '@/lib/auth';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string[] }> },
) {
  try {
    await connectDB();
    const user = await checkAuth();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = (await params).id;
    await Offer.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
