import connectDB from "src/lib/mongodb";
import bcrypt from "bcrypt";
import User from "src/models/model.users.js";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  await connectDB();

  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email, and password are required" },
      { status: 400 }
    );
  }

  const user = await User.findOne({ email });

  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

  if (isPasswordValid) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return NextResponse.json(
      {
        message: "User logging successful",
        user: {
          token,
        },
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      {
        message: "Password is not valid",
      },
      { status: 400 }
    );
  }
};
