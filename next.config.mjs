/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'instagram*',
        port: '',
      },
    ],
  },
  webpack: (config) => {
    // Add a rule to handle SVG files
    config.module.rules.push({
      test: /\.svg$/iu,
      use: [{ loader: '@svgr/webpack' }],
    });
    return config;
  },
};

export default nextConfig;
