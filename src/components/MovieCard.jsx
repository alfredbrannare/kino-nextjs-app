import Link from "next/link";

const MovieCard = ({ movie }) => {
    const screeningDate = '2024-10-20T18:30:00.000+00:00';
    const date = new Date(screeningDate);
    const time = date.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
    const day = date.toLocaleString('sv-SE', { weekday: 'long' });
    const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);
    const dayNumber = date.getDate();
    const month = date.getMonth() + 1;

    const formattedDate = `${capitalizedDay} ${dayNumber}/${month}`;
    const formattedTime = `${time}`;

    return (
        <Link href='#' className="relative w-72 h-96 rounded overflow-hidden shadow-lg mx-4 group block">
            <img
                src={'https://m.media-amazon.com/images/M/MV5BYWI3ODJlMzktY2U5NC00ZjdlLWE1MGItNWQxZDk3NWNjN2RhXkEyXkFqcGc@._V1_SX300.jpg'}
                alt={'LoU'}
                className="w-full h-full object-fit"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.86)] text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-lg font-semibold">{'The Last of Us'}</h2>
                <p className="text-sm">{'2017'} • ⭐ {'3/5'}</p>
                <p>{formattedDate}</p>
                <p>{formattedTime}</p>
            </div>
        </Link>
    );
}

export default MovieCard;
