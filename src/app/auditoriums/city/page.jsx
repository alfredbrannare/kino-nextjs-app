"use client"
import { useSearchParams } from "next/navigation";
import SeatSelector from "src/components/SeatSelector";

const cityPage = () => {
    const searchParams = useSearchParams();

    const movieId = searchParams.get("movieId");
    const screeningTime = searchParams.get("screeningTime");
    const auditorium = "city"; // denna är statisk för denna salong
    const userId = "456"; // ersätt med riktig auth senare

    if (!movieId || !screeningTime) {
        return <p className="text-center mt-10 text-gray-400">Laddar visning...</p>;
    }

    return (
        <main className="p-6 text-center">
            <h1 className="text-xl font-bold m-4">Salong: "Uppsala City"</h1>
            <h3 className="text-l mt-10 mb-10">Klicka på stolarna för att välja platser</h3>

            <SeatSelector
                movieId={movieId}
                screeningTime={screeningTime}
                auditorium={auditorium}
                userId={userId}
            />
        </main>
    );
};

export default cityPage;