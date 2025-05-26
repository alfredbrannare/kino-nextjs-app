import mongoose from 'mongoose';

const LiveEventsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    genre: { type: String, required: true },
    runtime: { type: Number, required: true },
});

const LiveEvents = mongoose.models.LiveEvents || mongoose.model("LiveEvents", LiveEventsSchema);
export default LiveEvents;