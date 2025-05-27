/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
=======
	images: {
		domains: ['image.tmdb.org'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'm.media-amazon.com',
				port: '',
				pathname: '/images/**',
			},
		],
	},
>>>>>>> 9d3469cd81c4a9f60c349f003d5b8f94b99eaf05
};

export default nextConfig;
