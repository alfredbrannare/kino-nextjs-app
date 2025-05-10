import connectDB from "src/lib/mongodb";
import bcrypt from "bcrypt";
import User from "src/models/model.users.js";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  await connectDB();

  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Name, email, and password are required" },
      { status: 400 }
    );
  }

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!validateEmail(email)) {
    return NextResponse.json(
      {
        message: "Invalid email format",
      },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      {
        message: "Password should be longer than 6 characters",
      },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "User with this email already exists" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await User.create({
    name: body.name,
    email: body.email,
    hashedPassword: hashedPassword,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return NextResponse.json(
    {
      message: "User is registered successfully",
      user: { id: newUser.id, name: newUser.name, email: newUser.email, token },
    },
    { status: 201 }
  );
};
