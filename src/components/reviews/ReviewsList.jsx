import { useState } from 'react';
import UserReview from './UserReview';

const REVIEWS_PER_PAGE = 5;

export default function ReviewsList({ reviews }) {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
	const paginatedReviews = reviews.slice(
		(currentPage - 1) * REVIEWS_PER_PAGE,
		currentPage * REVIEWS_PER_PAGE
	);

	return (
		<div className="space-y-2">
			{paginatedReviews.map((review, index) => (
				<div
					key={index}
					className="border p-2 mx-4 rounded bg-white text-black">
					<UserReview review={review} />
				</div>
			))}

			{/* Pagination controls */}
			<div className="flex justify-center mt-4 space-x-2">
				{totalPages === 0 ? null : (
					<>
						<button
							className="btn"
							disabled={currentPage === 1}
							onClick={() => setCurrentPage((prev) => prev - 1)}>
							Previous
						</button>
						<span>
							Page {currentPage} of {totalPages}
						</span>
						<button
							className="btn"
							disabled={currentPage === totalPages}
							onClick={() => setCurrentPage((prev) => prev + 1)}>
							Next
						</button>
					</>
				)}
			</div>
		</div>
	);
}
