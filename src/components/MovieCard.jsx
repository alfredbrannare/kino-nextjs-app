import Link from "next/link";

const MovieCard = ({ movie, screeningDate }) => {
    if (!movie || !movie.id || !movie.title || !movie.image) {
        return <div className="w-72 h-96 mx-4 p-4 bg-gray-100 text-center text-sm text-gray-500">Movie data unavailable</div>;
    }

    let formattedDate = null;
    let formattedTime = null;

    if (screeningDate) {
        const date = new Date(screeningDate);
        const time = date.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
        const day = date.toLocaleString('sv-SE', { weekday: 'long' });
        const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);
        const dayNumber = date.getDate();
        const month = date.getMonth() + 1;

        formattedDate = `${capitalizedDay} ${dayNumber}/${month}`;
        formattedTime = `${time}`;
    }

    return (
        <Link href={`/movies/${movie.id}`} className="relative w-72 h-96 rounded overflow-hidden shadow-lg mx-4 group block" id={movie.id}>
            <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-fit"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.86)] text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-lg font-semibold">{movie.title}</h2>
                <p className="text-sm">{movie.rating}⭐</p>
                <p>{formattedDate}</p>
                <p>{formattedTime}</p>
            </div>
        </Link>
    );
}

export default MovieCard;
