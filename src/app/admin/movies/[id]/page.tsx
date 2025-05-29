'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Params } from '@/ts/types';
import Image from 'next/image';
import { MovieType } from '@/ts/types';

const Movie = ({ params }: Params) => {
  const [movie, setMovie] = useState<MovieType>();
  const [loading, setLoading] = useState(true);

  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/movies/${id}`);
        const data = await response.json();

        setMovie(data);
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
      <h1>{movie.title}</h1>
      <span>{movie.description}</span>
      <Image
        className="block mx-auto pt-10 max-w-lg"
        src={movie.image}
        alt={movie.title}
      />
      <Link
        className="btn"
        href={'/admin/movies'}>
        Back
      </Link>
    </div>
  )
}

export default Movie;