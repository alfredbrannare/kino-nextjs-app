"use client"
import React, { useEffect, useState } from "react";
import { generateSalong } from "src/lib/salongLayout";

export default function SeatSelector({ movieId, screeningTime, userId, rows = 5, seatsPerRow = 8 }) {

    const layoutConfig = [8, 10, 12, 10, 8, 8]
    const salong = generateSalong(layoutConfig);

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [isBooking, setIsBooking] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    useEffect(() => {
        fetch(`/api/bookings?movieId=${movieId}&screeningTime=${encodeURIComponent(screeningTime)}`)
            .then((res) => res.json())
            .then((data) => {
                setBookedSeats(data);
            });
    }, [movieId, screeningTime]);

    const toggleSeat = (seat) => {
        const isSelected = selectedSeats.some(
            (s) => s.row === seat.row && s.seat === seat.seat
        );

        if (isSelected) {
            // Ta bort stolen från listan
            setSelectedSeats(selectedSeats.filter(
                (s) => !(s.row === seat.row && s.seat === seat.seat)
            ));
        } else {
            // Lägg till stolen
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    const handleBooking = () => {
        setIsBooking(true);
        setBookingSuccess(false);

        fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                movieId,
                screeningTime,
                seats: selectedSeats,
                userId
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log('Bokning klar', data);
                setSelectedSeats([]);

                fetch(`/api/bookings?movieId=${movieId}&screeningTime=${encodeURIComponent(screeningTime)}`)
                    .then(res => res.json())
                    .then(updated => {
                        setBookedSeats(updated);
                    })
                    .finally(() => setIsBooking(false));
            })
    }

    const Legend = ({ color, label }) => (
        <div className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded ${color}`}></div>
            <span>{label}</span>
        </div>
    );

    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-center mb-6">
                <div className="w-5/8 h-6 bg-gray-700 rounded-sm shadow-sm text-black font-bold mb-6">Bioduk</div>
            </div>
            {salong.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-2">
                    {row.map((seat, seatIndex) => {
                        const isBooked = bookedSeats.some(
                            (b) => b.row === seat.row && b.seat === seat.seat
                        );
                        const isSelected = selectedSeats.some(
                            (s) => s.row === seat.row && s.seat === seat.seat
                        );

                        return (
                            <button
                                key={seatIndex}
                                onClick={() => toggleSeat(seat)}
                                disabled={isBooked}
                                className={`w-10 h-10 rounded text-white ${isBooked
                                    ? 'bg-red-500 cursor-not-allowed'
                                    : isSelected ? 'bg-green-800 border-3 border-white cursor-pointer'
                                        : seat.isWheelchair
                                            ? 'bg-blue-500 cursor-pointer'
                                            : 'bg-gray-600 cursor-pointer'
                                    }
                                    hover:border-3 hover:border-white hover:scale-110 transition`}
                            >
                                {seat.seat}
                            </button>
                        );
                    })}
                </div>
            ))}

            {bookingSuccess && (
                <p className="text-green-600 mt-2">Tack! Platserna är bokade!</p>
            )}
            <div className="mt-6 space-y-2">
                <p className="text-sm font-medium">Stolguide:</p>
                <div className="flex gap-6 flex-wrap text-sm justify-center">
                    <Legend color="bg-gray-500" label="Valbar plats" />
                    <Legend color="bg-green-800" label="Vald plats" />
                    <Legend color="bg-blue-500" label="Rullstolsplats" />
                    <Legend color="bg-red-500" label="Ej valbar (bokad)" />
                </div>
            </div>
            <button
                disabled={isBooking || selectedSeats.length === 0}
                onClick={handleBooking}
                className={`mt-6 px-4 py-2 rounded text-white cursor-pointer ${isBooking ? 'bg-gray-400' : 'bg-blue-600'
                    }`}
            >
                {isBooking ? 'Bokar valda platser...' : 'Boka'}
            </button>
        </div>

    );
};