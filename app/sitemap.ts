// /sitemap.xml: the list of pages Google should crawl. Built from config, so
// new services, suburbs, posts and projects appear here automatically once
// they're real; placeholders and pages that don't exist yet are left out.

import type { MetadataRoute } from "next";
import { hasRealProjects } from "@/config/projects";
import { services } from "@/config/services";
import { absoluteUrl } from "@/config/site";
import { hasRealPosts, posts } from "@/content/blog/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, extra: Partial<MetadataRoute.Sitemap[number]> = {}) => ({
    url: absoluteUrl(path),
    priority,
    ...extra,
  });

  return [
    page("/", 1),
    page("/services", 0.9),
    page("/about", 0.6),
    page("/contact", 0.6),
    ...(hasRealProjects ? [page("/projects", 0.6)] : []),
    ...(hasRealPosts ? [page("/blog", 0.5)] : []),

    // Individual pages only once they exist (hasPage: true in config).
    ...services.filter((service) => service.hasPage).map((service) => page(`/services/${service.slug}`, 0.8)),
    // Suburb pages: add this line back once app/service-areas/[slug] is built
    // (phase 2). Until then they don't exist and must not be listed.
    // ...serviceAreas.filter((area) => area.hasPage).map((area) => page(`/service-areas/${area.slug}`, 0.7)),
    ...posts
      .filter((post) => !post.placeholder)
      .map((post) => page(`/blog/${post.slug}`, 0.5, { lastModified: post.date })),
  ];
}
