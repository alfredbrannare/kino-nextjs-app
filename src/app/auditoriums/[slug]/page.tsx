import BookingClient from '@/components/booking/BookingClient';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { NextRequest } from 'next/server';

export const metadata = {
  title: 'Boka biljetter – Kino Uppsala',
  description:
    'Välj biljetter och sittplatser till din föreställning och genomför bokningen enkelt online.',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const slug = (await params).slug;

  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get('movieId');
  const screeningTime = searchParams.get('screeningTime');

  if (!movieId || !screeningTime) {
    return <p className='text-center mt-10 text-gray-400'>Laddar visning...</p>;
  }

  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(
    `${baseUrl}/api/screenings/validate?movieId=${movieId}&screeningTime=${screeningTime}&auditorium=${slug}`,
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
