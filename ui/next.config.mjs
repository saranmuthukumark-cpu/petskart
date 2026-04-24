/** @type {import('next').NextConfig} */
const proxyUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${proxyUrl}/:path*`,
      },
      {
        source: "/uploads/:path*",
        destination: `${proxyUrl}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
