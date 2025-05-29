"use client";
import { FC, useState } from "react";
import { VideoOff } from "lucide-react";

type TrailerMovie = {
  _id: string;
  trailerKey: string;
  title: string;
};
type Props = {
  trailerMovies: TrailerMovie[];
};

const TrailerCarousel: FC<Props> = ({ trailerMovies }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % trailerMovies.length);

  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + trailerMovies.length) % trailerMovies.length
    );

  if (!trailerMovies || trailerMovies.length === 0) return null;

  return (
    <div className="relative mx-auto w-full">
      <div className="w-full h-[400px] flex items-center justify-center bg-black relative">
        {trailerMovies.length > 0 ? (
          <iframe
            key={trailerMovies[currentSlide]._id}
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailerMovies[currentSlide].trailerKey}?controls=0&rel=0&modestbranding=1&showinfo=0`}
            title={trailerMovies[currentSlide].title}
            allowFullScreen
          />
        ) : (
          <div className="w-full h-[400px] flex items-center justify-center bg-black relative text-yellow-400">
            <div className="flex flex-col items-center gap-2">
              <VideoOff size={48} />
              <p className="text-lg font-semibold">Trailer kunde inte laddas</p>
            </div>
          </div>
        )}
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-10 pointer-events-none">
          <button
            onClick={prevSlide}
            className="btn btn-circle pointer-events-auto"
            aria-label="Previous slide"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="btn btn-circle pointer-events-auto"
            aria-label="Next Slide"
          >
            ❯
          </button>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {trailerMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full hover:cursor-pointer 
              ${
                index === currentSlide
                  ? "p-3 bg-yellow-400"
                  : "p-3 bg-[#CDCDCD]"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TrailerCarousel;
