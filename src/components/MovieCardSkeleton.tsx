import React, { FC } from 'react';

type Props = {
  className?: string;
};

const MovieCardSkeleton: FC<Props> = ({ className }) => {
    return (
        <div className={`animate-pulse bg-gray-700 rounded-lg shadow-lg m-2 w-48 ${className || ''}`}></div>
    )
}

export default MovieCardSkeleton;