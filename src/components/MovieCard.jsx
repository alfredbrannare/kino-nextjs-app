import Link from 'next/link';

const MovieCard = ({ movie }) => {
	if (!movie || !movie._id || !movie.title || !movie.image) {
		return (
			<div className="w-72 h-96 mx-4 p-4 bg-gray-100 text-center text-sm text-gray-500">
				Movie data unavailable
			</div>
		);
	}

	let formattedDate = null;
	let formattedTime = null;

	if (movie.startTime) {
		const date = new Date(movie.startTime);
		const time = date.toLocaleTimeString('sv-SE', {
			hour: '2-digit',
			minute: '2-digit',
		});
		const day = date.toLocaleString('sv-SE', { weekday: 'long' });
		const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);
		const dayNumber = date.getDate();
		const month = date.getMonth() + 1;

		formattedDate = `${capitalizedDay} ${dayNumber}/${month}`;
		formattedTime = `${time}`;
	}

	return (
		<div>
			<Link
				href={`/movies/${movie.movieId ?? movie._id}`}
				className="relative w-50 h-83 rounded overflow-hidden shadow-lg mx-4 group block my-2"
				id={movie._id}>
				<img
					src={movie.image}
					alt={movie.title}
					onError={(e) => {
						e.target.onerror = null;
						e.target.src = '/kino-card.jpg';
					}}
					className="w-full h-full object-fit"
				/>

				<div className="absolute bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.86)] text-white p-2 opacity-100 sm:opacity-100 xl:opacity-0 group-hover:opacity-100 xl:group-hover:opacity-100 transition-opacity duration-300">
					<h2 className="text-lg font-semibold truncate">{movie.title}</h2>
					<p className="text-sm">{movie.rating}⭐</p>
					<p>{formattedDate}</p>
					<p>{formattedTime}</p>
				</div>
			</Link>
		</div>
	);
};

export default MovieCard;
