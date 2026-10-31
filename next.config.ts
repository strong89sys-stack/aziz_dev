import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [{ pathname: "/images/**" }],
  },
};
// next.config.js
module.exports = {
  allowedDevOrigins: ['192.168.100.11'],
}

export default nextConfig;
