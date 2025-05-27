import BookingClient from "src/components/booking/BookingClient";

export const metadata = {
    title: "Boka biljetter – Kino Uppsala",
    description: "Välj biljetter och sittplatser till din föreställning och genomför bokningen enkelt online."
};


export default function BookingPage({ searchParams }) {
    const { movieId, screeningTime } = searchParams;
    const auditorium = "city";

    if (!movieId || !screeningTime) {
        return <p className="text-center mt-10 text-gray-400">Laddar visning...</p>;
    }

    return (
        <BookingClient
            movieId={movieId}
            screeningTime={screeningTime}
            auditorium={auditorium}
        />
    );
}