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
        <h1 className="text-3xl text-[#CDCDCD] font-bold text-center">FILMER PÅ KINO</h1>
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
        <div className="flex justify-center gap-20 my-10">
          <button className="bg-transparent hover:bg-[#CDCDCD] text-[#CDCDCD] font-semibold hover:text-[#2B0404] py-2 px-4 rounded transition-all duration-300 ease-in-out border border-gray-200 hover:border-transparent hover:cursor-pointer hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:scale-105 backdrop-brightness-110">            BOKA BILJETT
          </button>
          <button class="bg-transparent hover:bg-[#CDCDCD] text-[#CDCDCD] font-semibold hover:text-[#2B0404] py-2 px-4 rounded transition-all duration-300 ease-in-out border border-gray-200 hover:border-transparent rounded hover:cursor-pointer hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:scale-105 backdrop-brightness-110">
            SE ALLA FILMER
          </button>
        </div>

        <div className="justify-center align-center my-6">
          <h1 className="text-3xl text-[#CDCDCD] font-bold text-center">LIVE PÅ KINO</h1>
        </div>

        <div className="bg-[#CDCDCD] py-16 px-4 text-center">
          <h2 className="text-3xl font-bold text-[#2B0404] drop-shadow-md mb-8">
            KINO - EN ALLDELES SPECIELL BIOUPPLEVELSE
          </h2>
          <h3 className="text-l font-bold text-[#2B0404] drop-shadow-md mb-8">
            AV FILMÄLSKARE - FÖR FILMÄLSKARE
          </h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-20">
            <button className="bg-transparent hover:bg-[#2B0404] text-[#2B0404] font-semibold hover:text-[#CDCDCD] py-2 px-4 rounded transition-all duration-300 ease-in-out border-2 border-[#2B0404] hover:shadow-md hover:scale-105 hover:cursor-pointer">
              BLI MEDLEM
            </button>
            <button className="bg-transparent hover:bg-[#2B0404] text-[#2B0404] font-semibold hover:text-[#CDCDCD] py-2 px-4 rounded transition-all duration-300 ease-in-out border-2 border-[#2B0404] hover:shadow-md hover:scale-105 hover:cursor-pointer">
              EVENEMANG
            </button>
          </div>
        </div>

        <div className="hero bg-[#2B0404] py-0 px-4">
          <div className="hero-content flex-col lg:flex-row-reverse max-w-6xl mx-auto bg-[#2B0404]">
            <img
              src="/KinoEntrance.png"
              className="max-w-sm rounded-lg shadow-2xl"
              alt="Kino Entrance"
            />
            <div className="text-center lg:text-left mt-8 lg:mt-0 mx-4">
              <h1 className="text-3xl font-bold text-[#CDCDCD]">DIN LOKALA BIOGRAF</h1>
              <p className="py-6 text-[#CDCDCD] ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <button className="btn bg-[#2B0404] text-[#CDCDCD] hover:bg-[#CDCDCD] hover:text-[#2B0404] transition-all duration-300 ease-in-out hover:shadow-md hover:scale-105 hover:cursor-pointer">
                LÄS MER
              </button>
            </div>
          </div>
        </div>
        <div className="hero bg-[#2B0404] py-0 px-4">
          <div className="hero-content flex-col lg:flex-row max-w-6xl mx-auto bg-[#2B0404]">
            <img
              src="/KinoDoors.png"
              className="max-w-sm rounded-lg shadow-2xl"
              alt="Kino Entrance"
            />
            <div className="text-center lg:text-left mt-8 lg:mt-0 mx-4">
              <h1 className="text-3xl font-bold text-[#CDCDCD]">ANNORLUNDA OCH UNIKT</h1>
              <p className="py-6 text-[#CDCDCD]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <button className="btn bg-[#2B0404] text-[#CDCDCD] hover:bg-[#CDCDCD] hover:text-[#2B0404] transition-all duration-300 ease-in-out hover:shadow-md hover:scale-105 hover:cursor-pointer">
                LÄS MER
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#CDCDCD] py-16 px-4 text-center">
          <h2 className="text-3xl font-bold text-[#2B0404] drop-shadow-md mb-8">
            SÄKRA DIN BILJETT TILL KOMMANDE EVENEMANG
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-20">
            <button className="bg-transparent hover:bg-[#2B0404] text-[#2B0404] font-semibold hover:text-[#CDCDCD] py-2 px-4 rounded transition-all duration-300 ease-in-out border-2 border-[#2B0404] hover:shadow-md hover:scale-105 hover:cursor-pointer">
              SE EVENEMANG
            </button>
          </div>
        </div>


        <div className="hero bg-[#2B0404] py-0 px-4">
          <div className="hero-content flex-col lg:flex-row-reverse max-w-6xl mx-auto bg-[#2B0404]">
            <img
              src="/KinoScreen.png"
              className="max-w-sm rounded-lg shadow-2xl"
              alt="Kino Entrance"
            />
            <div className="text-center lg:text-left mt-8 lg:mt-0 mx-4">
              <h1 className="text-3xl font-bold text-[#CDCDCD]">BÄTTRE LJUD OCH BILD ÄN HEMMA</h1>
              <p className="py-6 text-[#CDCDCD] ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <button className="btn bg-[#2B0404] text-[#CDCDCD] hover:bg-[#CDCDCD] hover:text-[#2B0404] transition-all duration-300 ease-in-out hover:shadow-md hover:scale-105 hover:cursor-pointer">
                BOKA BILJETT
              </button>
            </div>
          </div>
        </div>
        <div className="hero bg-[#2B0404] py-0 px-4">
          <div className="hero-content flex-col lg:flex-row max-w-6xl mx-auto bg-[#2B0404]">
            <img
              src="/KinoSeats.png"
              className="max-w-sm rounded-lg shadow-2xl"
              alt="Kino Entrance"
            />
            <div className="text-center lg:text-left mt-8 lg:mt-0 mx-4">
              <h1 className="text-3xl font-bold text-[#CDCDCD]">MAT OCH DRYCK VID DIN PLATS</h1>
              <p className="py-6 text-[#CDCDCD]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <button className="btn bg-[#2B0404] text-[#CDCDCD] hover:bg-[#CDCDCD] hover:text-[#2B0404] transition-all duration-300 ease-in-out hover:shadow-md hover:scale-105 hover:cursor-pointer">
                BOKA BILJETT
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Main;