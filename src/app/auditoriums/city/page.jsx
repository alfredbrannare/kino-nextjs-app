"use client"
import SeatSelector from "src/components/SeatSelector";

const cityPage = () => {
    return (
        <main className="p-6 text-center">
            <h1 className="text-xl font-bold m-4">Salong: "Uppsala City"</h1>
            <h3 className="text-l mt-10 mb-10">Klicka på stolarna för att välja platser</h3>

            <SeatSelector
                movieId="123"
                screeningTime="2025-05-10 18:00"
                userId="456"
            />
        </main>
    );
};

export default cityPage;