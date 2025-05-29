"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import MovieCreator from "@/components/MovieCreator"
import { useAuth } from "@/components/user/AuthData"
import { useRouter } from "next/navigation";
import AdminTabs from "@/components/AdminTabs"
import { AuthContextType, MovieType } from "@/ts/types"

const MoviesPage = () => {
	const [movies, setMovies] = useState<MovieType[]>([])
	const [loading, setLoading] = useState(true)
	const [update, setUpdate] = useState(false)
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
		const fetchData = async () => {
			try {
				const res = await fetch("/api/movies")
				const data = await res.json()
				setMovies(data as MovieType[])
			} catch (error) {
				console.error("Error fetching movies:", error)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
		setUpdate(false)
	}, [update])

	const deleteMovie = async (id: string) => {
		try {
			await fetch(`/api/movies/${id}`, {
				method: "DELETE",
				credentials: 'include',
			})
		} catch (error) {
			console.error("Error deleting movie movies:", error)
		} finally {
			setUpdate(true)
		}
	}

	const updateMovie = async (id:string, inCinemas:boolean) => {
		await fetch(`/api/movies/${id}`, {
			method: "PUT",
			credentials: 'include',
			body: JSON.stringify({ inCinemas }),
		})
		setUpdate(true)
	}

	if (isAuthLoading || loading) return <p>Loading page data...</p>;
	if (!isAdmin) return <p>Access Denied. You are not authorized to view this page.</p>;

	const filteredMovies = Array.isArray(movies) ? movies.filter(movie => {
		if (!inputSearch) return true;

		const movieTitle = movie.title?.toLowerCase() || '';
		return movieTitle.includes(inputSearch.toLowerCase());
	}) : [];


	return (
		<>
			<div className="p-6">
				<AdminTabs />
				<MovieCreator setUpdate={setUpdate} />

				<input
					type="text"
					className="input block mx-auto mt-10"
					placeholder="Sök"
					value={inputSearch}
					onChange={(e) => setInputSearch(e.target.value)}
				/>

				<h1 className="italic font-semibold text-3xl text-center pt-10">
					Movies:
				</h1>
				<br />
				{filteredMovies.map((movie) => (
					<div
						key={movie._id}
						className="block mx-auto p-4 mb-3 bg-base-300 flex justify-between max-w-200 ">
						<h2 className="">{movie.title}</h2>
						<div>
							<Link
								className="btn mr-1"
								href={`/admin/movies/` + movie._id}>
								Details
							</Link>
							{movie.inCinemas ? (
								<span
									className="btn btn-success mr-1"
									onClick={() => updateMovie(movie._id, false)}>
									Currently showing
								</span>
							) : (
								<span
									className="btn btn-warning mr-1"
									onClick={() => updateMovie(movie._id, true)}>
									Currently not showing
								</span>
							)}
							<button
								onClick={() => deleteMovie(movie._id)}
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

export default MoviesPage
