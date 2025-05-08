'use client'
import MovieCard from "src/components/MovieCard";
import MovieCardSkeleton from "src/components/MovieCardSkeleton";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const res = await fetch('/api/screenings/next');
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Vi har för tillfället problem med att hämta filmer.');
      } finally {
        setLoading(false);
      }
    };
    fetchUpcomingMovies();
  }, []);

  return (
    <div>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
            className="w-full"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
            className="w-full"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
            className="w-full"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide4" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
            className="w-full"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>

      <div className="justify-center align-center my-6">
        <h1 className="text-4xl font-weight-700 text-center">Visas nu</h1>
        {error && (
          <div className="alert alert-warning shadow-lg justify-center align-center mx-auto my-10 max-w-100">
            <div className="text-center text-black">
              <Info />
              <span className="font-weight-700 text-xl"><strong>Fel</strong></span>
            </div>
            <div className="text-sm text-black font-weight-700 text-xl text-center">
              <strong>{error}</strong>
            </div>
          </div>
        )}
        <div className="flex flex-row justify-start xl:justify-center items-center overflow-x-auto space-x-4 px-4 my-6 mx-4">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <MovieCardSkeleton key={i} className="flex-shrink-0" />
            ))
          ) : (
            movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} className="flex-shrink-0" />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;