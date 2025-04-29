import mongoose from "mongoose";

const moviesSchema = new mongoose.Schema({
  title: String,
  description: String,
  year: Number,
  image: String,
  rating: Number,
});

const Movie = mongoose.model('Movie', moviesSchema);

export default Movie;