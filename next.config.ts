import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Skip ESLint during builds to avoid errors in generated files
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    // Ignore Prisma generated files for ESLint and compilation
    config.module.rules.push({
      test: /\.js$/,
      include: /lib\/generated/,
      use: [
        {
          loader: 'ignore-loader',
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
