export const fetchMovies = async () => {
  const res = await fetch('/api/movies');
  const data = await res.json();
  return data;
};
