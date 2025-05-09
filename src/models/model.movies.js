import mongoose from "mongoose";

const moviesSchema = new mongoose.Schema({
  title: String,
  description: String,
  year: String,
  image: String,
  rating: String,
  inCinemas: {type:Boolean, default:false},
});

const Movie = mongoose.models.Movie || mongoose.model('Movies', moviesSchema);

export default Movie;