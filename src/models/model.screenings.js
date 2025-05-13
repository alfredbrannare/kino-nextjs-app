import mongoose from "mongoose";
import Movie from "src/models/model.movies";
import Auditorium from "src/models/model.auditorium";

const screeningsSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movies",
    required: true,
  },
  auditoriumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auditoriums",
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  }
});

const Screening =
  mongoose.models.Screenings || mongoose.model("Screenings", screeningsSchema);

export default Screening;
