'use client'
import { useEffect, useState } from "react";
import MovieCard from "src/components/MovieCard";
import SearchMoviesInput from "src/components/movies/SearchMoviesInput";
import SortMoviesDropdown from "src/components/movies/SortMoviesDropdown";
import { fetchMovies } from "src/lib/fetchMovies";
import { searchMovies } from "src/utils/movies/searchMovies";
import { sortMovies } from "src/utils/movies/sortMovies";
import MovieCardSkeleton from "src/components/MovieCardSkeleton";

export default function MoviesPage() {
    const [unsortedMovies, setUnsort] = useState([]);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOptions, setSortOptions] = useState('');
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const data = await fetchMovies();
                setUnsort(data);
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
        const filteredMovies = searchMovies(unsortedMovies, searchInput);
        const sortedAndFilteredMovies = sortMovies(filteredMovies, sortOptions);
        setMovies(sortedAndFilteredMovies);
    }, [searchInput, sortOptions, unsortedMovies]);


    const handleSortChange = (event) => {
        setSortOptions(event.target.value);
    };

    return (
        <div className="relative">
            <div className="sticky top-0 bg-[#2b0404] z-10 mt-2 py-4 px-4 controls-container flex flex-row justify-center">
                <SearchMoviesInput value={searchInput} onChange={(event) => { setSearchInput(event.target.value) }}></SearchMoviesInput>
                <SortMoviesDropdown value={sortOptions} onChange={handleSortChange}></SortMoviesDropdown>
            </div>
            {!loading && searchInput && movies.length === 0 && (
                <h2 className="text-center text-white text-lg mt-10">
                    Inga filmer matchar din sökning.
                </h2>
            )}
            <div className="flex flex-row flex-wrap justify-center">
                {loading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                        <MovieCardSkeleton key={i} className="flex-shrink-0" />
                    ))
                ) : movies.map((movie) => (
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