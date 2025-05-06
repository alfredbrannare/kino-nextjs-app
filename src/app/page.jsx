'use client'
const { useEffect, useState } = require("react");

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const res = await fetch('/api/screenings/next');
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUpcomingMovies();
  }, []);

  return (
    <div>
      <h1>Home page!</h1>

      <div>
        {movies.map((movie) => (
          <h1 key={movie.id}>{movie.title}</h1>
        ))}
      </div>
    </div>

  )
}

export default Main;