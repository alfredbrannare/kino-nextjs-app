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
			className={`m-4 text-black font-medium border rounded-lg shadow-sm border-solid-black transform hover:-translate-y-1 transition-transform duration-300 bg-white`}
			style={{ backgroundColor: color }}>
			<p className="ml-2 my-1">Tid: {views.tid}</p>
			<p className="ml-2 my-1">Sal: {views.sal}</p>
		</div>
	);
}
