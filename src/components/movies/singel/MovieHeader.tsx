import { FC } from "react";

type Props = {
  title: string;
  ageRating: number;
  description?: string;
  duration: string;
  genre: string;
};
const MovieHeader: FC<Props> = ({
  title,
  description,
  ageRating,
  duration,
  genre,
}) => {
  // convert string to number
  const totalMinutes = parseInt(duration, 10);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const formattedDuration = `${hours}h ${minutes}min`;

  return (
    <div className="bg-[#2B0404] shadow-lg rounded-lg mb-6 mx-4">
      <h1 className="mb-2 ml-4 text-4xl font-bold md:text-6xl">{title}</h1>
      <div className="p-4 text-lg text-gray-200 md:text-xl">
        <div className="flex gap-4 mx-4">
          <span className="badge badge-accent">{ageRating}+</span>
          <span>{formattedDuration}</span>
          <span className="font-semibold">{genre}</span>
        </div>
        {description && (
          <p className="mt-4 text-base text-gray-300 md:text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieHeader;
