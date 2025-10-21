import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com'],
  },
  // Enable experimental features if needed
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Configure webpack for PDF.js and other client-side libraries
  webpack: config => {
    // Alias problematic modules to false for server-side rendering
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      encoding: false,
    };

    // Add fallbacks for Node.js modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
      stream: false,
      buffer: false,
      util: false,
    };

    return config;
  },
};

export default withNextIntl(nextConfig);
