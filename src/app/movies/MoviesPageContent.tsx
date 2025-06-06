'use client';
import { useEffect, useState, ChangeEvent } from 'react';
import MovieCard from '@/components/MovieCard';
import SearchMoviesInput from '@/components/movies/SearchMoviesInput';
import SortMoviesDropdown from '@/components/movies/SortMoviesDropdown';
import { fetchMovies } from '@/lib/fetchMovies';
import { searchMovies } from '@/utils/movies/searchMovies';
import { sortMovies, SortOption } from '@/utils/movies/sortMovies';
import MovieCardSkeleton from '@/components/MovieCardSkeleton';
import { MovieType } from '@/ts/types';
import ErrorMessage from '@/components/ErrorMessage';

export default function MoviePageContent() {
  const [unsortedMovies, setUnsortedMovies] = useState<MovieType[]>([]);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOptions, setSortOptions] = useState<SortOption | ''>('');
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies();
        setUnsortedMovies(data);
      } catch (error) {
        console.error('Error fetching movies', error);
        setError('Vi har för tillfället problem med att hämta filmerna');
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  useEffect(() => {
    const filteredMovies = searchMovies(unsortedMovies, searchInput);
    const sortedAndFilteredMovies = sortMovies(
      filteredMovies,
      sortOptions as SortOption,
    );
    setMovies(sortedAndFilteredMovies);
  }, [searchInput, sortOptions, unsortedMovies]);

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortOptions(event.target.value as SortOption);
  };

  return (
    <div>
      <h1 className=' mt-5 text-4xl font-bold text-[#CDCDCD] mb-8 text-center'>
        Alla filmer
      </h1>

      <div className='relative mx-auto w-full border-4 rounded-md border-yellow-400 shadow-[inset_0_0_10px_#facc15,0_0_20px_#facc15] xl:min-w-[1280px]'>
        <div className='sticky top-0 bg-[#2b0404] z-10 mt-2 mx-5 py-4 px-4 controls-container flex flex-row justify-center'>
          <SearchMoviesInput
            value={searchInput}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setSearchInput(event.target.value);
            }}
          ></SearchMoviesInput>
          <SortMoviesDropdown
            value={sortOptions}
            onChange={handleSortChange}
          ></SortMoviesDropdown>
        </div>
        {!loading && searchInput && movies.length === 0 && (
          <h2 className='text-center text-white text-lg mt-10'>
            Inga filmer matchar din sökning.
          </h2>
        )}
        <div className='flex flex-row flex-wrap justify-center py-6 mt-4'>
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <MovieCardSkeleton key={i} className='flex-shrink-0' />
            ))
          ) : error ? (
            <ErrorMessage error={error} />
          ) : (
            movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie}></MovieCard>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
