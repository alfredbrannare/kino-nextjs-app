"use client"
import { useEffect, useState } from "react"
import { useAuth } from "../../../components/user/AuthData"
import { useRouter } from "next/navigation";
import AdminTabs from "../../../components/AdminTabs";
import { AuthContextType, MovieType, ReviewsType } from "@/ts/types";

const ReviewsPage = () => {
	const [reviews, setReviews] = useState<ReviewsType[]>([]);
	const [loading, setLoading] = useState(true);
	const [update, setUpdate] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState("");
	const [movies, setMovies] = useState<MovieType[]>([]);
	const [inputSearch, setInputSearch] = useState('');
	const { isLoggedIn, isAdmin, isLoading: isAuthLoading} = useAuth() as AuthContextType;
	const router = useRouter();

	useEffect(() => {
		if (!isAuthLoading) {
			if (!isAdmin) {
				router.push("/");
			}
		}
	}, [isLoggedIn, isAdmin, isAuthLoading, router]);

	useEffect(() => {
		const fetchMovies = async () => {
			const res = await fetch("/api/movies");
			const data = await res.json();
			setMovies(data);
			if (!selectedMovie) {
				setReviews([]);
				setLoading(false);
				return;
			}
		};

		fetchMovies();
	}, [selectedMovie]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`/api/reviews?movieId=${selectedMovie}`)
				const data = await res.json()
				setReviews(Array.isArray(data.reviews) ? data.reviews : []);
			} catch (error) {
				console.error("Error fetching movies:", error)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
		setUpdate(false)
	}, [selectedMovie, update])

	const deleteReview = async (id: string) => {
		try {
			await fetch(`/api/reviews?movieId=${selectedMovie}&delete=${id}`, {
				method: "DELETE",
				credentials: 'include',
			})
		} catch (error) {
			console.error("Error deleting movie movies:", error)
		} finally {
			setUpdate(true)
		}
	}

	if (isAuthLoading || loading) return <p>Loading page data...</p>;
	if (!isAdmin) return <p>Access Denied. You are not authorized to view this page.</p>;

	const filteredReviews = reviews.filter(review => {
		if (!inputSearch) return true;
		const comment = review.text?.toLowerCase() || '';
		return comment.includes(inputSearch.toLowerCase());
	});

	return (
		<>
			<div className="p-6">
				<AdminTabs />
				<select
					className="select select-bordered input block mx-auto mt-10"
					value={selectedMovie}
					onChange={(e) => setSelectedMovie(e.target.value)}
				>
					<option value="">
						-- Välj film --
					</option>
					{movies.map((movie) => (
						<option key={movie._id} value={movie._id}>
							{movie.title}
						</option>
					))}
				</select>
				<br />

				<input
					type="text"
					className="input block mx-auto mt-10"
					placeholder="Sök"
					value={inputSearch}
					onChange={(e) => setInputSearch(e.target.value)}
				/>

				<h1 className="italic font-semibold text-3xl text-center pt-10">
					Reviews:
				</h1>
				<br />
				{filteredReviews.map((review) => (
					<div
						key={review._id}
						className="block mx-auto p-4 mb-3 bg-base-300 flex justify-between max-w-2xl">
						<h2>{review.text}</h2>
						<span>{review.userName}</span>
						<div>
							<button
								onClick={() => deleteReview(review._id)}
								className="btn btn-error">
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</>

	)
}

export default ReviewsPage;
