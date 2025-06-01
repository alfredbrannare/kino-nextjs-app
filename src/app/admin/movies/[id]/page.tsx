'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MovieType } from '@/ts/types';

const Movie = () => {
  const [movie, setMovie] = useState<MovieType | undefined>();
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/movies/${id}`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error('Error fetching movie:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <div className='post'>
      <h1>{movie.title}</h1>
      <span>{movie.description}</span>
      <Image
        className='block mx-auto pt-10 max-w-lg'
        src={movie.image}
        alt={movie.title}
        width={600}
        height={400}
      />
      <Link className='btn' href='/admin/movies'>
        Back
      </Link>
    </div>
  );
};

export default Movie;
