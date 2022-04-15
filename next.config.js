/** @type {import('next').NextConfig} */
console.log(process.env.IMAGES_DOMAIN);
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [process.env.IMAGES_DOMAIN],
  },
};
