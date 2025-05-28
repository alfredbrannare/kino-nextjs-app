import connectDB from "@/lib/mongodb";
import bcrypt from "bcrypt";
import User from "@/models/model.users";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req: Request) => {
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

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

    if(!process.env.JWT_SECRET){
      throw new Error('JWT SECRET NOT FOUND!')
    }
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
