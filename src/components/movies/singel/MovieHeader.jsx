export const MovieHeader = ({
	title,
	description,
	ageRating,
	duration,
	genre,
}) => {
	// convert string to number
	const totalMinutes = parseInt(duration, 10);
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;

	const formattedDuration = `${hours}h ${minutes}min`;

	return (
		<div className="bg-[#2B0404] shadow-lg rounded-lg mb-6 mx-4">
			<h1 className="mb-2 ml-4 text-6xl font-bold">{title}</h1>
			<div className="p-4 text-xl text-gray-200">
				<div className="flex gap-4 mx-4">
					<span className="badge badge-accent">{ageRating}+</span>
					<span>{formattedDuration}</span>
					<span className="font-semibold">{genre}</span>
				</div>
			</div>
		</div>
	);
};
