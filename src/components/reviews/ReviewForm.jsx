export default function ReviewForm({ handleAddReview }) {
	return (
		<form
			onSubmit={handleAddReview()}
			className="p-4 space-y-4">
			<div className="form-control">
				<label className="label block mb-1">
					<span className="label-text">Your Rating</span>
				</label>
				<div className="rating">
					<input
						type="radio"
						name="rating"
						className="mask mask-star-2 bg-yellow-400"
						value="1"
					/>
					<input
						type="radio"
						name="rating"
						className="mask mask-star-2 bg-yellow-400"
						value="2"
					/>
					<input
						type="radio"
						name="rating"
						className="mask mask-star-2 bg-yellow-400"
						value="3"
					/>
					<input
						type="radio"
						name="rating"
						className="mask mask-star-2 bg-yellow-400"
						value="4"
					/>
					<input
						type="radio"
						name="rating"
						className="mask mask-star-2 bg-yellow-400"
						value="5"
					/>
				</div>
			</div>

			<div className="form-control">
				<label className="label">
					<span className="label-text">Your Review</span>
				</label>
				<textarea
					className="textarea textarea-bordered"
					placeholder="Write your review here"
					name="review"
				/>
			</div>

			<button
				type="submit"
				className="btn btn-primary">
				Submit Review
			</button>
		</form>
	)
}
