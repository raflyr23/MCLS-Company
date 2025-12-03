/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com', // Domain Vercel Blob
        port: '',
      },
      // Jika Anda masih menggunakan placeholder dari unsplash atau lainnya, biarkan ini:
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', 
        port: '',
      },
    ],
  },
};

export default nextConfig;