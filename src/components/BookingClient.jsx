"use client";
import { useState, useEffect } from "react";
import SeatSelector from "./SeatSelector";
import TicketSelector from "./TicketSelector";

export default function BookingClient({ movieId, screeningTime, auditorium, userId }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [ticketInfo, setTicketInfo] = useState({ total: 0, details: {}, totalPrice: 0 });
    const [seatsFromDB, setSeatsFromDB] = useState([]);

    useEffect(() => {
        fetch(`/api/auditoriums/${auditorium}`)
            .then(res => res.json())
            .then(data => setSeatsFromDB(data.seats));
    }, [auditorium]);

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
                ticketInfo={ticketInfo.details}
                seatsFromDB={seatsFromDB}
            />
        </main>
    );
}