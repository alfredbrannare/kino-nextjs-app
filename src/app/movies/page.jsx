'use client'
import { useEffect, useState } from "react";
import MovieCard from "src/components/MovieCard";
import SortMoviesDropdown from "src/components/movies/SortMoviesDropdown";
import { fetchMovies } from "src/lib/fetchMovies";
import { sortMovies } from "src/utils/movies/sortMovies";

export default function MoviesPage() {
    const [unsortedMovies, setUnsort] = useState([]);
    const [movies, setMovies] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOptions, setSortOptions] = useState('');

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
        const sortedMovies = sortMovies(unsortedMovies, sortOptions);
        setMovies(sortedMovies);
    }, [sortOptions, unsortedMovies]);


    const handleSortChange = (event) => {
        setSortOptions(event.target.value);
    };

    return (
        <div>
            <button onClick={() => setMovies(unsortedMovies)}>Reset</button>

            <SortMoviesDropdown value={sortOptions} onChange={handleSortChange}></SortMoviesDropdown>

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