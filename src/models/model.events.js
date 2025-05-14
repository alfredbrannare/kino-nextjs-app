import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema ({
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String, required: true},
    image: { type: String, required: true },
});

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);
export default Event;