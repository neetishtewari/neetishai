import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/interests", destination: "/product-lab", permanent: true },
    ];
  },
};

export default nextConfig;
