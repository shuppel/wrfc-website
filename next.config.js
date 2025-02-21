/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [], // Add any image domains you'll be using
    formats: ['image/avif', 'image/webp'],
  },
  // Enable SWC minification
  swcMinify: true,
  // Optimize fonts
  optimizeFonts: true,
  // Enable compression
  compress: true,
  // Configure powered by header
  poweredByHeader: false,
  // Configure environment variables
  env: {
    SITE_NAME: 'Washington Rugby Football Club',
    SITE_URL: process.env.SITE_URL || 'http://localhost:3000',
  },
}

module.exports = nextConfig 