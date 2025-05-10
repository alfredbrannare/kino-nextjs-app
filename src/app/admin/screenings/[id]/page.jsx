'use client'
import { useEffect, useState, use } from 'react';
import MovieDetails from 'src/components/MovieDetails';

const Movie = ({ params }) => {
  const [screening, setScreening] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = use(params); // Unwrap the params promise/object

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/screenings/${id}`);
        const data = await response.json();

        setScreening(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [])

if (loading) return <p>Loading...</p>
if (!screening) return <p>Screening not found</p>;

  return (
    <div className='post'>
      <h1>{screening.movieId.title}</h1>
      <span>{screening.auditoriumId.name}</span><br />
      <span>{new Date(screening.startTime).toLocaleString('sv-SE', {
						dateStyle: 'medium',
						timeStyle: 'short',
					})}</span>
    </div>
  )
}

export default Movie;