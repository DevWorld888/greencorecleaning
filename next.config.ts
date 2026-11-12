import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  // Serve AVIF (about 20% lighter than WebP) to browsers that support it,
  // WebP to the rest. next/image picks the right one automatically.
  images: {
    formats: ["image/avif", "image/webp"],
  },
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
