// app/api/reviews/route.js
import connectDB from '@/lib/mongodb';
import Review from '@/models/model.reviews';
import { checkAuth } from '@/lib/auth';

export async function POST(request) {
	await connectDB();
	const authenticatedUser = await checkAuth(request);

	const body = await request.json();
	const { movieId, rating, text } = body;

	if (!authenticatedUser)
		return new Response(
			JSON.stringify({ success: false, message: 'Missing Login' }),
			{ status: 401 }
		);

	if (!movieId || !rating || !text) {
		return new Response(
			JSON.stringify({ success: false, message: 'Missing fields' }),
			{ status: 400 }
		);
	}

	try {
		const review = new Review({
			movieId,
			rating,
			text,
			userName: authenticatedUser.name,
			profileImage: authenticatedUser.profilePicture,
		});
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
export async function GET(request) {
	await connectDB();
	const { searchParams } = new URL(request.url);
	const movieId = searchParams.get('movieId');

	if (!movieId) {
		return new Response(
			JSON.stringify({ success: false, message: 'Missing movieId' }),
			{ status: 400 }
		);
	}

	try {
		const reviews = await Review.find({ movieId });
		return new Response(JSON.stringify({ success: true, reviews }), {
			status: 200,
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ success: false, message: error.message }),
			{ status: 500 }
		);
	}
}

export const DELETE = async (req) => {
	await connectDB();
	const authenticatedUser = await checkAuth(req);
	if (!authenticatedUser) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}

  const isAdmin = authenticatedUser.role.includes('admin');

	if (!isAdmin) {
		return NextResponse.json(
			{ message: 'You dont have the right to use this feature!' },
			{ status: 403 }
		);
	}

	const { searchParams } = new URL(req.url);
	const movieId = searchParams.get('movieId');
	const deleteR = searchParams.get('delete');

	if (!movieId || !deleteR) {
		return new Response(
			JSON.stringify({
				success: false,
				message: 'Missing movieId or deleteId',
			}),
			{ status: 400 }
		);
	}

	try {
		await Review.findByIdAndDelete(deleteR);
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response(
			JSON.stringify({ success: false, message: 'Error deleting review' }),
			{ status: 500 }
		);
	}
};
// API route files need to use POST or GET exports, not the old handler(req, res)
// paginering kan göras på db så det kan vara lättare
