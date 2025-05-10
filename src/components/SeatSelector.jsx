"use client"
import React, { useEffect, useState } from "react";

function generateSalong(rows, seatsPerRow) {
    const layout = [];
    for (let row = 1; row <= rows; row++) {
        const rowSeats = [];
        for (let seat = 1; seat <= seatsPerRow; seat++) {
            const isWheelchair = row === rows && (seat === 1 || seat === seatsPerRow);
            rowSeats.push({ row, seat, isWheelchair });
        }
        layout.push(rowSeats);
    }
    return layout;
};

export default function SeatSelector({ movieId, screeningTime, userId, rows = 5, seatsPerRow = 8 }) {

    const salong = generateSalong(rows, seatsPerRow);

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

    return (
        <div className="p-4 space-y-4">
            {salong.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2">
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
                                    : isSelected ? 'bg-gray-500'
                                        : seat.isWheelchair
                                            ? 'bg-blue-500'
                                            : 'bg-green-800'
                                    }`}
                            >
                                {seat.seat}
                            </button>
                        );
                    })}
                </div>
            ))}
            <button
                disabled={isBooking || selectedSeats.length === 0}
                onClick={handleBooking}
                className={`mt-4 px-4 py-2 rounded text-white ${isBooking ? 'bg-gray-400' : 'bg-blue-600'
                    }`}
            >
                {isBooking ? 'Bokar valda platser...' : 'Boka'}
            </button>
            {bookingSuccess && (
                <p className="text-green-600 mt-2">Tack! Platserna är bokade!</p>
            )}
        </div>
    );
};