'use client';

import { useEffect, useState } from 'react';
import Views from '@/components/views/Views';
import Link from 'next/link';
import Image from 'next/image';
import { MovieType } from '@/ts/types'

export default function TicketsPage() {
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/movies-with-screenings');
      const data = await res.json();
      setMovies(data);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <h1 className="text-4xl font-bold text-[#CDCDCD] mb-8 text-center">Biljetter</h1>

      {movies.map((movie) => (
        <div
          key={movie._id}
          className="p-6 border border-yellow-400 rounded-xl shadow-[inset_0_0_10px_#facc15,0_0_20px_#facc15]"
        >
          <div className="flex flex-col sm:flex-row gap-6">
            <Image
              src={movie.image}
              alt={movie.title}
              width={128}
              height={192}
              className="w-40 rounded shadow-md mx-auto sm:mx-0"
            />

            <div className="flex-1 text-center sm:text-left flex flex-col">
              <div className="flex justify-between items-start mb-2 flex-wrap">
                <h2 className="text-4xl text-center sm:text-left text-[#CDCDCD] font-bold max-w-xs">
                  {movie.title}
                </h2>
                <div className="flex space-x-6 text-yellow-400 text-sm whitespace-nowrap mt-2 sm:mt-0">
                  <p>Längd: {movie.runtime || 'Ej specificerad'} minuter</p>
                  <p>Genre: {movie.genres || 'Ej specificerad'}</p>
                </div>
              </div>

              <p className="pt-4 text-sm text-center sm:text-left text-[#CDCDCD] max-w-3xl mx-auto sm:mx-0">
                {movie.description}
              </p>
            </div>
          </div>

          {/* Screenings / Booking Buttons */}
          <div className="mt-6">
            {!movie.screenings || movie.screenings.length === 0 ? (
              <p className="text-sm text-center sm:text-left text-[#CDCDCD]">Inga visningar för tillfället.</p>
            ) : (
              <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
                {movie.screenings.map((s) => (
                  <Link
                    key={s._id}
                    href={{
                      pathname: `/auditoriums/city`,
                      query: {
                        movieId: movie._id,
                        movieTitle: movie.title,
                        screeningTime: s.startTime,
                        auditorium: s.auditorium,
                      },
                    }}
                  >
                    <div className="transform scale-90 p-0 m-0">
                      <Views
                        key={s._id}
                        views={{
                          tid: new Date(s.startTime).toLocaleString('sv-SE', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          }),
                          sal: s.auditorium,
                          maxSeats: (s.bookedCount ?? 0) + (s.availableSeats ?? 0),
                          bookedCount: s.bookedCount ?? 0,
                        }}
                        size="small"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}