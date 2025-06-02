// 'use client';
// import { useEffect, useState, use } from 'react';
import MovieDetails from '@/components/MovieDetails';
import { headers } from 'next/headers';
import ErrorMessage from '@/components/ErrorMessage';

interface MoviePageProps {
  params: { id: string };
}

const Movie = async ({ params }: MoviePageProps) => {
  const { id } = params;

  // get host from headers to build URL
  const headersList = await headers(); // headers() is synchronous
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  // const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  try {
    const res = await fetch(`${baseUrl}/api/movies/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok)
      throw new Error(`Failed to fetch Movie (status: ${res.status})`);

    const movie = await res.json();
    return (
      <div className='post'>
        <MovieDetails movie={movie} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching movie:', error);
    return <ErrorMessage error='Movie not found' />;
  }
};

export default Movie;
