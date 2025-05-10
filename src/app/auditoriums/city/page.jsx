"use client"
import SeatSelector from "src/components/SeatSelector";

const cityPage = () => {
    return (
        <main className="p-6 text-center">
            <h1 className="text-xl font-bold mb-4">Salong: "Uppsala City"</h1>
            <h2 className="text-xl font-bold mb-4">Boka platser</h2>

            <SeatSelector
                movieId="123"
                screeningTime="2025-05-10 18:00"
                userId="456"
            />
        </main>
    );
};

export default cityPage;