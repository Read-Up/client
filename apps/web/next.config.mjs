/** @type {import('next').NextConfig} */
const nextConfig = {
  // transpilePackages: ["@readup/ui", 'lucide-react', 'framer-motion', 'xlsx', 'react-quill'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: "contents.kyobobook.co.kr", },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  cleanDistDir: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    esmExternals: true,
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  pageExtensions: ['tsx', 'ts'],
};

export default nextConfig;
