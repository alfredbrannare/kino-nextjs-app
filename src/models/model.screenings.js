import mongoose from "mongoose";

const screeningsSchema = new mongoose.Schema({
  title: String,
  description: String,
  year: Number,
  image: String,
  rating: Number,
  isToday: {type:Boolean, default: true}
});

const screening = mongoose.models.Movie || mongoose.model('Movie', moviesSchema);

export default screeningsSchema;