import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/tasks",
        destination: "/dashboard/tasks",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
