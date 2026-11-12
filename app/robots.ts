// /robots.txt: tells search engines what they may crawl and where the sitemap
// is. Test/preview deployments block everything (see isIndexable).

import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexable } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
