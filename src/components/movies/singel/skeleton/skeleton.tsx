export function MovieHeaderSkeleton() {
  return (
    <div className='space-y-4 animate-pulse'>
      <div className='h-10 bg-[#3a0a0a] rounded w-3/4'></div>
      <div className='flex space-x-4'>
        <div className='h-6 bg-[#3a0a0a] rounded w-16'></div>
        <div className='h-6 bg-[#3a0a0a] rounded w-16'></div>
        <div className='h-6 bg-[#3a0a0a] rounded w-16'></div>
      </div>
      <div className='space-y-2'>
        <div className='h-4 bg-[#3a0a0a] rounded w-full'></div>
        <div className='h-4 bg-[#3a0a0a] rounded w-5/6'></div>
        <div className='h-4 bg-[#3a0a0a] rounded w-2/3'></div>
      </div>
    </div>
  );
}

export function RatingCardSkeleton() {
  return (
    <div className='p-6 bg-[#2B0404] rounded-lg shadow-lg border border-yellow-500 animate-pulse'>
      <div className='flex flex-col items-center space-y-4'>
        <div className='h-10 w-10 bg-[#3a0a0a] rounded-full'></div>
        <div className='h-6 bg-[#3a0a0a] rounded w-24'></div>
        <div className='h-4 bg-[#3a0a0a] rounded w-16'></div>
      </div>
    </div>
  );
}
export function TrailerCardSkeleton() {
  return (
    <div className='w-full aspect-video bg-[#3a0a0a] rounded-lg shadow-lg animate-pulse flex items-center justify-center'>
      <div className='h-12 w-12 bg-[#2B0404] rounded-full flex items-center justify-center'>
        <div className='h-6 w-6 bg-[#3a0a0a] rounded'></div>
      </div>
    </div>
  );
}
export function ViewsSkeleton() {
  return (
    <div className='p-4 bg-[#2B0404] border border-yellow-500 rounded-lg shadow animate-pulse'>
      <div className='space-y-3'>
        <div className='h-5 bg-[#3a0a0a] rounded w-3/4'></div>
        <div className='h-4 bg-[#3a0a0a] rounded w-1/2'></div>
        <div className='h-3 bg-[#3a0a0a] rounded w-1/3'></div>
      </div>
    </div>
  );
}
export function ReviewsSkeleton({ count = 3 }) {
  return (
    <div className='space-y-6'>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className='p-4 bg-[#2B0404] rounded-lg border border-yellow-500 animate-pulse'
        >
          <div className='flex items-center mb-3 space-x-3'>
            <div className='h-10 w-10 bg-[#3a0a0a] rounded-full'></div>
            <div className='space-y-2'>
              <div className='h-4 bg-[#3a0a0a] rounded w-24'></div>
              <div className='h-3 bg-[#3a0a0a] rounded w-16'></div>
            </div>
          </div>
          <div className='space-y-2'>
            <div className='h-4 bg-[#3a0a0a] rounded w-full'></div>
            <div className='h-4 bg-[#3a0a0a] rounded w-5/6'></div>
            <div className='h-4 bg-[#3a0a0a] rounded w-2/3'></div>
          </div>
        </div>
      ))}
    </div>
  );
}
export function PosterSkeleton() {
  return (
    <div className='self-start w-full max-w-md h-[500px] bg-[#3a0a0a] rounded-lg shadow-lg animate-pulse'></div>
  );
}
