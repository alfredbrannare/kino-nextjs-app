export const sortMovies = (movies, sortOptions) => {
    const sortedMovies = [...movies];

    if (sortOptions === 'top_rated') {
        sortedMovies.sort((a, b) => b.rating - a.rating);
    } else if (sortOptions === 'year_desc') {
        sortedMovies.sort((a, b) => new Date(b.year).getFullYear() - new Date(a.year).getFullYear());
    } else if (sortOptions === 'year_asc') {
        sortedMovies.sort((a, b) => new Date(a.year).getFullYear() - new Date(b.year).getFullYear());
    }

    return sortedMovies;
}