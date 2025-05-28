import connectDB from "@/lib/mongodb";
import bcrypt from "bcrypt";
import User from "@/models/model.users";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email, and password are required" },
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

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message: "User is not valid",
        },
        { status: 400 }
      );
    }

    if(!process.env.JWT_SECRET){
      throw new Error("JWT TOKEN IS NOT DEFINED");
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (isPasswordValid) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
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
          message: "User logging successful",
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
  } catch (error) {
    return NextResponse.json(
      {
        message: `Error: ${error}`,
      },
      { status: 500 }
    );
  }
};
