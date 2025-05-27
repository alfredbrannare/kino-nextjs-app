import BookingClient from "../../../components/booking/BookingClient";

export default function BookingPage({ searchParams }) {
    const { movieId, screeningTime } = searchParams;
    const auditorium = "city";
    const userId = "456"; // ersätt med riktig auth senare

    if (!movieId || !screeningTime) {
        return <p className="text-center mt-10 text-gray-400">Laddar visning...</p>;
    }

    return (
        <BookingClient
            movieId={movieId}
            screeningTime={screeningTime}
            auditorium={auditorium}
            userId={userId}
        />
    );
}