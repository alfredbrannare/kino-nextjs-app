import Link from "next/link"

const mockView = { tid: "2025-02-26 17:00", sal: "Stora Salongen" }

const MovieDetails = ({ movie }) => {
	return (
		<>
			<div className="grid grid-cols-6 gap-4">
				<div className="col-start-2 col-span-3 text-center pt-10 border border-solid-red-500">
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
				<div className="col-span-2 bg-blue-500 border">
					<div className="bg-pink-500 flex-col justify-center  ">
						<h3 className="flex justify-center mb-4 mt-4">
							Filmen går följande tider
						</h3>
						{/* showings ska vara här, det här kan vara en komponent */}
						<div className="ml-4 mb-4 ">
							<p>Tid: {mockView.tid}</p>
							<p>Sal: {mockView.sal}</p>
						</div>
						<div className="ml-4 mb-4">
							<p>Tid: {mockView.tid}</p>
							<p>Sal: {mockView.sal}</p>
						</div>
						<div className="ml-4 mb-4">
							<p>Tid: {mockView.tid}</p>
							<p>Sal: {mockView.sal}</p>
						</div>
					</div>
					<div className=" border flex justify-center w-full">
						<button className="btn">Boka biljett</button>
					</div>
					<div className="col-span-3 grid grid-cols-subgrid border mt-10 bg-red-500">
						{/* reviews ska vara här */}
						next
					</div>
				</div>
			</div>
		</>
	)
}

export default MovieDetails
