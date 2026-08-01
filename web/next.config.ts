import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Turbopack scoped to this app when parent directories contain lockfiles.
  turbopack: {
    root: __dirname,
  },
  // T3's collaborative preview reaches the local server through 127.0.0.1.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
