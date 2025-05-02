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
        const res = await fetch('/api/movies');
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

  const deleteMovie = async (id) => {
    try {
      await fetch(`/api/movies/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting movie movies:', error);
    } finally {
      setUpdate(true);
    }
  }


  if (loading) return <p>Loading...</p>

  return (
    <>
      <MovieCreator setUpdate={setUpdate} />
      <h1 className="italic font-semibold text-3xl text-center pt-10">Movies:</h1><br />
      {movies.map(movie => (
        <div key={movie._id} className="block mx-auto p-4 mb-3 bg-base-300 flex justify-between max-w-200 ">
          <h2 className="">{movie.title}</h2>
          <div>
          <Link className="btn" href={`/movies/new/` + movie._id}>Details</Link>
          <button onClick={() => deleteMovie(movie._id)} className="btn btn-error">Delete</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default MoviesPage;