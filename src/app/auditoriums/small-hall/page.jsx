"use client"
import React, { useEffect, useState } from "react";

const SmallHallPage = () => {
    const salong = [
        [{ row: 1, seat: 1 }, { row: 1, seat: 2 }, { row: 1, seat: 3 }, { row: 1, seat: 4 }, { row: 1, seat: 5 }],
        [{ row: 2, seat: 1 }, { row: 2, seat: 2 }, { row: 2, seat: 3 }, { row: 2, seat: 4 }, { row: 2, seat: 5 }],
        [{ row: 3, seat: 1 }, { row: 3, seat: 2 }, { row: 3, seat: 3 }, { row: 3, seat: 4 }, { row: 3, seat: 5 }]
    ];

    const movieId = '123';
    const screeningTime = '2025-05-08 18:00';

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
                                className={`w-10 h-10 rounded text-white ${isBooked ? 'bg-red-500 cursor-not-allowed' :
                                    isSelected ? 'bg-gray-500' : 'bg-green-800'
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
                onClick={() => {
                    setIsBooking(true);
                    setBookingSuccess(false);

                    fetch('/api/bookings', {
                        method: 'POST',
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify({
                            movieId: '123',
                            screeningTime: '2025-05-08 18:00',
                            seats: selectedSeats,
                            userId: '456'
                        })
                    }).then(res => res.json())
                        .then(data => {
                            console.log('Bokning klar:', data);
                            setSelectedSeats([]);
                            setBookingSuccess(true);

                            fetch(`/api/bookings?movieId=${movieId}&screeningTime=${encodeURIComponent(screeningTime)}`)
                                .then(res => res.json())
                                .then(updated => {
                                    setBookedSeats(updated);
                                })
                                .finally(() => setIsBooking(false));
                        });
                }}
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

export default SmallHallPage;