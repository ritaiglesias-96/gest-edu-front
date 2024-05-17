/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Add a rule to handle SVG files
    config.module.rules.push({
      test: /\.svg$/iu,
      use: [{ loader: "@svgr/webpack" }],
    });
    return config;
  },
};

export default nextConfig;
