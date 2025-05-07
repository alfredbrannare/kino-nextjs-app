import { useState } from "react"

export default function ReviewForm({ handleAddReview }) {
	const [rating, setRating] = useState(0)
	const [text, setText] = useState("")
	const [hasRating, setHasRating] = useState(null)

	const handleSubmit = (e) => {
		e.preventDefault()
		if (rating === 0) return setHasRating(false)
		handleAddReview({
			rating: parseInt(rating),
			text,
			user: "Anonymous", //fetch from login
		})
		setHasRating(null)
		setRating(0)
		setText("")
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="p-4 space-y-4">
			<div className="form-control">
				<label className="label block text-white">
					<span className="label-text">Your Rating</span>
				</label>
				<div className="rating">
					{[1, 2, 3, 4, 5].map((num) => (
						<input
							key={num}
							type="radio"
							name="rating"
							className="mask mask-star-2 bg-yellow-400"
							value={num}
							checked={parseInt(rating) === num}
							onChange={(e) => setRating(e.target.value)}
						/>
					))}
				</div>
			</div>

			<div className="form-control">
				<label className="label block">
					<span className="label-text text-white">Your Review</span>
				</label>
				<textarea
					maxLength={256}
					className="textarea textarea-bordered"
					placeholder="Write your review here"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<div className="text-white text-sm mt-1">{text.length}/256 words</div>
				{hasRating === false ? (
					<div className="text-red-500"> You must provide a rating! </div>
				) : null}
			</div>

			<button
				type="submit"
				className="btn btn-primary">
				Submit Review
			</button>
		</form>
	)
}
