/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "thereadersbay.wordpress.com", pathname: "/**" },
      { protocol: "https", hostname: "m.media-amazon.com", pathname: "/**" },
      { protocol: "https", hostname: "4kwallpapers.com", pathname: "/**" },
      { protocol: "https", hostname: "wallpapers.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;