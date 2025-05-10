"use client"
import SeatSelector from "src/components/SeatSelector";

const SmallHallPage = () => {
    return (
        <main className="p-6">
            <h1 className="text-xl font-bold mb-4">Small Hall - Boka platser</h1>
            <SeatSelector
                movieId="123"
                screeningTime="2025-05-10 18:00"
                userId="456"
            />
        </main>
    );
};

export default SmallHallPage;