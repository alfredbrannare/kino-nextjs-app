import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
    row: Number,
    seat: Number
});

const bookingSchema = new mongoose.Schema({
    movieId: String,
    screeningTime: String,
    seats: [seatSchema],
    userId: String,
    auditorium: String,
    totalPrice: Number
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;