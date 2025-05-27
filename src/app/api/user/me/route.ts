import connectDB from "../../../../lib/mongodb";
import { checkAuth } from "../../../../lib/auth";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectDB();
    const authenticatedUser = await checkAuth(req);

    if (!authenticatedUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      {
        name: authenticatedUser.name,
        email: authenticatedUser.email,
        role: authenticatedUser.role,
        benefits: authenticatedUser.benefits,
        profilePicture: authenticatedUser.profilePicture || '',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error:", error: error.message },
      { status: 500 }
    );
  }
};
