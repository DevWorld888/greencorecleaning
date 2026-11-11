import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import type { Post } from "@/content/blog/posts";
import { formatPostDate, readingMinutes } from "@/lib/blog";

export async function PostMeta({ post }: { post: Post }) {
  const minutes = await readingMinutes(post.slug);
  return (
    <p className="text-sm font-semibold text-action">
      {post.category} · <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {minutes} min read
    </p>
  );
}

export function PostCover({ post, sizes, className = "" }: { post: Post; sizes: string; className?: string }) {
  return post.cover ? (
    <div className={`relative overflow-hidden rounded-media ${className}`}>
      <Image src={post.cover.image} alt={post.cover.alt} fill sizes={sizes} placeholder="blur" className="object-cover" />
    </div>
  ) : (
    <PhotoPlaceholder label="Article cover photo" className={className} />
  );
}

// Post teaser for /blog. `featured` gives the newest post a wide layout.
export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const href = `/blog/${post.slug}`;

  return (
    <article className={featured ? "grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12" : ""}>
      <Link href={href} tabIndex={-1} aria-hidden="true" className={featured ? "lg:col-span-7" : "block"}>
        <PostCover
          post={post}
          sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
          className="aspect-[3/2]"
        />
      </Link>
      <div className={featured ? "lg:col-span-5" : "mt-6"}>
        <PostMeta post={post} />
        <h2
          className={`mt-3 font-extrabold leading-[1.15] ${
            featured ? "text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)]" : "text-2xl"
          }`}
        >
          <Link href={href} className="transition-colors hover:text-action">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 max-w-[56ch] leading-[1.7]">{post.description}</p>
        <Link
          href={href}
          aria-label={`Read: ${post.title}`}
          className="group mt-5 inline-flex items-center gap-2 font-semibold text-action underline-offset-4 hover:underline"
        >
          Read article
          <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
