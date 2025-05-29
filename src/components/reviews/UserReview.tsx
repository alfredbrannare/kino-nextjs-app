import { ReviewsType } from "@/ts/types";
import Image from "next/image";
import { FC } from "react";

type UserReviewProps = {
	review: ReviewsType;
}

const UserReview:FC<UserReviewProps> = ({ review }) => {
	return (
		<div className="max-w-sm mb-2 p-4 border border-yellow-500 rounded-lg shadow bg-[#1a1a1a]">
			<div className="flex items-center gap-4 mb-2">
				<Image
					src={review.profileImage || '/kino-logo.png'}
					alt={review.userName}
					className="object-cover w-12 h-12 border border-yellow-500 rounded-full"
					height={100}
					width={100}
				/>
				<div>
					<p className="text-xl font-semibold">{review.userName}</p>
					<p className="font-medium text-yellow-500">{review.rating}/5</p>
				</div>
			</div>
			<p className="text-xl break-words">{review.text}</p>
		</div>
	);
}

export default UserReview;