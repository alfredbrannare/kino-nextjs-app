import mongoose from "mongoose";

const screeningsSchema = new mongoose.Schema({
    movieId: mongoose.Schema.Types.ObjectId,
    startTime: Date,
    auditoriumId: mongoose.Schema.Types.ObjectId,
});

const Screening = mongoose.models.Movie || mongoose.model('Screening', screeningsSchema);

export default Screening;