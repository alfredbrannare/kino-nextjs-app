import Link from "next/link";

const MovieDetails = ({ movie }) => {
  return (
    <>
    <h1>{movie.title}</h1>
    <span>{movie.description}</span><br />
    <img src={movie.image} alt={movie.title} /><br />
    <Link href={'/movies'}>Back</Link>
    </>
  )
}

export default MovieDetails;