const RatingCard = ({ rating }) => {
	return (
		<div className="flex-col justify-items-center border-4 border-yellow-400 shadow-[inset_0_0_10px_#facc15,0_0_20px_#facc15] rounded-lg p-4 mb-10">
			<h1 className="mb-2 text-2xl font-semibold text-center">Rating</h1>
			<h2 className="mx-10 text-4xl font-bold text-center">
				{Number(rating).toFixed(1)}/10
			</h2>
		</div>
	);
};

export default RatingCard;
