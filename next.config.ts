import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// MDX support for blog posts (content/blog/*.mdx, imported by app/blog).
// Posts are imported, not used as routes, so pageExtensions stays default.
const withMDX = createMDX({});

export default withMDX(nextConfig);
