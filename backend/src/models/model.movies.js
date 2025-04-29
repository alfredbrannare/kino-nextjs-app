import mongoose from "mongoose";

const moviesSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

const Movie = mongoose.model('Movie', moviesSchema);

export default Movie;