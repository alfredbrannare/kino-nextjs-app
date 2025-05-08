'use client'
import { useEffect, useState } from "react";
import MovieCard from "src/components/MovieCard";
import { fetchMovies } from "src/lib/fetchMovies";
import { sortTopRated } from "src/utils/sortTopRated";

export default function MoviesPage() {
    const [unsortedMovies, setUnsort] = useState([]);
    const [movies, setMovies] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const data = await fetchMovies();
                setUnsort(data);
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies', error);
                setError('Vi har för tillfället problem med att hämta filmerna');
            } finally {
                setLoading(false);
            }
        }
        loadMovies();
    }, []);

    useEffect(() => {
        console.log("Movies state updated:", movies);
    }, [movies]);

    const handleSortTopRated = () => {
        setMovies(sortTopRated(movies));
    };

    return (
        <div>
            <button
                onClick={handleSortTopRated}
            >Click here</button>
            <button
                onClick={() => {
                    setMovies(unsortedMovies)
                }}
            >Reset</button>
            <div className="flex flex-row flex-wrap justify-center">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie._id}
                        movie={movie}
                    >
                    </MovieCard>
                ))}
            </div>
        </div>
    );
}