'use client'
import { useEffect, useState, use } from 'react';
import MovieDetails from 'src/components/MovieDetails';

const Movie = ({ params }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const resolvedParams = use(params); // Unwrap the params promise/object
  const id = resolvedParams.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/movies/${id}`);
        const data = await response.json();

        setMovie(data);
        console.log(movie)
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id])

if (loading) return <p>Loading...</p>
if (!movie) return <p>Movie not found</p>;

  return (
    <div className='post'>
      <MovieDetails movie={movie}/>
    </div>
  )
}

export default Movie;