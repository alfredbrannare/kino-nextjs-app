import mongoose from "mongoose";

const seatSchema = new mongoose.Schema({
  row: Number,
  seat: Number,
  isWheelchair: Boolean,
  type: {
    type: String,
    enum: ["ordinary", "child", "retired", "student", "member"],
    required: true,
  },
});

const bookingSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movies",
      required: true,
    },
    screeningTime: String,
    seats: [seatSchema],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: false,
    },
    auditorium: String,
    totalPrice: Number,
  },
  {
    timestamps: true,
  }
);

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
