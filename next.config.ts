import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns:[
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      }
    ]
  },
  "rules": {
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-empty-object-type": "off"
  }
};

export default nextConfig;
