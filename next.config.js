/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["fsw-store.s3.sa-east-1.amazonaws.com"],
  },
};

module.exports = nextConfig;
