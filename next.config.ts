import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'image.tmdb.org', 'i.scdn.co', 'img.freepik.com', 'live.staticflickr.com', 'youtube.com', 'play.google.com', 'kino-nextjs-app.onrender.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
