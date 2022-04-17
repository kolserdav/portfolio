/** @type {import('next').NextConfig} */
// eslint-disable-next-line no-console
console.info('Images domain: ', process.env.IMAGES_DOMAIN);
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [process.env.IMAGES_DOMAIN],
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
