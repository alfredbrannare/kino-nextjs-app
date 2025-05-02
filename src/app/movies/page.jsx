'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import MovieCreator from "src/components/MovieCreator";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('api/movies');
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    setUpdate(false);
  }, [update]);
  if (loading) return <p>Loading...</p>

  return (
    <>
      <MovieCreator setUpdate={setUpdate} />
      <h1>Movies:</h1>
      {movies.map(movie => (
        <div key={movie._id} className="movie">
          <h2>{movie.title}</h2>
          <Link href={`/movies/` + movie._id}>Details</Link>
        </div>
      ))}
    </>
  );
}

export default MoviesPage;