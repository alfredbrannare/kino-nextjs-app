import mongoose from "mongoose";

const auditoriumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  seats: [
    {
      row: { type: Number, required: true },
      seatNumber: { type: Number, required: true },
    },
  ],
});

const Auditorium =
  mongoose.models.Auditorium || mongoose.model("Auditorium", auditoriumSchema);

export default Auditorium;
