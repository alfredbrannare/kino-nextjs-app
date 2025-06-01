import { MovieType } from '@/ts/types';

export const searchMovies = (
  movies: MovieType[],
  searchInput: string,
): MovieType[] => {
  if (!searchInput) {
    return movies;
  }

  const lowerCaseSearchInput = searchInput.toLowerCase();

  const searchedMovies = movies.filter((movie) => {
    const lowerCaseTitle = movie.title.toLowerCase();
    const lowerCaseDesc = movie.description
      ? movie.description.toLowerCase()
      : '';
    const lowerCaseMovie = lowerCaseTitle + lowerCaseDesc;
    return lowerCaseMovie.includes(lowerCaseSearchInput);
  });

  return searchedMovies;
};
