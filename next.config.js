/* v8 ignore start */
// @ts-check

// Stryker disable all
const { withContentlayer } = require('next-contentlayer');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
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
