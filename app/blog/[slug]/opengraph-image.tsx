// Social preview for each blog post, with the post's own title.
import { posts } from "@/content/blog/posts";
import { getPost } from "@/lib/blog";
import { ogSize, renderOgImage } from "@/lib/og-image";

export const alt = "GreenCoreCleaning blog article";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  return renderOgImage({
    title: post?.title ?? "Cleaning tips and guides",
    subtitle: post ? `${post.category} guide` : "GreenCoreCleaning blog",
  });
}
