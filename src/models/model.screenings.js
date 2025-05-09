import mongoose from "mongoose";

const screeningsSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movies' },
    auditoriumId: { type: mongoose.Schema.Types.ObjectId, ref: "Auditoriums" },
    startTime: Date,
});

const Screening = mongoose.models.Movie || mongoose.model('Screenings', screeningsSchema);

export default Screening;