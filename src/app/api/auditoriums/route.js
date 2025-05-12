import connectDB from "src/lib/mongodb";
import Auditorium from "src/models/model.auditorium";

export const GET = async () => {
  try {
    await connectDB();
    const auditorium = await Auditorium.find();
    return new Response(JSON.stringify(auditorium), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Database error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
