import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';
import { MovieType } from '@/ts/types';

type Props = {
  movie: MovieType;
};

const MovieCard: FC<Props> = ({ movie }) => {
  if (!movie || !movie._id || !movie.title || !movie.image) {
    return (
      <div className='w-72 h-96 mx-4 p-4 bg-gray-100 text-center text-sm text-gray-500'>
        Movie data unavailable
      </div>
    );
  }

  const ratingNum = parseFloat(movie.rating || '');
  const roundedRating = isNaN(ratingNum)
    ? 'N/A'
    : Math.round(ratingNum * 10) / 10;
  const hasRating = typeof roundedRating === 'number' && roundedRating > 0;

  let formattedDate = null;
  let formattedTime = null;

  if (movie.startTime) {
    const date = new Date(movie.startTime);
    const time = date.toLocaleTimeString('sv-SE', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const day = date.toLocaleString('sv-SE', { weekday: 'long' });
    const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);
    const dayNumber = date.getDate();
    const month = date.getMonth() + 1;

    formattedDate = `${capitalizedDay} ${dayNumber}/${month}`;
    formattedTime = `${time}`;
  }

  const imageUrl = movie.image.replace('/original/', '/w500/');

  return (
    <article className='group relative'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 opacity-0 group-hover:opacity-100 w-48 h-79 hidden xl:block'>
        <Image
          src={imageUrl}
          alt='Blur effect of poster'
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = '/kino-card.jpg';
          }}
          className='w-full h-full object-cover blur-xl'
          width={192}
          height={316}
          quality={5}
          priority={false}
          loading='lazy'
          sizes='200px'
        />
      </div>

      <Link
        href={`/movies/${movie.movieId ?? movie._id}`}
        className='relative block w-50 h-83 rounded overflow-hidden shadow-lg mx-4 my-2'
        id={movie.movieId ?? movie._id}
        aria-labelledby={`movie-title-${movie.movieId ?? movie._id}`}
      >
        <Image
          src={imageUrl}
          alt={movie.title}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = '/kino-card.jpg';
          }}
          className='w-full h-full object-fit relative'
          width={200}
          height={332}
          quality={50}
          sizes='200px'
        />

        <div className='absolute bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.86)] text-white p-2 opacity-100 sm:opacity-100 xl:opacity-0 group-hover:opacity-100 xl:group-hover:opacity-100 transition-opacity duration-300'>
          <h2 className='text-lg font-semibold truncate'>{movie.title}</h2>
          {hasRating && (
            <p className='text-sm'>
              <span aria-label={`${roundedRating} out of 10 rating`}>
                {roundedRating}⭐
              </span>
            </p>
          )}
          {formattedDate && formattedTime ? (
            <>
              <p>{formattedDate}</p>
              <p>{formattedTime}</p>
            </>
          ) : movie.year && new Date(movie.year) > new Date() ? (
            <>
              <p>Premiär</p>
              <p>{movie.year}</p>
            </>
          ) : (
            ''
          )}
        </div>
      </Link>
    </article>
  );
};

export default MovieCard;
