import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
                port: '',
                pathname: '/image/**',
                search: '',
            },
            {
                protocol: 'https',
                hostname: 'image-cdn-ak.spotifycdn.com',
                port: '',
                pathname: '/image/**',
                search: '',
            },
            {
                protocol: 'https',
                hostname: 'cs14.pikabu.ru',
                port: '',
                pathname: '/post_img/**',
                search: '',
            },
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};
export default nextConfig;
