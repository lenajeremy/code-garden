/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // Since we can't modify tsconfig directly, we'll handle some configs here
    ignoreBuildErrors: false,
  },
  webpack: (config) => {
    // Add any necessary webpack configurations
    return config;
  },
}

module.exports = nextConfig