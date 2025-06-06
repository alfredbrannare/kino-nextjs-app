'use client';
import Login from '../components/Login';
import TrailerCarousel from '@/components/TrailerCarousel/TrailerCarousel';
import MovieCard from '../components/MovieCard';
import Link from 'next/link';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/user/AuthData';
import Image from 'next/image';
import {
  AuthContextType,
  EventType,
  LiveEventsType,
  MovieType,
} from '@/ts/types';
import EventCardSkeleton from '@/components/events/MovieCardSkeleton';
import ErrorMessage from '@/components/ErrorMessage';

interface MovieWithDefiniteTrailerKey extends MovieType {
  trailerKey: string;
}

function movieHasTrailerKey(
  movie: MovieType,
): movie is MovieWithDefiniteTrailerKey {
  return typeof movie.trailerKey === 'string' && movie.trailerKey.length > 0;
}

const Main = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentMoviesError, setCurrentMoviesError] = useState<string | null>(
    null,
  );
  const [upcomingMoviesError, setUpcomingMoviesError] = useState<string | null>(
    null,
  );
  const [eventsError, setEventsError] = useState<string | null>(null);
  const [liveEventsError, setLiveEventsError] = useState<string | null>(null);
  const [events, setEvents] = useState<EventType[]>([]);
  const [liveEvents, setLiveEvents] = useState<LiveEventsType[]>([]);
  const [upcomingMovies, setUpcomigMovies] = useState<MovieType[]>([]);
  const { isLoggedIn, isLoading } = useAuth() as AuthContextType;

  useEffect(() => {
    const fetchLiveEvents = async () => {
      try {
        const res = await fetch('/api/events/live');
        const data = await res.json();
        console.log(data);
        const limitedData = data.slice(0, 1);
        setLiveEvents(limitedData);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLiveEventsError(
          'Vi har för tillfället problem med att hämta live evenemang',
        );
      } finally {
        setLoading(false);
      }
    };
    fetchLiveEvents();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        const data = await res.json();
        console.log(data);
        const limitedData = data.slice(0, 1);
        setEvents(limitedData);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEventsError('Vi har för tillfället problem med att hämta evenemang');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchCurrentMovies = async () => {
      try {
        const res = await fetch('/api/screenings/currently-showing');
        // Type the expected API response
        const data: MovieType[] = await res.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setCurrentMoviesError(
          'Vi har för tillfället problem med att hämta filmer.',
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentMovies();
  }, []);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const res = await fetch('/api/screenings/upcoming-movies');
        // Type the expected API response
        const data: MovieType[] = await res.json();
        setUpcomigMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setUpcomingMoviesError(
          'Vi har för tillfället problem med att hämta kommande filmer.',
        );
      } finally {
        setLoading(false);
      }
    };
    fetchUpcomingMovies();
  }, []);

  const trailerMovies = movies.filter(movieHasTrailerKey);
  // const [currentSlide, setCurrentSlide] = useState(0);

  // const nextSlide = () =>
  //   setCurrentSlide((prev) => (prev + 1) % trailerMovies.length);
  // const prevSlide = () =>
  //   setCurrentSlide((prev) =>
  //     (prev - 1 + trailerMovies.length) % trailerMovies.length
  //   );

  return (
    <div>
      <div className='w-full'>
        <div className='max-w-screen-2xl mx-auto px-0 sm:px-0'>
          <div className='relative mx-auto w-full border-4 rounded-md border-yellow-400 shadow-[inset_0_0_10px_#facc15,0_0_20px_#facc15] bg-[#250303]'>
            <TrailerCarousel trailerMovies={trailerMovies} />
            <section className='w-full max-w-screen-xl mx-auto px-4 my-6'>
              <h2 className='text-3xl text-[#CDCDCD] font-bold text-center'>
                VISAS JUST NU
              </h2>

              {currentMoviesError && (
                <ErrorMessage error={currentMoviesError} />
              )}

              {/* Grid for the cards */}
              <div className='flex flex-row overflow-auto px-2 py-8 w-full xl:justify-center'>
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className='flex justify-center'>
                        <MovieCardSkeleton />
                      </div>
                    ))
                  : movies.map(
                      (
                        movie, // movie is now correctly typed as MovieType
                      ) => (
                        <div key={movie._id} className='flex justify-center'>
                          <MovieCard movie={movie} />
                        </div>
                      ),
                    )}
              </div>
            </section>
            <section className='w-full max-w-screen-xl mx-auto px-4 my-6'>
              <h2 className='text-3xl text-[#CDCDCD] font-bold text-center'>
                KOMMANDE FILMER
              </h2>

              {upcomingMoviesError && (
                <ErrorMessage error={upcomingMoviesError} />
              )}

              <div className='flex flex-row overflow-auto px-2 py-8 w-full xl:justify-center'>
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className='flex justify-start'>
                        <MovieCardSkeleton />
                      </div>
                    ))
                  : upcomingMovies.map(
                      (
                        movie, // movie is now correctly typed as MovieType
                      ) => (
                        <div key={movie._id} className='flex justify-start'>
                          <MovieCard movie={movie} />
                        </div>
                      ),
                    )}
              </div>
            </section>
            <div>
              <div className='flex flex-col md:flex-row justify-center items-center gap-4 md:gap-20'>
                <Link
                  href='/movies'
                  className='bg-transparent hover:bg-[#CDCDCD] text-[#CDCDCD] font-semibold hover:text-[#2B0404] py-2 px-4 rounded transition-all duration-300 ease-in-out border border-gray-200 hover:border-transparent rounded hover:cursor-pointer hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:scale-105 backdrop-brightness-110'
                >
                  SE ALLA FILMER
                </Link>
              </div>
              <section className='my-12 text-center'>
                <h1 className='text-3xl text-[#CDCDCD] font-bold text-center'>
                  LIVE PÅ KINO
                </h1>
                {liveEventsError && <ErrorMessage error={liveEventsError} />}
                {loading ? (
                  <EventCardSkeleton></EventCardSkeleton>
                ) : (
                  liveEvents.map((event) => (
                    <div className='w-full my-6' key={event._id}>
                      <div className='justify-center align-center my-6'>
                        <div className='flex flex-col gap-6 px-4 py-8'>
                          <div className='bg-[#2B0404] rounded-2xl shadow-lg p-6 max-w-6xl mx-auto'>
                            <div className='hero-content flex-col lg:flex-row-reverse'>
                              <Image
                                src={event.image}
                                width='384'
                                height='256'
                                loading='lazy'
                                className='w-[384px] h-[256px] object-cover'
                                alt={`Image for ${event.title}`}
                              />
                              <div className='text-center lg:text-left mt-8 lg:mt-0 mx-4 max-w-xl lg:max-w-md w-full'>
                                <h1 className='text-3xl font-bold text-[#CDCDCD]'>
                                  {event.title}
                                </h1>
                                <p className='mt-3'>
                                  {Math.floor(event.runtime / 60)} timmar och{' '}
                                  {event.runtime % 60} minuter
                                </p>
                                <p className='py-6 text-[#CDCDCD]'>
                                  {event.description}
                                </p>
                                <div className='flex justify-center lg:justify-start mt-6'>
                                  <Link
                                    href='/events?tab=tab1'
                                    className='bg-transparent hover:bg-[#CDCDCD] text-[#CDCDCD] font-semibold hover:text-[#2B0404] py-2 px-4 rounded transition-all duration-300 ease-in-out border border-gray-200 hover:border-transparent rounded hover:cursor-pointer hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:scale-105 backdrop-brightness-110'
                                  >
                                    LÄS MER
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <Link
                  href='/events?tab=tab1'
                  className='bg-transparent hover:bg-[#CDCDCD] text-[#CDCDCD] font-semibold hover:text-[#2B0404] py-2 px-4 rounded transition-all duration-300 ease-in-out border border-gray-200 hover:border-transparent rounded hover:cursor-pointer hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:scale-105 backdrop-brightness-110'
                >
                  SE ALLA LIVE EVENEMANG
                </Link>
              </section>
              <section>
                <h1 className='text-3xl text-[#CDCDCD] font-bold text-center'>
                  EVENEMANG
                </h1>
                {eventsError && <ErrorMessage error={eventsError} />}
                {loading ? (
                  <EventCardSkeleton></EventCardSkeleton>
                ) : (
                  events.map((event) => (
                    <div
                      className='flex flex-col gap-6 px-4 py-8'
                      key={event._id}
                    >
                      <div className='bg-[#2B0404] rounded-2xl shadow-lg p-6 max-w-6xl mx-auto'>
                        <div className='bg-[#2B0404] py-0 px-4'>
                          <div className='flex flex-col items-center lg:items-start justify-center lg:flex-row gap-8 max-w-6xl mx-auto'>
                            <Image
                              src={event.image}
                              width='384'
                              height='256'
                              loading='lazy'
                              className='w-full max-w-sm h-auto'
                              alt={`Image for ${event.title}`}
                            />
                            <div className='w-full max-w-md mx-auto text-center lg:text-right mt-8 lg:mt-0'>
                              <h1 className='text-3xl font-bold text-[#CDCDCD]'>
                                {event.title}
                              </h1>
                              <p className='py-6 text-[#CDCDCD]'>
                                {event.description}
                              </p>
                              <div className='flex justify-center lg:justify-end mt-6'>
                                <Link
                                  href='/events?tab=tab2'
                                  className='bg-transparent hover:bg-[#CDCDCD] text-[#CDCDCD] font-semibold hover:text-[#2B0404] py-2 px-4 rounded transition-all duration-300 ease-in-out border border-gray-200 hover:border-transparent rounded hover:cursor-pointer hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:scale-105 backdrop-brightness-110'
                                >
                                  LÄS MER
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </section>
              <div className='bg-[#CDCDCD] py-16 px-4 text-center'>
                <h2 className='text-3xl font-bold text-[#2B0404] drop-shadow-md mb-8'>
                  KINO - EN ALLDELES SPECIELL BIOUPPLEVELSE
                </h2>
                <h3 className='text-l font-bold text-[#2B0404] drop-shadow-md mb-8'>
                  AV FILMÄLSKARE - FÖR FILMÄLSKARE
                </h3>
                {isLoading ? (
                  <div className='min-h-[150px]' />
                ) : !isLoggedIn ? (
                  <Login />
                ) : null}
              </div>

              <div className='flex flex-col gap-6 px-4 py-8 bg-[#250303]'>
                <div className='bg-[#2B0404] rounded-2xl shadow-lg p-6 max-w-6xl mx-auto'>
                  <div className='hero-content flex-col lg:flex-row-reverse'>
                    <div className='aspect-3/2 w-full max-w-sm'>
                      <Image
                        src='/KinoEntrance.png'
                        width='384'
                        height='256'
                        loading='lazy'
                        className='w-full max-w-sm h-auto'
                        alt='Kino Entrance'
                      />
                    </div>
                    <div className='text-center lg:text-left mt-8 lg:mt-0 mx-4 max-w-xl lg:max-w-md w-full'>
                      <h1 className='text-3xl font-bold text-[#CDCDCD]'>
                        DIN LOKALA BIOGRAF
                      </h1>
                      <p className='py-6 text-[#CDCDCD]'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                      <div className='flex justify-center lg:justify-start mt-6'>
                        <a
                          href='/about'
                          className='bg-transparent hover:bg-[#CDCDCD] text-[#CDCDCD] font-semibold hover:text-[#2B0404] py-2 px-4 rounded transition-all duration-300 ease-in-out border border-gray-200 hover:border-transparent rounded hover:cursor-pointer hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:scale-105 backdrop-brightness-110'
                        >
                          LÄS MER
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-6 px-4 py-8 bg-[#250303]'>
                <div className='bg-[#2B0404] rounded-2xl shadow-lg p-6 max-w-6xl mx-auto'>
                  <div className='bg-[#2B0404] py-0 px-4'>
                    <div className='flex flex-col items-center lg:items-start justify-center lg:flex-row gap-8 max-w-6xl mx-auto'>
                      <div className='aspect-3/2 w-full max-w-sm'>
                        <Image
                          src='/KinoDoors.png'
                          width='384'
                          height='256'
                          loading='lazy'
                          className='w-full max-w-sm h-auto'
                          alt='Kino Entrance'
                        />
                      </div>
                      <div className='w-full max-w-md mx-auto text-center lg:text-right mt-8 lg:mt-0'>
                        <h1 className='text-3xl font-bold text-[#CDCDCD]'>
                          ANNORLUNDA OCH UNIKT
                        </h1>
                        <p className='py-6 text-[#CDCDCD]'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                        <div className='flex justify-center lg:justify-end mt-6'>
                          <a
                            href='/about'
                            className='bg-transparent hover:bg-[#CDCDCD] text-[#CDCDCD] font-semibold hover:text-[#2B0404] py-2 px-4 rounded transition-all duration-300 ease-in-out border border-gray-200 hover:border-transparent rounded hover:cursor-pointer hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:scale-105 backdrop-brightness-110'
                          >
                            LÄS MER
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='bg-[#CDCDCD] py-16 px-4 text-center'>
                <h2 className='text-3xl font-bold text-[#2B0404] drop-shadow-md mb-8'>
                  SÄKRA DIN BILJETT TILL KOMMANDE EVENEMANG
                </h2>
                <div className='flex flex-col md:flex-row justify-center items-center gap-4 md:gap-20'>
                  <a
                    href='/events'
                    className='bg-transparent hover:bg-[#2B0404] text-[#2B0404] font-semibold hover:text-[#CDCDCD] py-2 px-4 rounded transition-all duration-300 ease-in-out border-2 border-[#2B0404] hover:shadow-md hover:scale-105 hover:cursor-pointer'
                  >
                    SE EVENEMANG
                  </a>
                </div>
              </div>

              <div className='flex flex-col gap-6 px-4 py-8 bg-[#250303]'>
                <div className='bg-[#2B0404] rounded-2xl shadow-lg p-6 max-w-6xl mx-auto'>
                  <div className='hero bg-[#2B0404] py-0 px-4'>
                    <div className='hero-content flex-col min-w-0 lg:flex-row-reverse max-w-6xl mx-auto bg-[#2B0404]'>
                      <div className='aspect-[3/2] w-full max-w-sm'>
                        <Image
                          src='/KinoScreen.png'
                          width='384'
                          height='256'
                          loading='lazy'
                          className='w-full max-w-sm h-auto'
                          alt='Kino Entrance'
                        />
                      </div>
                      <div className='text-center lg:text-left mt-8 lg:mt-0 mx-4 max-w-xl lg:max-w-md w-full'>
                        <h1 className='text-3xl font-bold text-[#CDCDCD]'>
                          BÄTTRE LJUD OCH BILD ÄN HEMMA
                        </h1>
                        <p className='py-6 text-[#CDCDCD] '>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-6 px-4 py-8 bg-[#250303]'>
                <div className='bg-[#2B0404] rounded-2xl shadow-lg p-6 max-w-6xl mx-auto'>
                  <div className='hero bg-[#2B0404] py-0 px-4'>
                    <div className='hero-content flex-col min-w-0 lg:flex-row max-w-6xl mx-auto bg-[#2B0404]'>
                      <div className='aspect-[3/2] w-full max-w-sm'>
                        <Image
                          src='/KinoSeats.png'
                          width='384'
                          height='256'
                          loading='lazy'
                          className='w-full max-w-sm h-auto'
                          alt='Kino Entrance'
                        />
                      </div>
                      <div className='text-center lg:text-right mt-8 lg:mt-0 mx-4 max-w-xl lg:max-w-md w-full'>
                        <h1 className='text-3xl font-bold text-[#CDCDCD]'>
                          MAT OCH DRYCK VID DIN PLATS
                        </h1>
                        <p className='py-6 text-[#CDCDCD]'>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
