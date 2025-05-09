"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import MovieCreator from "src/components/MovieCreator"
import { useAuth } from "src/components/user/AuthData"
import { useRouter } from "next/navigation";

const MoviesPage = () => {
	const [movies, setMovies] = useState([])
	const [loading, setLoading] = useState(true)
	const [update, setUpdate] = useState(false)
	const { isLoggedIn, isAdmin, isLoading: isAuthLoading } = useAuth();
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
				setMovies(data)
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
		const token = localStorage.getItem('token');
		try {
			await fetch(`/api/movies/${id}`, {
				method: "DELETE",
				headers: { 'Authorization': `Bearer ${token}` },
			})
		} catch (error) {
			console.error("Error deleting movie movies:", error)
		} finally {
			setUpdate(true)
		}
	}

	const updateMovie = async (id, inCinemas) => {
		const token = localStorage.getItem('token');
		await fetch(`/api/movies/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${token}`,
				
			},
			body: JSON.stringify({ inCinemas }),
		})
		setUpdate(true)
	}

	if (isAuthLoading || loading) return <p>Loading page data...</p>;
  if (!isAdmin) return <p>Access Denied. You are not authorized to view this page.</p>;

	return (
		<>
			<MovieCreator setUpdate={setUpdate} />
			<h1 className="italic font-semibold text-3xl text-center pt-10">
				Movies:
			</h1>
			<br />
			{movies.map((movie) => (
				<div
					key={movie._id}
					className="block mx-auto p-4 mb-3 bg-base-300 flex justify-between max-w-200 ">
					<h2 className="">{movie.title}</h2>
					<div>
						<Link
							className="btn mr-1"
							href={`/movies/` + movie._id}>
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
		</>
	)
}

export default MoviesPage
