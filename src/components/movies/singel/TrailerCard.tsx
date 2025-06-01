import { VideoOff } from 'lucide-react';
import React, { FC } from 'react';

type Props = {
  trailerKey?: string | null;
  title: string;
};

const TrailerCard: FC<Props> = ({ trailerKey, title }) => {
  return (
    <div className='relative overflow-hidden rounded-lg shadow-lg aspect-video'>
      {trailerKey ? (
        <iframe
          key={trailerKey}
          className='w-full h-full'
          src={`https://www.youtube.com/embed/${trailerKey}?controls=0&rel=0&modestbranding=1&showinfo=0`}
          title={title}
          allowFullScreen
        />
      ) : (
        // if no trailer is available
        <div className='flex items-center justify-center w-full h-full bg-gray-800'>
          <VideoOff className='w-12 h-12 text-gray-400' />
          <span className='ml-2 text-lg text-gray-400'>Ingen trailer</span>
        </div>
      )}
    </div>
  );
};

export default React.memo(TrailerCard);
