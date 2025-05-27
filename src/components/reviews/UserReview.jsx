export default function UserReview({ review }) {
	return (
		<div className="max-w-sm mb-2 p-4 border border-yellow-500 rounded-lg shadow bg-[#1a1a1a]">
			<div className="flex items-center gap-4 mb-2">
				<img
					src={review.profileImage || '/kino-logo.png'}
					alt={review.userName}
					className="object-cover w-12 h-12 border border-yellow-500 rounded-full"
				/>
				<div>
					<p className="text-xl font-semibold">{review.userName}</p>
					<p className="font-medium text-yellow-500">{review.rating}/5</p>
				</div>
			</div>
			<p className="text-xl break-words">{review.text}</p>
		</div>
	);
}
