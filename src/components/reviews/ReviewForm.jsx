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
			user: 'Anonymous', //fetch from login
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
					className="textarea textarea-bordered w-full"
					placeholder="Write your review here"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<div className="text-white text-sm my-3">{text.length}/256 words</div>
				{errors.text && (
					<div
						role="alert"
						className="alert alert-error">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 shrink-0 stroke-current"
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
							className="h-6 w-6 shrink-0 stroke-current"
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
				className="btn btn-primary">
				Submit Review
			</button>
		</form>
	);
}
