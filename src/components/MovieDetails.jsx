import Link from "next/link";

const MovieDetails = ({ movie }) => {
  return (
    <div className="text-center pt-10">
    <h1 className="font-semibold text-3xl">{movie.title}</h1>
    <span>{movie.description}</span><br />
    <img className="block mx-auto pt-10" src={movie.image} alt={movie.title} /><br />
    <Link className="btn" href={'/movies'}>Back</Link>
    </div>
  )
}

export default MovieDetails;