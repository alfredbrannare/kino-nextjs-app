import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Movie from "@/models/model.movies";

export const GET = async () => {
    try {
        await connectDB();

        const upcomingMovies = await Movie.aggregate([
            {
                $match: {
                    $expr: {
                        $gte: [
                            { $dateFromString: { dateString: "$year" } },
                            new Date()
                        ]
                    }
                }
            },
            {
                $sort: {
                    year: 1
                }
            },
            {
                $limit: 5
            }
        ]);

        return NextResponse.json(upcomingMovies, { status: 200 });
    } catch (error) {
        console.error("Error fetching upcoming screenings", error);
        return NextResponse.json({ error: "Failed to fetch screenings" }, { status: 500 });
    }
}