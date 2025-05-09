import mongoose from "mongoose";

const screeningsSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    auditoriumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auditorium' },
    startTime: Date,
});

const Screening = mongoose.models.Movie || mongoose.model('Screening', screeningsSchema);

export default Screening;