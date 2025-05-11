export const searchMovies = (movies, searchInput) => {
    const sortedMovies = [...movies];

    if (!searchInput) {
        return movies;
    }

    const lowerCaseSearchInput = searchInput.toLowerCase();

    const searchedMovies = movies.filter((movie) => {
        const lowerCaseTitle = movie.title ? movie.title.toLowerCase() : '';
        const lowerCaseDesc = movie.description ? movie.description.toLowerCase() : '';
        const lowerCaseMovie = lowerCaseTitle + lowerCaseDesc;
        return lowerCaseMovie.includes(lowerCaseSearchInput);
    });

    return searchedMovies;
}