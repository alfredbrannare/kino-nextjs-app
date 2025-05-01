import connectDB from "src/lib/mongodb";
import Movie from "src/models/model.movies.js";

export const GET = async (req, { params }) => {
  const id = params.id;
  await connectDB();

  console.log("Params id:", id);
  const movie = await Movie.findById(id);

  return new Response(JSON.stringify(movie), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
