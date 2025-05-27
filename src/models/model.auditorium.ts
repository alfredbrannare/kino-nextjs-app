import mongoose from "mongoose";

const auditoriumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  seats: [
    {
      row: { type: Number, required: true },
      seat: { type: Number, required: true },
    },
  ],
});

const Auditorium =
  mongoose.models.Auditoriums || mongoose.model("Auditoriums", auditoriumSchema);

export default Auditorium;
