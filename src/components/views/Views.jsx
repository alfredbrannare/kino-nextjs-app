'use client';
export default function Views({ views }) {
	const { bookedCount, maxSeats } = views;
	const emptyPercentage = (bookedCount / maxSeats) * 100;

	let color = '';

	if (emptyPercentage >= 80) {
		color = '#FB3C3C';
	} else if (emptyPercentage >= 45) {
		color = '#FFD2D2';
	} else {
		color = '#15FB14';
	}

	return (
		<div
			className={`m-4 text-black font-medium rounded-lg shadow-sm border border-black bg-white py-3 text-xl transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer hover:border-1 hover:border-yellow-400 hover:shadow-[0_0_15px_5px_#facc15,0_0_25px_10px_#facc15,inset_0_0_10px_#facc15]`}
			style={{ backgroundColor: color }}>
			<p className="mx-10 my-1">Tid: {views.tid}</p>
			<p className="mx-10 my-1">Sal: {views.sal}</p>
		</div>
	);
}
