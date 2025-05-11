/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  // Make sure GitHub Pages works with your repo name
  basePath: '/Portfoliowebsite',
  assetPrefix: '/Portfoliowebsite',
}

module.exports = nextConfig 