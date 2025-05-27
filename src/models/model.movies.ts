import mongoose from "mongoose";

const moviesSchema = new mongoose.Schema({
  title: String,
  description: String,
  year: String,
  image: String,
  rating: String,
  inCinemas: {type:Boolean, default:false},
  trailerKey: {type:String, default: null},
});

const Movie = mongoose.models.Movies || mongoose.model('Movies', moviesSchema);

export default Movie;