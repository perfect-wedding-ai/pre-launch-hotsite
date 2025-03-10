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
  // Otimizações para SSR
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  swcMinify: true,
  // Configurações específicas para Netlify
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Evita que o webpack tente resolver módulos do lado do servidor no cliente
      config.resolve.fallback = {
        fs: false,
        path: false,
        stream: false,
      }
    }
    return config
  }
}

module.exports = nextConfig 