"use client"
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import SeatSelector from "src/components/SeatSelector";
import TicketSelector from "src/components/TicketSelector";

const cityPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [ticketInfo, setTicketInfo] = useState({ total: 0, details: {}, totalPrice: 0 });
    const [seatsFromDB, setSeatsFromDB] = useState([]);

    const searchParams = useSearchParams();

    const movieId = searchParams.get("movieId");
    const screeningTime = searchParams.get("screeningTime");
    const auditorium = "city"; // denna är statisk för denna salong
    const userId = "456"; // ersätt med riktig auth senare

    useEffect(() => {
        fetch(`/api/auditoriums/${auditorium}`)
            .then(res => res.json())
            .then(data => {
                console.log("Fetched seats:", data.seats);
                setSeatsFromDB(data.seats);
            });
    }, [auditorium]);

    if (!movieId || !screeningTime) {
        return <p className="text-center mt-10 text-gray-400">Laddar visning...</p>;
    }

    return (
        <main className="container mx-3xl px-4 py-8">
            <h1 className="text-2xl font-bold text-center mb-8">Salong: "Uppsala City"</h1>
            <section className="mb-12">
                <h3 className="text-lg font-semibold mb-4 text-center">Välj biljetter</h3>
                <TicketSelector
                    isLoggedIn={isLoggedIn}
                    onChange={(total, details) => setTicketInfo({ total, details, totalPrice: details.totalPrice })}
                />
            </section>
            <section>
                <h3 className="text-lg font-semibold mb-4 text-center">Klicka på stolarna för att välja platser</h3>
                <SeatSelector
                    movieId={movieId}
                    screeningTime={screeningTime}
                    auditorium={auditorium}
                    userId={userId}
                    maxSeats={ticketInfo.total}
                    ticketInfo={ticketInfo.details}
                    seatsFromDB={seatsFromDB}
                />
            </section>
        </main >
    );
};

export default cityPage;