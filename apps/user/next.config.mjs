/** @type {import('next').NextConfig} */
const nextConfig = {
  // transpilePackages: ["@readup/ui", 'lucide-react', 'framer-motion', 'xlsx', 'react-quill'],
  // images: {
  //   remotePatterns: [
  //     { protocol: 'https', hostname: "*", },
  //     { protocol: 'https', hostname: "ss1.gcloud.kt.com" },
  //     { protocol: 'http', hostname: "*", }
  //   ],
  //   formats: ['image/avif', 'image/webp'],
  //   minimumCacheTTL: 86400,
  // },
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  cleanDistDir: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    esmExternals: true,
    scrollRestoration: true,
    optimizePackageImports: ['framer-motion'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  pageExtensions: ['tsx', 'ts'],
};

export default nextConfig;
