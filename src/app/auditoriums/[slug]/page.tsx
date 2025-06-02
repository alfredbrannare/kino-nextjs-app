import BookingClient from '@/components/booking/BookingClient';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { BookingPageParamsProps } from '@/ts/types';

export const metadata = {
  title: 'Boka biljetter – Kino Uppsala',
  description:
    'Välj biljetter och sittplatser till din föreställning och genomför bokningen enkelt online.',
};

export default async function Page({ params, searchParams }: BookingPageParamsProps) {
  const { slug } = params;
  const { movieId, screeningTime } = searchParams;

  if (!movieId || !screeningTime) {
    return <p className='text-center mt-10 text-gray-400'>Laddar visning...</p>;
  }

  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(
    `${baseUrl}/api/screenings/validate?movieId=${movieId}&screeningTime=${screeningTime}&auditorium=${slug}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    notFound();
  }

  return (
    <BookingClient
      movieId={movieId}
      screeningTime={screeningTime}
      auditorium={slug}
    />
  );
}