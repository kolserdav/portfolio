/** @type {import('next').NextConfig} */
// eslint-disable-next-line no-console
console.info('Images domain: ', process.env.IMAGES_DOMAIN);
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [process.env.IMAGES_DOMAIN],
  },
};
