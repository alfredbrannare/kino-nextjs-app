import BookingClient from "src/components/booking/BookingClient";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Boka biljetter – Kino Uppsala",
    description: "Välj biljetter och sittplatser till din föreställning och genomför bokningen enkelt online."
};

export default async function BookingPage({ params, searchParams }) {
    const { slug } = params;
    const { movieId, screeningTime } = searchParams;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    if (!movieId || !screeningTime) {
        return <p className="text-center mt-10 text-gray-400">Laddar visning...</p>;
    }

    const res = await fetch(`${baseUrl}/api/screenings/validate?movieId=${movieId}&screeningTime=${screeningTime}&auditorium=${slug}`);

    if (!res.ok) {
        notFound();
    }

    return (
        <BookingClient
            movieId={movieId}
            screeningTime={screeningTime}
            auditorium={slug}
        />
    );
}