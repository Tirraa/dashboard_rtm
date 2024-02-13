/* v8 ignore start */
// Stryker disable all
// @ts-check
const { withContentlayer } = require('next-contentlayer');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:lng/index',
        destination: '/:lng',
        permanent: true
      },
      {
        source: '/index',
        destination: '/',
        permanent: true
      }
    ];
  },

  images: {
    domains: ['cdn.discordapp.com']
  },
  transpilePackages: ['@rtm/shared-lib'],
  reactStrictMode: true,
  swcMinify: true
};

module.exports = withBundleAnalyzer(withContentlayer(nextConfig));
// Stryker restore all
/* v8 ignore stop */
