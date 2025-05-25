import connectDB from "src/lib/mongodb";
import bcrypt from "bcrypt";
import User from "src/models/model.users.js";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectDB();

    const body = await req.json();
    const { name, email, password, passwordRepeat } = body;

    if (!name || !email || !password || !passwordRepeat) {
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

    if (password !== passwordRepeat) {
      return NextResponse.json(
        {
          message: "The passwords are not the same",
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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const newUser = await User.create({
      name: body.name,
      email: body.email,
      hashedPassword: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, //Otherwise the cookie will disappear after closing the web browser
    });

    return NextResponse.json(
      {
        status: true,
        message: "User register successful",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: `Error: ${error}` }, { status: 500 });
  }
};
