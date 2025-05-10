import mongoose from "mongoose";

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
  startTime: Date,
  required: true,
});

const Screening =
  mongoose.models.Movie || mongoose.model("Screenings", screeningsSchema);

export default Screening;
