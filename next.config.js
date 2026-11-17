/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');
const { version } = require('./package.json');

/** @type {import('next').NextConfig} */

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
  },
  turbopack: {
    root: path.join(__dirname, '..'),
    rules: {
      '*.md': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },

  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.IMAGES_DOMAIN || '',
      },
    ],
    formats: ['image/webp'],
  },

  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'ru',
    localeDetection: false,
  },
};

module.exports = nextConfig;
