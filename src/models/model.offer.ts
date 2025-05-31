import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const Offer = mongoose.models.Offer || mongoose.model('Offer', offerSchema);
export default Offer;
