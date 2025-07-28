/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net'], // Contentful images
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
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
  // Performance optimizations
  experimental: {
    optimizeCss: true,
  },
  // Headers for caching and security
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(js|css|woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  // Redirects for SEO
  async redirects() {
    return [
      // Redirect www to non-www (if needed)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.washingtonrugby.org' }],
        destination: 'https://washingtonrugby.org/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig 