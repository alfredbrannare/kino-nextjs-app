"use client";
import { useState, useEffect } from "react";
import SeatSelector from "./SeatSelector";
import TicketSelector from "./TicketSelector";
import { Clapperboard, Clock, Theater } from "lucide-react";

export default function BookingClient({ movieId, screeningTime, auditorium, userId }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [ticketInfo, setTicketInfo] = useState({ total: 0, details: {}, totalPrice: 0 });
    const [seatsFromDB, setSeatsFromDB] = useState([]);
    const [movieTitle, setMovieTitle] = useState("");

    useEffect(() => {
        if (!movieId) return;
        fetch(`/api/movies/${movieId}`)
            .then(res => res.json())
            .then(data => {
                setMovieTitle(data.title);
            })
            .catch(err => console.error("Failed to fetch movie title", err));
    }, [movieId]);

    useEffect(() => {
        fetch(`/api/auditoriums/${auditorium}`)
            .then(res => res.json())
            .then(data => setSeatsFromDB(data.seats));
    }, [auditorium]);

    return (
        <>
            <div className="sticky top-0 z-40 bg-[#2B0404] text-yellow-400 px-4 mt-2 py-2 text-sm sm:text-base border-b border-yellow-400">
                <div className="max-w-[820px] mx-auto flex justify-between items-center flex-wrap gap-2">
                    <div className="flex items-center gap-2 justify-center text-sm">
                        <Clapperboard size={24} className="text-yellow-400" />Film:
                        <p className="text-white text-lg">{movieTitle || "..."}</p>
                    </div>
                    <div className="flex items-center gap-2 justify-center text-sm">
                        <Clock size={24} className="text-yellow-400" />Tid:
                        <p className="text-white text-lg">{new Date(screeningTime).toLocaleString("sv-SE", {
                            dateStyle: "short",
                            timeStyle: "short"
                        }) || "..."}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 justify-center text-sm">
                        <Theater size={24} className="text-yellow-400" />Salong:
                        <p className="text-white text-lg">{auditorium.toUpperCase() || "..."}</p>
                    </div>
                </div>
            </div>

            <main className="p-6 text-center">
                <h3 className="text-l mt-10 mb-10">Välj biljetter</h3>

                <TicketSelector
                    isLoggedIn={false}
                    onChange={(total, details) => setTicketInfo({
                        total,
                        details,
                        totalPrice: details.totalPrice
                    })}
                />

                <h3 className="text-l mt-10 mb-10">Klicka på stolarna för att välja platser</h3>
                <SeatSelector
                    movieId={movieId}
                    movieTitle={movieTitle}
                    screeningTime={screeningTime}
                    auditorium={auditorium}
                    userId={userId}
                    maxSeats={ticketInfo.total}
                    ticketInfo={ticketInfo.details}
                    seatsFromDB={seatsFromDB}
                />
            </main>
        </>
    );
}