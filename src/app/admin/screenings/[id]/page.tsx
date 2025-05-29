'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Params, ScreeningType } from '@/ts/types';

const Movie = ({ params }: Params) => {
  const [screening, setScreening] = useState<ScreeningType>();
  const [loading, setLoading] = useState(true);

  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/screenings/${id}`);
        const data = await response.json();

        setScreening(data as ScreeningType);
      } catch (error) {
        console.error('Error fetching screenings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id])

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
      <Link
        className="btn"
        href={'/admin/screenings'}>
        Back
      </Link>
    </div>
  )
}

export default Movie;