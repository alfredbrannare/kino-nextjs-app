'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ScreeningType } from '@/ts/types';

const ScreeningPage = () => {
  const [screening, setScreening] = useState<ScreeningType>();
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/screenings/${id}`);
        const data = await response.json();
        setScreening(data as ScreeningType);
      } catch (error) {
        console.error('Error fetching screening:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!screening) return <p>Screening not found</p>;

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-2'>
        {typeof screening.movieId === 'object' && screening.movieId !== null
          ? screening.movieId.title
          : `Movie (ID: ${screening.movieId})`}
      </h1>
      <div className='mb-4 text-gray-700'>
        <p>
          <strong>Auditorium:</strong>{' '}
          {typeof screening.auditoriumId === 'object' &&
          screening.auditoriumId !== null
            ? screening.auditoriumId.name
            : `Auditorium (ID: ${screening.auditoriumId})`}
        </p>
        <p>
          <strong>Start Time:</strong>{' '}
          {new Date(screening.startTime).toLocaleString('sv-SE', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </p>
      </div>

      <Link href='/admin/screenings' className='text-blue-500 hover:underline'>
        Back
      </Link>
    </div>
  );
};

export default ScreeningPage;
