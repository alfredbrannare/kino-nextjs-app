import connectDB from "src/lib/mongodb";
import Movie from "src/models/model.movies.js";

export const GET = async (req, { params }) => {
  const id = await params.id;
  await connectDB();
  const movie = await Movie.findById(id);

  return new Response(JSON.stringify(movie), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const DELETE = async (req, { params }) => {
  try {
    const id = params.id;
    await connectDB();

    await Movie.findByIdAndDelete(id);
  }catch(error){
    console.error(error);
  }
};