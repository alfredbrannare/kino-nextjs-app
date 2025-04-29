import Movie from "../models/model.movies.js";

export const listMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

//req.params.id = ':id'
export const listSelectedMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
};

export const addMovie = async (req, res) => {
  // Kolar att data som behövs finns i body
  console.log("Received request body:", req.body);
  const { title, description, image } = req.body;
  if (!title || !description || !image) {
    return res.status(400).json({
      status: "Film data is required",
    });
  }

  const movie = new Movie(req.body);
  await movie.save();
  res.json(movie);
};
