/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  // When exporting, Next.js will use trailingSlash: true by default
  trailingSlash: true,
};

module.exports = nextConfig;
