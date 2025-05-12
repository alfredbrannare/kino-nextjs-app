// app/api/reviews/route.js
import connectDB from 'src/lib/mongodb';
import Review from 'src/models/model.reviews';

export async function POST(request) {
	await connectDB();

	const body = await request.json();
	const { movieId, rating, text, user } = body;

	if (!movieId || !rating || !text || !user) {
		return new Response(
			JSON.stringify({ success: false, message: 'Missing fields' }),
			{ status: 400 }
		);
	}

	try {
		const review = new Review({ movieId, rating, text, userName: user });
		await review.save();

		return new Response(JSON.stringify({ success: true, review }), {
			status: 201,
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ success: false, message: error.message }),
			{ status: 500 }
		);
	}
}
// API route files need to use POST or GET exports, not the old handler(req, res)
// paginering kan göras på db så det kan vara lättare
