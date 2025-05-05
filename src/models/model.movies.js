import mongoose from "mongoose";

const moviesSchema = new mongoose.Schema({
  title: String,
  description: String,
  year: Number,
  image: String,
  rating: Number,
  inCinemas: {type:Boolean, default:false},
});

const Movie = mongoose.models.Movie || mongoose.model('Movie', moviesSchema);

export default Movie;