import Link from 'next/link';
import Views from './views/Views';
import ReviewForm from './reviews/ReviewForm';
import { useEffect, useState } from 'react';
import UserReview from './reviews/UserReview';
import ReviewsList from './reviews/ReviewsList';
import { useParams } from 'next/navigation';

import { useAuth } from 'src/components/user/AuthData';
import InfoCard from './movies/singel/InfoCard';
import RatingCard from './movies/singel/RatingCard';
import { MovieHeader } from './movies/singel/MovieHeader';
import { ImageGrid } from './movies/singel/ImageGrid';
import { VideoOff } from 'lucide-react';

// TODO fix check for backend for rating

const MovieDetails = ({ movie }) => {
	const { isLoggedIn, userData, token } = useAuth();
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
	const handleAddReview = async ({ rating, text, user }) => {
		const response = await fetch('/api/reviews', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
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
			<div className="bg-[#250303] max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
				{/* Left colum Main info and booking */}
				<div className="col-span-full md:col-span-2 flex flex-col gap-6 order-1">
					{/* title, metaInfo description */}

					<InfoCard
						ageRating={movie.ageRating ?? 10}
						duration={movie.duration ?? '1.40'}
						genre={movie.genre ?? 'Horror'}
					/>
					<MovieHeader
						title={movie.title}
						description={movie.description}
					/>
				</div>

				<div className="col-span-full md:col-span-1 order-2 mt-10">
					{/* trailer */}
					<div className="relative rounded-lg overflow-hidden shadow-lg aspect-video">
						{movie.trailerKey ? (
							<iframe
								key={movie.trailerKey}
								className="w-full h-full"
								src={`https://www.youtube.com/embed/${movie.trailerKey}?controls=0&rel=0&modestbranding=1&showinfo=0`}
								title={movie.title}
								allowFullScreen
							/>
						) : (
							// if no trailer is available
							<div className="flex items-center justify-center w-full h-full bg-gray-800">
								<VideoOff className="w-12 h-12 text-gray-400" />
								<span className="ml-2 text-gray-400 text-lg">
									Ingen trailer
								</span>
							</div>
						)}
					</div>
				</div>
				{/* Ticket booking section */}
				<div className="hero-content md:col-span-1 order-3">
					<div className="bg-[#2B0404] shadow-lg rounded-lg p-6 shadow">
						<RatingCard rating={movie.rating} />
						<h2 className="text-xl font-bold mb-4">
							Filmen går följande tider
						</h2>
						{/* date select */}
						<div className="gap-2 mb-4">
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

				{/* <div className="flex flex-col gap-4 col-start-1 row-start-2 col-span-2 order-3 md:order-none"> */}
				<div className="col-span-full md:col-span-2 order-4 flex justify-center md:justify-end">
					{/* Poster */}
					<img
						src={movie.image}
						alt={movie.title}
						className="rounded-lg shadow-lg max-w-md w-full"
					/>
				</div>
				<div className="bg-[#2B0404] shadow-lg rounded-lg col-span-full justify-center order-5 mx-auto md: justify-center flex flex-col items-center">
					<h2 className="text-2xl font-bold mb-4">Reviews</h2>
					<div className="md:w-md">
						<div>
							{!isLoggedIn ? (
								<p className="justify-self-center my-4">
									Logga in för att lämna en review
								</p>
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
