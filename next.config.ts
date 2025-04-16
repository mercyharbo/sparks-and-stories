import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['ik.imagekit.io', 'img.freepik.com'],
  },
  plugins: [require('tailwind-scrollbar-hide')],
}

export default nextConfig
