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
			<div className="lg:grid grid-cols-8 gap-4 relative">
				{/* title och description */}
				<InfoCard
					title={movie.title}
					description={movie.description}
				/>
				<div className="col-start-3 col-span-4  text-center pt-10 border">
					{/* movie image */}
					{/* <h1 className="font-semibold text-3xl">{movie.title}</h1>
					<span>{movie.description}</span>
					<br />
					<div className="relative mx-auto pt-10">
						<img
							className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded relative z-10"
							src={movie.image}
							alt={movie.title}
						/>
						<img
							className="absolute top-10 left-0 right-0 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg blur-lg rounded z-0"
							src={movie.image}
							alt={movie.title}
						/>
					</div> */}
				</div>

				<div className="col-start-7 content-center justify-items-center  col-span-2 ml-5 ">
					<RatingCard rating={movie.rating} />
					<div className="flex-col justify-center">
						{/* this is for screenings */}
						<h2 className="card-title text-2xl flex justify-center mb-4 mt-4">
							Filmen går följande tider
						</h2>

						{screenings.length === 0 ? (
							<p className="text-sm text-gray-400">Inga visningar hittades.</p>
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
					{/* button to go to "biljett page" */}
					<div className="flex justify-center w-full">
						<Link href={{ pathname: `/tickets` }}>
							<button className="btn">Se alla visningar</button>
						</Link>
					</div>
				</div>
				<div className="col-start-3 col-span-4 flex flex-col mt-5">
					{/* reviews ska vara här */}
					<h2 className="text-2xl  card-title self-center ">Reviews</h2>
					<div>
						{/* TODO: hide if not login */}
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
		</>
	);
};

export default MovieDetails;
