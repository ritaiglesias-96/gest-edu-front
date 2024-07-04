import path from 'path';

const directoryName = path.dirname(new URL(import.meta.url).pathname);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['gestedu.works', 'localhost:3000', 'www.gestedu.works'],
    },
  },
  webpack: (config) => {
    // Add a rule to handle SVG files
    config.module.rules.push({
      test: /\.svg$/iu,
      use: [{ loader: '@svgr/webpack' }],
    });
    config.resolve.alias['/public'] = path.join(directoryName, 'public');
    return config;
  },
};

export default nextConfig;
