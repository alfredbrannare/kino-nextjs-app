import Link from "next/link"
import Views from "./views/Views"
import ReviewForm from "./reviews/ReviewForm"
import { useState } from "react"
import UserReview from "./reviews/UserReview"
import ReviewsList from "./reviews/ReviewsList"

// TODO remove mockView and send Viewdata from db in to <Views />
const mockView = {
	view1: {
		tid: "2025-02-26 17:00",
		sal: "Stora Salongen",
		maxSeats: 100,
		emptySeats: 16,
	},
	view2: {
		tid: "2025-03-26 13:00",
		sal: "Lilla Salongen",
		maxSeats: 100,
		emptySeats: 52,
	},
	view3: {
		tid: "2025-03-26 13:00",
		sal: "Lilla Salongen",
		maxSeats: 100,
		emptySeats: 95,
	},
}
// TODO replace with reviews from db
const mockReviews = {
	review1: {
		rating: 5,
		text: "Super good movie",
		user: "Gurra G",
	},
	review2: {
		rating: 3,
		text: "just a movie",
		user: "Gurra GG",
	},
	review3: {
		rating: 1,
		text: "Super bad movie",
		user: "Gurra GGG",
	},
}
//

const MovieDetails = ({ movie }) => {
	const [reviews, setReviews] = useState(Object.values(mockReviews))

	// to get new review
	const handleAddReview = (newReview) => {
		setReviews((prevReviews) => [...prevReviews, newReview])
		console.log(reviews)
	}

	return (
		<>
			<div className="lg:grid grid-cols-6 gap-4">
				<div className="col-start-1 col-span-3 text-center pt-10">
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
						href={"/movies/new"}>
						Back
					</Link>
				</div>
				<div className="col-start-5 col-span-2 ml-5 ">
					<div className="flex-col  justify-center">
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
					<div className="col-span-3 grid grid-cols-subgrid mt-10 bg-[#2b0404]">
						<div className="flex justify-center">
							{/* reviews ska vara här */}
							<h2 className="text-2xl  card-title ">Reviews</h2>
						</div>
						<div>
							<ReviewForm handleAddReview={handleAddReview} />
						</div>
						<div className="mb-5">
							{/* ReviewsList */}
							<ReviewsList reviews={reviews} />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default MovieDetails
