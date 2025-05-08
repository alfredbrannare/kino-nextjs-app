import connectDB from 'src/lib/mongodb';
import Review from 'src/models/model.reviews';

export default async function handler(req, res) {
	await dbConnect();

	if (req.method === 'POST') {
		const { movieId, rating, text, user } = req.body;

		if (!movieId || !rating || !text || !user) {
			return res
				.status(400)
				.json({ success: false, message: 'Missing fields' });
		}

		try {
			const review = new Review({ movieId, rating, text, userName: user });
			await review.save();
			return res.status(201).json({ success: true, review });
		} catch (erro) {
			return res.status(500).json({ success: false, message: error.message });
		}
	} else {
		res.setHeader('allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}

// paginering kan göras på db så det kan vara lättare
