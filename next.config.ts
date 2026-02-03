import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true, // This makes it a 308 redirect
      },
    ]
  },
};

export default nextConfig;
