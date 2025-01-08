const nextI18NextConfig = require("./next-i18next.config.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  i18n: nextI18NextConfig.i18n,
};

module.exports = nextConfig;
