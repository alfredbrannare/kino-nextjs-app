import { useState } from 'react';

export default function ReviewForm({ handleAddReview }) {
	const [rating, setRating] = useState(0);
	const [text, setText] = useState('');
	// const [hasRating, setHasRating] = useState(null);
	// const [hasText, setHasText] = useState(null);
	const [errors, setErrors] = useState({ rating: false, text: false });

	// used to validate the form
	const validateForm = () => {
		const newErrors = {
			text: text === '',
			rating: rating === 0,
		};
		setErrors(newErrors);
		return !newErrors.text && !newErrors.rating;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!validateForm()) return;

		handleAddReview({
			rating: parseInt(rating),
			text,
		});
		setRating(0);
		setText('');
		setErrors({ rating: false, text: false });
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="p-4 space-y-4">
			<div className="form-control">
				<label className="block text-white label">
					<span className="label-text">Your Rating</span>
				</label>
				<div className="rating">
					{[1, 2, 3, 4, 5].map((num) => (
						<input
							key={num}
							type="radio"
							name="rating"
							className="bg-yellow-400 mask mask-star-2"
							value={num}
							aria-label={`Rating ${num}`}
							checked={parseInt(rating) === num}
							onChange={(e) => setRating(e.target.value)}
						/>
					))}
				</div>
			</div>

			<div className="form-control">
				<label className="block label">
					<span className="text-white label-text">Your Review</span>
				</label>
				<textarea
					maxLength={256}
					className="w-full textarea textarea-bordered"
					placeholder="Write your review here"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<div className="my-3 text-sm text-white">{text.length}/256 words</div>
				{errors.text && (
					<div
						role="alert"
						className="alert alert-error">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6 stroke-current shrink-0"
							fill="none"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span className="font-bold">Error! A comment is Required.</span>
					</div>
				)}
				{errors.rating && (
					<div
						role="alert"
						className="alert alert-error">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6 stroke-current shrink-0"
							fill="none"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span className="font-bold">Error! Rating is required.</span>
					</div>
				)}
			</div>

			<button
				type="submit"
				className="text-lg text-black bg-yellow-400 text-semibold btn">
				Submit Review
			</button>
		</form>
	);
}
