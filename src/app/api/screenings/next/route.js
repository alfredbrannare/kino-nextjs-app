import { NextResponse } from "next/server";
import connectDB from "src/lib/mongodb";
import Screening from "src/models/model.screenings";

export const GET = async () => {
    try {
        await connectDB();

        const upcomingScreenings = await Screening.aggregate([
            {
                $match: {
                    startTime: { $gte: new Date() }
                }
            },
            {
                $sort: {
                    startTime: 1
                }
            },
            {
                $group: {
                    _id: "$movieId",
                    screening: { $first: "$$ROOT" },
                },
            },
            {
                $replaceRoot: {
                    newRoot: "$screening"
                }
            },
            {
                $sort: {
                    startTime: 1
                }
            },
            {
                $limit: 5
            },
            {
                $lookup: {
                    from: "movies",
                    localField: "movieId",
                    foreignField: "_id",
                    as: "movie",
                }
            },
            {
                $match: {
                    "movie.inCinemas": true,
                }
            },
            {
                $unwind: "$movie"
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ["$movie", "$$ROOT"]
                    }
                }
            },
            {
                $project: {
                    movie: 0
                }
            }
        ]);

        console.log(upcomingScreenings);
        return NextResponse.json(upcomingScreenings, { status: 200 });
    } catch (error) {
        console.error("Error fetching upcoming screenings", error);
        return NextResponse.json({ error: "Failed to fetch screenings" }, { status: 500 });
    }
}