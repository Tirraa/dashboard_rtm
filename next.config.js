/* v8 ignore start */
// Stryker disable all
// @ts-check

const { withContentlayer } = require('next-contentlayer');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // eslint-disable-next-line require-await
  async redirects() {
    return [
      /* eslint-disable perfectionist/sort-objects */
      {
        source: '/:lng/lp',
        destination: '/:lng/lp/sign-up',
        permanent: true
      },
      {
        source: '/lp',
        destination: '/lp/sign-up',
        permanent: true
      }
      /* eslint-enable perfectionist/sort-objects */
    ];
  },

  images: {
    domains: ['cdn.discordapp.com']
  },

  reactStrictMode: true,
  swcMinify: true
};

module.exports = withBundleAnalyzer(withContentlayer(nextConfig));

// Stryker restore all
/* v8 ignore stop */
