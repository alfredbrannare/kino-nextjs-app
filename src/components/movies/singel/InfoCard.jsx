const InfoCard = ({ ageRating, duration, genre }) => {
	return (
		<div className="flex gap-4 mb-4">
			<span className="badge badge-accent">{ageRating}+</span>
			<span>{duration}h</span>
			<span className="font-semibold">{genre}</span>
		</div>
	);
};

export default InfoCard;
