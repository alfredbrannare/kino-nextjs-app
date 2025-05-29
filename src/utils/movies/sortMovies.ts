import { MovieType } from "@/ts/types";
export type SortOption = 'top_rated' | 'year_desc' | 'year_asc';

export const sortMovies = (movies: MovieType[], sortOptions: SortOption): MovieType[] => {
    const sortedMovies = [...movies];

    if (sortOptions === 'top_rated') {
        sortedMovies.sort((a, b) => {
            const ratingA = parseFloat(a.rating || '0') || 0;
            const ratingB = parseFloat(b.rating || '0') || 0;
            return ratingB - ratingA;
        });
    } else if (sortOptions === 'year_desc') {
        sortedMovies.sort((a, b) => {
            const yearA = new Date(a.year || '0').getFullYear() || 0;
            const yearB = new Date(b.year || '0').getFullYear() || 0;
            return yearB - yearA;
        });
    } else if (sortOptions === 'year_asc') {
        sortedMovies.sort((a, b) => {
            const yearA = new Date(a.year || '0').getFullYear() || 0;
            const yearB = new Date(b.year || '0').getFullYear() || 0;
            return yearA - yearB;
        });
    }
    return sortedMovies;
}