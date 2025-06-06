'use client';

import { FC } from 'react';

type ViewDetails = {
  bookedCount: number;
  maxSeats: number;
  tid: string;
  sal: string;
};

type Props = {
  views: ViewDetails;
  size?: 'default' | 'small';
};
const Views: FC<Props> = ({ views, size = 'default' }) => {
  const { bookedCount, maxSeats } = views;
  const emptyPercentage = (bookedCount / maxSeats) * 100;

  let color = '';

  if (emptyPercentage >= 80) {
    color = '#FB3C3C';
  } else if (emptyPercentage >= 45) {
    color = '#FFD2D2';
  } else {
    color = '#056905';
  }

  const sizeClasses =
    size === 'small'
      ? 'py-0 px-1 text-sm font-semibold w-40 md:mx-2 mx-1'
      : 'py-3 px-6 text-lg md:mx-6 mx-3';

  return (
    <div
      className={`m-4 text-black font-medium rounded-lg shadow-sm border border-black py-3 text-xl transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer hover:border-1 hover:border-yellow-400 hover:shadow-[0_0_15px_5px_#facc15,0_0_25px_10px_#facc15,inset_0_0_10px_#facc15] ${sizeClasses}`}
      style={{ backgroundColor: color }}
    >
      <p className={`${sizeClasses}`}>Tid: {views.tid}</p>
      <p className={`${sizeClasses}`}>Sal: {views.sal}</p>
    </div>
  );
};

export default Views;
