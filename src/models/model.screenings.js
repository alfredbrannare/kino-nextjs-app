import mongoose from "mongoose";
import Movie from "src/models/model.movies";
import Auditorium from "src/models/model.auditorium";
import Booking from "./model.booking";

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
  },
  bookedSeats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  }]
});

const Screening =
  mongoose.models.Screenings || mongoose.model("Screenings", screeningsSchema);

export default Screening;
