// Blog post index. Each post is two things:
//   1. an entry here (title, date, category…), typed and checked;
//   2. its text in content/blog/<slug>.mdx.
// To publish a post: write the .mdx file and add its entry below.
//
// The three examples are PLACEHOLDERS (lorem ipsum) for reviewing the design.
// Before launch set SHOW_PLACEHOLDER_POSTS to false. While no real post
// exists, /blog shows a "coming soon" message and stays out of Google.

import type { StaticImageData } from "next/image";

export const SHOW_PLACEHOLDER_POSTS = true;

export type PostCategory = "Home cleaning" | "Airbnb hosts" | "Moving out";

export type Post = {
  /** Also the .mdx file name and the URL: /blog/<slug>. */
  slug: string;
  title: string;
  /** Used for the meta description and the post summary on /blog. */
  description: string;
  /** Publication date, YYYY-MM-DD. */
  date: string;
  category: PostCategory;
  /** Service slug the post promotes (config/services.ts). */
  relatedService?: string;
  cover?: { image: StaticImageData; alt: string };
  placeholder?: boolean;
};

const allPosts: Post[] = [
  {
    slug: "example-moving-out",
    title: "Lorem ipsum dolor sit amet consectetur",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
    date: "2026-11-10",
    category: "Moving out",
    relatedService: "end-of-lease-cleaning",
    placeholder: true,
  },
  {
    slug: "example-airbnb-hosts",
    title: "Integer posuere erat a ante venenatis",
    description: "Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper.",
    date: "2026-11-03",
    category: "Airbnb hosts",
    relatedService: "airbnb-cleaning",
    placeholder: true,
  },
  {
    slug: "example-home-cleaning",
    title: "Aenean lacinia bibendum nulla sed",
    description: "Aenean lacinia bibendum nulla sed consectetur. Curabitur blandit tempus porttitor.",
    date: "2026-10-27",
    category: "Home cleaning",
    relatedService: "regular-house-cleaning",
    placeholder: true,
  },
];

/** Published posts, newest first. */
export const posts = allPosts
  .filter((post) => SHOW_PLACEHOLDER_POSTS || !post.placeholder)
  .sort((a, b) => b.date.localeCompare(a.date));

/** True once at least one real post exists. Controls indexing of /blog. */
export const hasRealPosts = allPosts.some((post) => !post.placeholder);
