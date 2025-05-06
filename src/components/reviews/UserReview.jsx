export default function UserReview({ review }) {
	return (
		<div className="justify-content-space-between">
			<strong>{review.user}</strong> Rated the movie{" "}
			<strong>{review.rating}/5</strong>
			<p className="">{review.text}</p>
		</div>
	)
}
