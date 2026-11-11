// Server-side helpers for the blog: find posts, load their MDX and estimate
// reading time.

import { readFile } from "node:fs/promises";
import { cacheLife } from "next/cache";
import path from "node:path";
import { posts, type Post } from "@/content/blog/posts";

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export async function loadPostContent(slug: string) {
  const { default: Content } = await import(`@/content/blog/${slug}.mdx`);
  return Content as React.ComponentType;
}

/** Up to `limit` other posts, same category first. */
export function relatedPosts(post: Post, limit = 2) {
  const others = posts.filter((item) => item.slug !== post.slug);
  return [
    ...others.filter((item) => item.category === post.category),
    ...others.filter((item) => item.category !== post.category),
  ].slice(0, limit);
}

/** Minutes to read at ~220 words per minute, from the post's .mdx source. */
export async function readingMinutes(slug: string) {
  "use cache";
  cacheLife("max"); // posts only change when the site is redeployed
  const source = await readFile(path.join(process.cwd(), "content/blog", `${slug}.mdx`), "utf8");
  const words = source
    .replace(/<[^>]+>/g, " ") // components such as <ServiceCallout />
    .replace(/[#>*_`[\]()-]/g, " ") // markdown symbols
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-11-10" → "10 November 2026" (Australian order). */
export function formatPostDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return `${day} ${months[month - 1]} ${year}`;
}
