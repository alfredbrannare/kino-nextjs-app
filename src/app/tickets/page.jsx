'use client';

import { useEffect, useState } from 'react';

export default function TicketsPage() {
  const [movies, setMovies] = useState([]);

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
            <img
              src={movie.image}
              alt={movie.title}
              className="w-40 rounded shadow-md"
            />

            <div className="flex-1 space-y-2">
              <h2 className="text-2xl text-[#CDCDCD] font-semibold">{movie.title}</h2>
              <p className="text-sm text-[#CDCDCD]">{movie.description}</p>
              <p className="text-sm text-yellow-400">
                Åldersgräns: {movie.ageRating || 'Ej specificerad'}
              </p>

              <div className="mt-4">
                <h3 className="font-medium mb-2">Kommande visningar:</h3>
                {movie.screenings.length === 0 ? (
                  <p className="text-sm text-gray-400">Inga visningar bokade.</p>
                ) : (
                  <ul className="space-y-2">
                    {movie.screenings.map((s) => (
                      <li key={s._id} className="flex justify-between text-sm">
                        <span>
                          {new Date(s.startTime).toLocaleString('sv-SE', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        <span className="text-yellow-300">{s.auditorium}</span>
                        <span>{s.availableSeats} lediga platser</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}