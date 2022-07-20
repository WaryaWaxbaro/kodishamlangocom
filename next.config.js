/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "graph.facebook.com",
      "firebasestorage.googleapis.com",
    ],
  },
  i18n: {
    locales: ["so", "en"],
    defaultLocale: "so",
    localeDetection: false,
  },
};

module.exports = nextConfig;
