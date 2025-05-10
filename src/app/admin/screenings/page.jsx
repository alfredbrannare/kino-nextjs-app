"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import ScreeningCreator from "src/components/ScreeningCreator"
import { useAuth } from "src/components/user/AuthData"
import { useRouter } from "next/navigation";
import input from "daisyui/components/input"

const ScreeningsPage = () => {
	const [screenings, setScreenings] = useState([])
	const [loading, setLoading] = useState(true)
	const [update, setUpdate] = useState(false)
	const [inputSearch, setInputSearch] = useState('');
	const { isLoggedIn, isAdmin, isLoading: isAuthLoading, token } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isAuthLoading) {
			if (!isAdmin) {
				router.push("/");
			}
		}
	}, [isLoggedIn, isAdmin, isAuthLoading, router]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch("/api/screenings")
				const data = await res.json()
				setScreenings(data)
			} catch (error) {
				console.error("Error fetching movies:", error)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
		setUpdate(false)
	}, [update])

	const deleteMovie = async (id) => {
		try {
			await fetch(`/api/screenings/${id}`, {
				method: "DELETE",
				headers: { 'Authorization': `Bearer ${token}` },
			})
		} catch (error) {
			console.error("Error deleting movie movies:", error)
		} finally {
			setUpdate(true)
		}
	}
	// const updateMovie = async (id, inCinemas) => {
	// 	await fetch(`/api/movies/${id}`, {
	// 		method: "PUT",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			'Authorization': `Bearer ${token}`,

	// 		},
	// 		body: JSON.stringify({ inCinemas }),
	// 	})
	// 	setUpdate(true)
	// }

	if (isAuthLoading || loading) return <p>Loading page data...</p>;
	if (!isAdmin) return <p>Access Denied. You are not authorized to view this page.</p>;

	const filteredScreenings =  screenings.filter(screening => {

		if(!inputSearch) return true;
		
		const movieTitle = screening.movieId?.title?.toLowerCase() || '';
		return movieTitle.includes(inputSearch.toLowerCase());
	});

	return (
		<>
			<ScreeningCreator setUpdate={setUpdate} />

			<input
				type="text"
				className="input block mx-auto mt-10"
				placeholder="Sök"
				value={inputSearch}
				onChange={(e) => setInputSearch(e.target.value)}
			/>

			<h1 className="italic font-semibold text-3xl text-center pt-10">
				Visningar:
			</h1>
			<br />
			{filteredScreenings.sort((a, b) => a.movieId.title.localeCompare(b.movieId.title)).map((screening) => (
				<div
					key={screening._id}
					className="block mx-auto p-4 mb-3 bg-base-300 flex justify-between gap-5 max-w-200 ">
					<h2 className="">{screening.movieId ? screening.movieId.title : "No movie title available"}</h2>
					<h2 className="">{screening.auditoriumId.name}</h2>
					<h2 className="">{new Date(screening.startTime).toLocaleString('sv-SE', {
						dateStyle: 'medium',
						timeStyle: 'short',
					})}</h2>

					<div>
						<Link
							className="btn mr-1"
							href={`/admin/screenings/` + screening._id}>
							Details
						</Link>
						<button
							onClick={() => deleteMovie(screening._id)}
							className="btn btn-error">
							Delete
						</button>
					</div>
				</div>
			))}
		</>
	)
}

export default ScreeningsPage