import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const POST = async (req) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

  const body = await req.json();
  const userMessage = body.msg;

  if (!userMessage) {
    return NextResponse.json(
      { error: "Missing 'msg' in JSON body" },
      { status: 400 }
    );
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      { type: "text", text: `Imagine you are a movie guru keep it short and funny. My question is: ${userMessage}` }
    ],
  });

  return NextResponse.json({ status: response.text }, { status: 200 });
};
