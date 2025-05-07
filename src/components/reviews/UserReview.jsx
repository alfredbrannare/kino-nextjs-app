export default function UserReview({ review }) {
	return (
		<div className="max-w-sm mb-4">
			<p className="mb-2">
				<strong>{review.user}</strong> Rated the movie{" "}
				<strong>{review.rating}/5</strong>
			</p>
			<p className="break-words">{review.text}</p>
		</div>
	)
}
