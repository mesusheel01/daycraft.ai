import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Skip ESLint during builds to avoid errors in generated files
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
