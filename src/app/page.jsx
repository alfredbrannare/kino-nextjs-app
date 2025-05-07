'use client'
import MovieCard from "src/components/MovieCard";
import MovieCardSkeleton from "src/components/MovieCardSkeleton";
import { Info } from "lucide-react";
const { useEffect, useState } = require("react");

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const res = await fetch('/api/screenings/net');
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Vi har för tillfället problem med att hämta filmer.');
      } finally {
        setLoading(false);
      }
    }
    fetchUpcomingMovies();
  }, []);

  return (
    <div>
      <div className="justify-center align-center my-6">
        <h1 className="text-4xl font-weight-700 text-center">Visas nu</h1>
        {error && (
          <div className="alert alert-warning shadow-lg justify-center align-center mx-auto my-10 max-w-100">
            <div className="text-center text-black">
              <Info />
              <span >Fel</span>
            </div>
            <div className="text-sm text-black">
              {error}
            </div>
          </div>
        )}
        <div className="flex flex-row justify-start xl:justify-center items-center overflow-x-auto space-x-4 px-4 my-6 mx-4">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <MovieCardSkeleton key={i} className="flex-shrink-0" />
            ))
          ) : (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} className="flex-shrink-0" />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;