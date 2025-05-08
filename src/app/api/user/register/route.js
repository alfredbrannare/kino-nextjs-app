import connectDB from "src/lib/mongodb";
import bcrypt from "bcrypt";
import User from "src/models/model.users.js";
import jwt from "jsonwebtoken";
import { checkAuth } from "src/lib/auth";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  await connectDB();

  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json({ message: "Name, email, and password are required" }, { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: "User with this email already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);
  
  // const isPasswordValid =
  //   await bcrypt.compare('test', hashedPassword);

  const newUser = await User.create({
    name: body.name,
    email: body.email,
    hashedPassword: hashedPassword,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return NextResponse.json({
    message: "User is registered successfully",
    user: {id: newUser.id, name: newUser.name, email: newUser.email, token},
  }, {status: 201})
};