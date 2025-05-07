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

      <div className="flex flex-row flex-wrap">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-32 w-32 mb-4 flex align-center justify-center">
            </div>
          ))
        ) : (
          movies.map((movie) => (
            <div key={movie.id}>
              <h1>{movie.title}</h1>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Main;