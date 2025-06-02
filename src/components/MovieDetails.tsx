'use client';
import Link from 'next/link';
import Views from './views/Views';
import ReviewForm from './reviews/ReviewForm';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/components/user/AuthData';
import RatingCard from './movies/singel/RatingCard';
import MovieHeader from './movies/singel/MovieHeader';
import dynamic from 'next/dynamic';
import Login from './Login';
import Image from 'next/image';
import {
  AuthContextType,
  MovieType,
  ReviewsType,
  ScreeningType,
  AuditoriumType,
} from '@/ts/types';
import ErrorMessage from './ErrorMessage';

type Props = {
  movie: MovieType;
};

interface ExtendedScreeningType
  extends Omit<ScreeningType, 'auditoriumId' | 'auditorium'> {
  bookedCount: number;
  tid: string;
  resolvedSal: string;
  resolvedAuditoriumSlug?: string;
  resolvedAuditoriumCapacity?: number;
  _id: string;
  movieId: MovieType | string;
  startTime: string;
}

type BookingWithSeats = {
  seats?: { length: number }[];
};

const MovieDetails: FC<Props> = ({ movie }) => {
  const { isLoggedIn, userData } = useAuth() as AuthContextType;
  const [reviews, setReviews] = useState<ReviewsType[]>([]);
  const [screenings, setScreenings] = useState<ExtendedScreeningType[]>([]);
  const [shouldLoadReviews, setShouldLoadReviews] = useState<boolean>(false);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  const ReviewsList = dynamic(() => import('./reviews/ReviewsList'), {
    ssr: false,
    loading: () => <p className='text-center'>Laddar recensioner...</p>,
  });

  const TrailerCard = dynamic(() => import('./movies/singel/TrailerCard'), {
    ssr: false,
  });

  //
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadReviews(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    const reviewsEl = document.getElementById(`reviews-section`);
    if (reviewsEl) observer.observe(reviewsEl);
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/reviews?movieId=${movie._id}`);
        const data = await res.json();
        if (res.ok) {
          setReviews(data.reviews);
        } else {
          console.error('Failed to fetch reviews:', data.message);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviewsError('Vi har för tillfället problem att hämta recensioner');
      }
    };
    //- Patrik
    const fetchScreenings = async () => {
      try {
        const res = await fetch(`/api/screenings?movieId=${movie._id}`);
        const data: ScreeningType[] = await res.json();

        const enrichedData: ExtendedScreeningType[] = data.map(
          (apiScreening: ScreeningType) => {
            const bookedSeatsAsArray = apiScreening.bookedSeats as unknown as
              | BookingWithSeats[]
              | undefined;
            const bookedCount =
              bookedSeatsAsArray?.reduce(
                (sum, booking: BookingWithSeats) =>
                  sum + (booking.seats?.length || 0),
                0,
              ) || 0;

            let resolvedSal = 'Okänd salong';
            let resolvedAuditoriumSlug: string | undefined = undefined;
            let resolvedAuditoriumCapacity: number | undefined = undefined;

            if (
              typeof apiScreening.auditoriumId === 'object' &&
              apiScreening.auditoriumId !== null
            ) {
              const auditorium = apiScreening.auditoriumId as AuditoriumType;
              resolvedSal = auditorium.name || 'Okänd salong';
              resolvedAuditoriumSlug = auditorium.slug;
              resolvedAuditoriumCapacity = auditorium.capacity;
            }

            return {
              _id: apiScreening._id,
              movieId: apiScreening.movieId,
              startTime: apiScreening.startTime,
              screeningTime: apiScreening.startTime,
              bookedCount,
              tid: new Date(apiScreening.startTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
              resolvedSal,
              resolvedAuditoriumSlug,
              resolvedAuditoriumCapacity,
            };
          },
        );

        setScreenings(enrichedData);
      } catch (error) {
        console.error('Error fetching screenings', error);
      }
    };

    if (movie._id) {
      fetchScreenings();
    }

    if (shouldLoadReviews && movie._id) {
      fetchReviews();
    }
  }, [shouldLoadReviews, movie._id]);

  const params = useParams();
  const movieId = params.id;

  // to get new review
  const handleAddReview = async ({
    rating,
    text,
  }: {
    rating: string;
    text: string;
  }) => {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ movieId, rating, text }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Review saved:', data.review);
      // refresh reviews here
      const res = await fetch(`/api/reviews?movieId=${movie._id}`);
      const latest = await res.json();
      setReviews(latest.reviews);
    } else {
      console.error('Failed to save review');
    }
  };

  return (
    <>
      <div className='bg-[#250303] max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-5 gap-2 border border-yellow-500'>
        <div className='flex flex-col justify-center order-1 gap-6 mt-10 text-center col-span-full md:text-left md:col-span-3'>
          <MovieHeader
            title={movie.title}
            // description={movie.description}
            ageRating={
              typeof movie.ageRating === 'string'
                ? isNaN(parseInt(movie.ageRating, 10))
                  ? 10
                  : parseInt(movie.ageRating, 10)
                : (movie.ageRating ?? 10)
            }
            duration={
              typeof movie.runtime === 'number'
                ? movie.runtime.toString()
                : (movie.runtime ?? '1.40')
            }
            genre={
              movie.genres
                ? Array.isArray(movie.genres)
                  ? movie.genres.join(', ')
                  : movie.genres
                : 'Horror'
            }
          />
        </div>

        <div className='order-6 mt-10 md:order-2 col-span-full md:col-span-2 '>
          <RatingCard rating={parseFloat(movie.rating || '0') || 0} />
        </div>

        <div className='flex flex-col justify-between order-3 h-full mt-4 md:col-span-3'>
          <div className='pb-0 mx-4 mb-8 border border-yellow-500 rounded-lg shadow shadow-lg'>
            <p className='m-2 text-xl text-center md:m-4 md:text-left'>
              {movie.description}
            </p>
          </div>
          <div className='justify-center'>
            <div className='justify-end m-4 '>
              <TrailerCard trailerKey={movie.trailerKey} title={movie.title} />
            </div>
          </div>
        </div>

        <div className='flex justify-center order-2 md:order-4 col-span-full md:col-span-2 '>
          <Image
            src={movie.image}
            alt={movie.title}
            width={400}
            height={600}
            priority
            className='object-contain rounded-lg shadow-lg'
          />
        </div>
        <div className='row-start-5 col-span-full md:col-span-5 md:row-start-3'>
          <div className='bg-[#2B0404] shadow-lg rounded-lg p-6 shadow max-h-full my-4 '>
            <h2 className='mb-4 text-3xl font-bold text-center'>
              Välj visning
            </h2>
            <div className='grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2'>
              {screenings.length === 0 ? (
                <div className='col-span-full flex justify-center items-center'>
                  <p>Inga visningar hittades.</p>
                </div>
              ) : (
                screenings.map((screening) => (
                  <Link
                    key={screening._id}
                    href={{
                      pathname: screening.resolvedAuditoriumSlug
                        ? `/auditoriums/${screening.resolvedAuditoriumSlug}`
                        : '#',
                      query: {
                        movieId:
                          typeof screening.movieId === 'string'
                            ? screening.movieId
                            : screening.movieId._id,
                        screeningTime: screening.startTime,
                        auditorium: screening.resolvedAuditoriumSlug || '',
                      },
                    }}>
                    <Views
                      views={{
                        tid: new Date(screening.startTime).toLocaleString(
                          'sv-SE',
                          {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          },
                        ),
                        sal: screening.resolvedSal,
                        maxSeats: screening.resolvedAuditoriumCapacity ?? 100,
                        bookedCount: screening.bookedCount,
                      }}
                    />
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
        <div
          id='reviews-section'
          className='bg-[#2B0404] shadow-lg rounded-lg col-span-full w-full justify-center md:order-5 order-7 mx-auto md:justify-center flex flex-col items-center mt-4 md:mt-14'>
          <h2 className='m-4 text-2xl font-bold'>Reviews</h2>
          <div className='md:w-md'>
            <div>
              {!isLoggedIn ? (
                <div className='flex items-center justify-center gap-2 mx-4 text-xl'>
                  <span className='inline-block'>
                    <Login />
                  </span>
                  <span>för att lämna en review</span>
                </div>
              ) : (
                <ReviewForm
                  handleAddReview={handleAddReview}
                  userData={userData ?? null}
                />
              )}
            </div>
            <div className='mb-5'>
              {reviewsError ? (
                <ErrorMessage error={reviewsError} />
              ) : (
                <ReviewsList reviews={reviews} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
