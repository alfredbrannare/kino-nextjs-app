import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
	movieId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Movie',
		required: true,
	},
	userName: {
		type: String,
	},
	profileImage: {
		type: String,
		default: '',
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
export default Review;
