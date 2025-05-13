import Link from 'next/link';
import Views from './views/Views';
import ReviewForm from './reviews/ReviewForm';
import { useEffect, useState } from 'react';
import UserReview from './reviews/UserReview';
import ReviewsList from './reviews/ReviewsList';
import { useParams } from 'next/navigation';

import { useAuth } from 'src/components/user/AuthData';

// TODO fix check for backend for rating and text reviws
// TODO remove mockView and send Viewdata from db in to <Views />
const mockView = {
	view1: {
		tid: '2025-02-26 17:00',
		sal: 'Stora Salongen',
		maxSeats: 100,
		emptySeats: 16,
	},
	view2: {
		tid: '2025-03-26 13:00',
		sal: 'Lilla Salongen',
		maxSeats: 100,
		emptySeats: 52,
	},
	view3: {
		tid: '2025-03-26 13:00',
		sal: 'Lilla Salongen',
		maxSeats: 100,
		emptySeats: 95,
	},
};

const MovieDetails = ({ movie }) => {
	const { isLoggedIn, userData, token } = useAuth();
	const [reviews, setReviews] = useState([]);

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
		fetchReviews();
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
		// setReviews((prevReviews) => [...prevReviews, newReview]);
		// console.log(reviews);
	};

	return (
		<>
			<div className="lg:grid grid-cols-8 gap-4">
				<div className="col-start-3 col-span-4  text-center pt-10">
					<h1 className="font-semibold text-3xl">{movie.title}</h1>
					<span>{movie.description}</span>
					<br />
					<img
						className="block mx-auto pt-10"
						src={movie.image}
						alt={movie.title}
					/>
					<br />
					<Link
						className="btn"
						href={'/movies/new'}>
						Back
					</Link>
				</div>
				<div className="col-start-7 content-center justify-items-center  col-span-2 ml-5 ">
					<div className="flex-col justify-center">
						<h2 className="card-title text-2xl flex justify-center mb-4 mt-4">
							Filmen går följande tider
						</h2>

						{/* showings ska vara här, det här kan vara en komponent */}
						{Object.entries(mockView).map(([key, view]) => (
							<Views
								key={key}
								views={view}
							/>
						))}
						{/*  */}
					</div>
					{/* button to get tickets */}
					<div className="flex justify-center w-full">
						<button className="btn">Boka biljett</button>
					</div>

					{/*  */}
					{/* <div className="col-span-3 grid grid-cols-subgrid mt-10 bg-[#2b0404]"></div> */}
				</div>
				<div className="col-start-3 col-span-4 flex flex-col  justify-center">
					{/* reviews ska vara här */}
					<h2 className="text-2xl  card-title ">Reviews</h2>
					<div>
						{/* TODO: hide if not login */}
						{!isLoggedIn ? (
							<p>Logga in för att lämna en review</p>
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
