import mongoose from 'mongoose';
import '@/models/model.movies';
import '@/models/model.auditorium';
import '@/models/model.booking';

const screeningsSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movies',
    required: true,
  },
  auditoriumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auditoriums',
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  bookedSeats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    },
  ],
});

screeningsSchema.index({ startTime: 1 }, { expireAfterSeconds: 0 });

const Screening =
  mongoose.models.Screenings || mongoose.model('Screenings', screeningsSchema);

export default Screening;
