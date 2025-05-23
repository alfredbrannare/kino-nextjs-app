"use client"
import React, { useEffect, useState } from "react";
import WheelchairModal from "./WheelchairModal";

export default function SeatSelector({ movieId, screeningTime, userId, auditorium, maxSeats, seatsFromDB, ticketInfo }) {

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [isBooking, setIsBooking] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [pendingWheelchairSeat, setPendingWheelchairSeat] = useState(null);
    const [showSeatWarning, setShowSeatWarning] = useState(false);
    const salong = groupSeatsByRow(seatsFromDB || []);
    console.log("Inkommande seatsFromDb:", seatsFromDB);


    useEffect(() => {
        fetch(`/api/bookings?movieId=${movieId}&screeningTime=${encodeURIComponent(screeningTime)}&auditorium=${auditorium}`)
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

        if (!isSelected && selectedSeats.length >= maxSeats) {
            setShowSeatWarning(true);
            setTimeout(() => setShowSeatWarning(false), 3000);
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
                userId,
                auditorium,
                ticketInfo
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log('Bokning klar', data);
                setSelectedSeats([]);

                fetch(`/api/bookings?movieId=${movieId}&screeningTime=${encodeURIComponent(screeningTime)}&auditorium=${auditorium}`)
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

    function groupSeatsByRow(seats) {
        const rows = {};
        for (const seat of seats) {
            if (!rows[seat.row]) rows[seat.row] = [];
            rows[seat.row].push(seat);
        }

        return Object.values(rows).map(row => row.sort((a, b) => a.seat - b.seat)).sort((a, b) => a[0].row - b[0].row);
    }

    return (
        <div className="m-auto max-w-[720px] p-4 mb-8 md:p-8 pb-6 space-y-6 bg-gray-900 border-4 border-yellow-400 shadow-[inset_0_0_10px_#facc15,0_0_20px_#facc15]">
            <div className="flex justify-center mb-6">
                <div className="w-full h-6 bg-gray-700 rounded-sm shadow-sm text-gray-400 font-bold mb-6 text-center">Bioduk</div>
            </div>
            <div className="overflow-x-auto w-full px-4">
                <div className="flex flex-col items-center space-y-2 min-w-[360px] p-4">
                    {salong.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex justify-center gap-2 sm:gap-3 min-w-[360px] ">
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
                                        className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded text-white ${isBooked
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
                </div>
            </div>
            {showSeatWarning && (
                <p className="text-center text-sm text-red-500">
                    Du kan inte välja fler platser än antal biljetter
                </p>
            )}

            {bookingSuccess && (
                <p className="text-green-600 mt-2">Tack! Platserna är bokade!</p>
            )}
            <div className="mt-6 space-y-2 text-center">
                <p className="text-sm font-medium">Stolguide:</p>
                <div className="flex gap-6 flex-wrap text-sm sm:text-base justify-center">
                    <Legend color="bg-gray-500" label="Valbar plats" />
                    <Legend color="bg-green-800" label="Vald plats" />
                    <Legend color="bg-blue-500" label="Rullstolsplats" />
                    <Legend color="bg-red-500" label="Ej valbar (bokad)" />
                </div>
            </div>
            <div className="flex justify-center mt-6">
                <button
                    title={selectedSeats.length === 0 ? 'Välj platser först' : ''}
                    disabled={
                        isBooking ||
                        selectedSeats.length !== maxSeats ||
                        selectedSeats.length === 0
                    }
                    onClick={handleBooking}
                    className={`mt-6 px-6 py-3 w-full sm:w-auto rounded text-black font-semibold transition ${selectedSeats.length !== maxSeats || isBooking
                        ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-400 cursor-pointer'
                        }`}
                >
                    {isBooking ? 'Bokar valda platser...' : 'Boka platser'}
                </button>
            </div>
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