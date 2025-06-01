import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/model.users';
import { checkAuth } from '@/lib/auth';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE() {
  try {
    await connectDB();

    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await cloudinary.uploader.destroy(`profile_pics/user_${user._id}`);

    await User.findByIdAndUpdate(user._id, { $unset: { profilePicture: '' } });

    return NextResponse.json({ message: 'Profile image removed.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to remove profile image.' },
      { status: 500 },
    );
  }
}
