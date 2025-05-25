import Link from 'next/link';
import Views from './views/Views';
import ReviewForm from './reviews/ReviewForm';
import { useEffect, useState } from 'react';
import ReviewsList from './reviews/ReviewsList';
import { useParams } from 'next/navigation';
import { useAuth } from 'src/components/user/AuthData';
import RatingCard from './movies/singel/RatingCard';
import { MovieHeader } from './movies/singel/MovieHeader';

import TrailerCard from './movies/singel/TrailerCard';
import Login from './Login';

// TODO fix check for backend for rating

const MovieDetails = ({ movie }) => {
	const { isLoggedIn, userData } = useAuth();
	const [reviews, setReviews] = useState([]);
	const [screenings, setScreenings] = useState([]); //- Patrik

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const res = await fetch(`/api/reviews?movieId=${movie._id}`);
				const data = await res.json();
				if (res.ok) {
					setReviews(data.reviews);
				} else {
					console.error('Failed to fetch reviews:', data.message);
				}
			} catch (error) {
				console.error('Error fetching reviews:', error);
			}
		};
		//- Patrik
		const fetchScreenings = async () => {
			try {
				const res = await fetch(`/api/screenings?movieId=${movie._id}`);
				const data = await res.json();

				const enriched = data.map((screening) => {
					const bookedCount = screening.bookedSeats?.reduce(
						(sum, booking) => sum + (booking.seats?.length || 0),
						0
					);

					const totalSeats = screening.auditoriumId?.seats?.length || 0;
					const availableSeats = totalSeats - bookedCount;

					return {
						...screening,
						bookedCount,
						tid: new Date(screening.startTime).toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit',
						}),
						sal: screening.auditoriumId?.name || 'Okänd salong',
					};
				});

				setScreenings(enriched);
				// console.log('Screenings för filmen:', enriched);
			} catch (error) {
				console.error('Error fetching screenings', error);
			}
		};

		if (movie._id) {
			fetchReviews();
			fetchScreenings();
		}
	}, [movie._id]);

	const params = useParams();
	const movieId = params.id;

	// to get new review
	const handleAddReview = async ({ rating, text }) => {
		const response = await fetch('/api/reviews', {
			method: 'POST',

			credentials: 'include',
			body: JSON.stringify({ movieId, rating, text, user }),
		});

		if (response.ok) {
			const data = await response.json();
			console.log('Review saved:', data.review);
			// refresh reviews here
			const res = await fetch(`/api/reviews?movieId=${movie._id}`);
			const latest = await res.json();
			setReviews(latest.reviews);
		} else {
			console.error('Failed to save review');
		}
	};

	return (
		<>
			<div className="bg-[#250303] max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-5 gap-2 border border-yellow-500">
				{/* Left colum Main info and booking */}
				<div className="flex flex-col justify-center order-1 gap-6 mt-10 col-span-full md:col-span-3">
					{/* title, metaInfo description */}

					<MovieHeader
						title={movie.title}
						description={movie.description}
						ageRating={movie.ageRating ?? 10}
						duration={movie.runtime ?? '1.40'}
						genre={movie.genres ?? 'Horror'}
					/>
				</div>

				<div className="order-2 mt-10 col-span-full md:col-span-2 ">
					{/* rating */}

					<RatingCard rating={movie.rating} />
				</div>
				{/* Ticket booking section */}
				<div className="flex flex-col justify-between order-3 h-full md:col-span-3">
					{/* description */}
					<div className="pb-5 mx-4 mb-8 border border-yellow-500 rounded-lg shadow shadow-lg">
						<p className="m-4 text-xl">{movie.description}</p>
					</div>
					<div className="justify-center">
						<div className="justify-end mx-4 ">
							<TrailerCard
								trailerKey={movie.trailerKey}
								title={movie.title}
							/>
						</div>
					</div>
				</div>

				{/* <div className="flex flex-col order-3 col-span-2 col-start-1 row-start-2 gap-4 md:order-none"> */}
				<div className="flex justify-center order-4 col-span-full md:col-span-2 ">
					{/* Poster */}
					<img
						src={movie.image}
						alt={movie.title}
						className="self-start object-contain w-full max-w-md rounded-lg shadow-lg"
					/>
				</div>
				<div className="row-start-3 col-span-full md:col-span-5">
					<div className="bg-[#2B0404] shadow-lg rounded-lg p-6 shadow max-h-full m-4 ">
						<h2 className="mb-4 text-3xl font-bold text-center">
							Välj visning
						</h2>

						{/* date select */}
						<div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
							{screenings.length === 0 ? (
								<p className="text-sm text-gray-400">
									Inga visningar hittades.
								</p>
							) : (
								screenings.map((screening) => (
									<Link
										key={screening._id}
										href={{
											pathname: `/auditoriums/city`,
											query: {
												movieId: screening.movieId._id,
												screeningTime: screening.startTime,
												auditorium: 'city',
											},
										}}>
										<Views
											views={{
												tid: new Date(screening.startTime).toLocaleString(
													'sv-SE',
													{
														weekday: 'short',
														day: 'numeric',
														month: 'short',
														hour: '2-digit',
														minute: '2-digit',
													}
												),
												sal: screening.auditoriumId.name,
												maxSeats: screening.auditoriumId.capacity ?? 100,
												bookedCount: screening.bookedCount,
											}}
										/>
									</Link>
								))
							)}
						</div>
					</div>
				</div>
				<div className="bg-[#2B0404] shadow-lg rounded-lg col-span-full justify-center order-5 mx-auto md: justify-center flex flex-col items-center mt-14">
					<h2 className="mb-4 text-2xl font-bold">Reviews</h2>
					<div className="md:w-md">
						<div>
							{!isLoggedIn ? (
								<div className="flex items-center justify-center gap-2 my-4 text-xl">
									<span className="inline-block">
										<Login />
									</span>
									<span>för att lämna en review</span>
								</div>
							) : (
								<ReviewForm
									handleAddReview={handleAddReview}
									userData={userData}
								/>
							)}
						</div>
						<div className="mb-5">
							{/* ReviewsList */}

							<ReviewsList reviews={reviews} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MovieDetails;
