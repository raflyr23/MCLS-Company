import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com', // Izinkan Vercel Blob
        port: '',
      },
    ],
  },
};
export default nextConfig;
