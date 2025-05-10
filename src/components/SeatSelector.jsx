"use client"
import React, { useEffect, useState } from "react";
import { generateSalong } from "src/lib/salongLayout";
import WheelchairModal from "./WheelchairModal";

export default function SeatSelector({ movieId, screeningTime, userId }) {

    const cityLayoutConfig = [8, 10, 12, 10, 8, 8]
    const salong = generateSalong(cityLayoutConfig);

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [isBooking, setIsBooking] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [pendingWheelchairSeat, setPendingWheelchairSeat] = useState(null);


    useEffect(() => {
        fetch(`/api/bookings?movieId=${movieId}&screeningTime=${encodeURIComponent(screeningTime)}`)
            .then((res) => res.json())
            .then((data) => {
                setBookedSeats(data);
            });
    }, [movieId, screeningTime]);

    const toggleSeat = (seat, bypassModal = false) => {
        const isSelected = selectedSeats.some(
            (s) => s.row === seat.row && s.seat === seat.seat
        );

        if (seat.isWheelchair && !bypassModal && !isSelected) {
            setPendingWheelchairSeat(seat);
            return;
        }

        if (isSelected) {
            // Avmarkera redan vald plats
            setSelectedSeats(selectedSeats.filter(
                (s) => !(s.row === seat.row && s.seat === seat.seat)
            ));
        } else {
            // Markera vald plats
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
            <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded ${color}`}></div>
            <span>{label}</span>
        </div>
    );

    return (
        <div className="p-4 md:p-8 pb-6 space-y-6 bg-gray-900 border-4 border-yellow-400 shadow-[inset_0_0_10px_#facc15,0_0_20px_#facc15]">
            <div className="flex justify-center mb-6">
                <div className="w-full max-w-md sm:max-w-lg h-6 bg-gray-700 rounded-sm shadow-sm text-gray-400 font-bold mb-6">Bioduk</div>
            </div>
            {salong.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-3">
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
                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded text-white ${isBooked
                                    ? 'bg-red-500 cursor-not-allowed'
                                    : isSelected ? 'bg-green-800 border-3 border-white cursor-pointer'
                                        : seat.isWheelchair
                                            ? 'bg-blue-500 cursor-pointer'
                                            : 'bg-gray-500 cursor-pointer'
                                    }
                                    hover:border-3 hover:border-white hover:scale-110 transition`}
                            >
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
                <div className="flex gap-6 flex-wrap text-sm sm:text-base justify-center">
                    <Legend color="bg-gray-500" label="Valbar plats" />
                    <Legend color="bg-green-800" label="Vald plats" />
                    <Legend color="bg-blue-500" label="Rullstolsplats" />
                    <Legend color="bg-red-500" label="Ej valbar (bokad)" />
                </div>
            </div>
            <button
                disabled={isBooking || selectedSeats.length === 0}
                onClick={handleBooking}
                className={`mt-6 px-4 py-2 rounded text-black cursor-pointer ${isBooking ? 'bg-gray-400' : 'bg-yellow-400'
                    }`}
            >
                {isBooking ? 'Bokar valda platser...' : 'Boka'}
            </button>
            <WheelchairModal
                seat={pendingWheelchairSeat}
                onConfirm={() => {
                    toggleSeat(pendingWheelchairSeat, true);
                    setPendingWheelchairSeat(null);
                }}
                onCancel={() => {
                    setPendingWheelchairSeat(null);
                }}
            />
        </div>
    );
};