"use client"
import React, { useState } from "react";

const SmallHallPage = () => {
    const salong = [
        [{ row: 1, seat: 1 }, { row: 1, seat: 2 }, { row: 1, seat: 3 }, { row: 1, seat: 4 }, { row: 1, seat: 5 }],
        [{ row: 2, seat: 1 }, { row: 2, seat: 2 }, { row: 2, seat: 3 }, { row: 2, seat: 4 }, { row: 2, seat: 5 }],
        [{ row: 3, seat: 1 }, { row: 3, seat: 2 }, { row: 3, seat: 3 }, { row: 3, seat: 4 }, { row: 3, seat: 5 }]
    ];

    const [selectedSeats, setSelectedSeats] = useState([]);

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
                        const isSelected = selectedSeats.some(
                            (s) => s.row === seat.row && s.seat === seat.seat
                        );

                        return (
                            <button
                                key={seatIndex}
                                onClick={() => toggleSeat(seat)}
                                className={`w-10 h-10 rounded ${isSelected ? 'bg-gray-500' : 'bg-green-800'}
                                text-white`}
                            >
                                {seat.seat}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default SmallHallPage;