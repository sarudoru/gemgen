/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['oaidalleapiprodscus.blob.core.windows.net', 'images.unsplash.com', 'randomuser.me'],
  },
}

module.exports = nextConfig 