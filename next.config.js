/** @type {import('next').NextConfig} */
console.info('Images domain: ', process.env.IMAGES_DOMAIN);
module.exports = {
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
