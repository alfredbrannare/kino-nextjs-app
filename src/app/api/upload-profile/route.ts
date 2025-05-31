import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/model.users';
import { checkAuth } from '@/lib/auth';
import { v2 as cloudinary } from 'cloudinary';
import type { UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const user = await checkAuth();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'profile_pics',
            public_id: `user_${user._id}`,
            overwrite: true,
          },
          (error, result) => {
            if (error || !result) return reject(error);
            resolve(result);
          },
        );

        stream.end(buffer);
      },
    );

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { profilePicture: uploadResult.secure_url },
      { new: true },
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found for update' },
        { status: 404 },
      );
    }

    return NextResponse.json({ profilePicture: updatedUser.profilePicture });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
}
