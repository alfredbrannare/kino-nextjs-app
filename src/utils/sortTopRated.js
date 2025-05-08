export const sortTopRated = (movies) => {
    const sortedMovies = [...movies].sort((a, b) => b.rating - a.rating);
    console.log(sortedMovies);
    return sortedMovies;
};