/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  trailingSlash: true,
  generateBuildId: () => 'build',
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    telemetry: false
  }
}

module.exports = nextConfig 