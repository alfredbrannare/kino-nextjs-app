import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = () => {
  cookies().set('token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0
  });
  return NextResponse.json({ message: "Logged out" }, { status: 200 });
};