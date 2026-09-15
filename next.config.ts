import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.100.9", "127.0.0.1"],
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: false },
      { source: "/id", destination: "/", permanent: false },
      { source: "/zh", destination: "/", permanent: false },
      { source: "/de", destination: "/", permanent: false },
      { source: "/en/:path*", destination: "/", permanent: false },
      { source: "/id/:path*", destination: "/", permanent: false },
      { source: "/zh/:path*", destination: "/", permanent: false },
      { source: "/de/:path*", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
