// 'use client';
// import { useEffect, useState, use } from 'react';
import MovieDetails from '@/components/MovieDetails';
import MovieDetailsSkeleton from '@/components/movies/singel/skeleton/MovieDetailsSkeleton';
import { headers } from 'next/headers';

const Movie = async ({ params }) => {
	// const [movie, setMovie] = useState(null);
	// const [loading, setLoading] = useState(true);

	// const { id } = use(params); // Unwrap the params promise/object
	const { id } = params; // Unwrap the params promise/object

	// get host from headers to build URL
	const host = (await headers()).get('host');
	const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
	const baseUrl = `${protocol}://${host}`;

	try {
		const res = await fetch(`${baseUrl}/api/movies/${id}`, {
			cache: 'no-store',
		});

		if (!res.ok) throw new Error('Failed to fetch Movie');

		const movie = await res.json();
		return (
			<div className="post">
				<MovieDetails movie={movie} />
			</div>
		);
	} catch (error) {
		console.error('Error fetching movie:', error);
		return <p className="text-2xl text-center">Movie not found</p>;
	}

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const response = await fetch(`/api/movies/${id}`);
	// 			const data = await response.json();

	// 			setMovie(data);
	// 			console.log(movie);
	// 		} catch (error) {
	// 			console.error('Error fetching movies:', error);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};
	// 	fetchData();
	// }, [id]);

	// if (loading) return <div className="w-full h-32 skeleton"> </div>
	// if (loading)
	// 	return (
	// 		<div className="md:w-300">
	// 			<MovieDetailsSkeleton />
	// 		</div>
	// 	);
	// if (loading) return <p>Loading...</p>

	// if (!movie) return <p>Movie not found</p>;

	// return (
	// 	<div className="post">
	// 		<MovieDetails movie={movie} />
	// 	</div>
	// );
};

export default Movie;
