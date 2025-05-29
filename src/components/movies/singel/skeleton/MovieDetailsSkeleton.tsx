import {
	MovieHeaderSkeleton,
	RatingCardSkeleton,
	TrailerCardSkeleton,
	ReviewsSkeleton,
	ViewsSkeleton,
} from './skeleton';

const MovieDetailsSkeleton = () => (
	<div
		className="
  bg-[#250303]
  w-full
  max-w-none
  mx-auto
  p-6
  md:p-16
  lg:p-24
  grid
  grid-cols-1
  md:grid-cols-5
  gap-4
  md:gap-12
  border border-yellow-500
">
		<div className="flex flex-col justify-center order-1 gap-8 mt-10 col-span-full md:col-span-3">
			<MovieHeaderSkeleton />
		</div>
		<div className="order-2 mt-10 col-span-full md:col-span-2">
			<RatingCardSkeleton />
		</div>
		<div className="flex flex-col justify-between order-3 h-full md:col-span-3">
			<div className="pb-5 mx-4 mb-8 border border-yellow-500 rounded-lg shadow shadow-lg">
				<div className="w-3/4 h-12 m-4 text-xl bg-gray-800 rounded md:h-16 animate-pulse" />
				<div className="w-1/2 h-10 m-4 text-xl bg-gray-800 rounded md:h-12 animate-pulse" />
			</div>
			<div className="justify-center">
				<div className="justify-end mx-4">
					<TrailerCardSkeleton />
				</div>
			</div>
		</div>
		<div className="flex justify-center order-4 col-span-full md:col-span-2">
			<div className="w-full max-w-2xl bg-gray-800 rounded-lg h-[32rem] md:h-[40rem] animate-pulse" />
		</div>
		<div className="row-start-3 col-span-full md:col-span-5">
			<div className="bg-[#2B0404] shadow-lg rounded-lg p-8 md:p-16 shadow max-h-full m-4 ">
				<div className="w-1/3 mb-4 text-3xl font-bold text-center bg-gray-800 rounded h-14 md:h-16 animate-pulse" />
				<div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
					{[...Array(4)].map((_, i) => (
						<ViewsSkeleton key={i} />
					))}
				</div>
			</div>
		</div>
		<div className="bg-[#2B0404] shadow-lg rounded-lg col-span-full justify-center order-5 mx-auto md:justify-center flex flex-col items-center mt-14">
			<div className="w-1/4 h-10 mb-4 text-2xl font-bold bg-gray-800 rounded md:h-12 animate-pulse" />
			<div className="md:w-md">
				<div className="w-1/2 h-8 my-4 text-xl bg-gray-800 rounded md:h-10 animate-pulse" />
				<ReviewsSkeleton count={3} />
			</div>
		</div>
	</div>
);

export default MovieDetailsSkeleton;
