"use client"
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import SeatSelector from "src/components/SeatSelector";
import TicketSelector from "src/components/TicketSelector";

const cityPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [ticketInfo, setTicketInfo] = useState({ total: 0, details: {}, totalPrice: 0 });
    const searchParams = useSearchParams();

    const movieId = searchParams.get("movieId");
    const screeningTime = searchParams.get("screeningTime");
    const auditorium = "city"; // denna är statisk för denna salong
    const userId = "456"; // ersätt med riktig auth senare

    if (!movieId || !screeningTime) {
        return <p className="text-center mt-10 text-gray-400">Laddar visning...</p>;
    }

    return (
        <main className="p-6 text-center">
            <h1 className="text-xl font-bold m-4">Salong: "Uppsala City"</h1>
            <h3 className="text-l mt-10 mb-10">Välj biljetter</h3>
            <TicketSelector
                isLoggedIn={isLoggedIn}
                onChange={(total, details) => setTicketInfo({ total, details, totalPrice: details.totalPrice })}
            />
            <h3 className="text-l mt-10 mb-10">Klicka på stolarna för att välja platser</h3>

            <SeatSelector
                movieId={movieId}
                screeningTime={screeningTime}
                auditorium={auditorium}
                userId={userId}
                maxSeats={ticketInfo.total}
            />
        </main>
    );
};

export default cityPage;