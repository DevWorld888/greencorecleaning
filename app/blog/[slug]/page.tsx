import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard, PostCover, PostMeta } from "@/components/blog/PostCard";
import { CtaBand } from "@/components/layout/CtaBand";
import { business } from "@/config/business";
import { services } from "@/config/services";
import { posts } from "@/content/blog/posts";
import { getPost, loadPostContent, relatedPosts } from "@/lib/blog";

// Every post is prerendered at build time. Unknown slugs hit notFound() below.
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} · GreenCoreCleaning`,
    description: post.description,
    openGraph: { type: "article", title: post.title, description: post.description, publishedTime: post.date },
    // Placeholder posts must never be indexed.
    robots: post.placeholder ? { index: false, follow: true } : undefined,
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const Content = await loadPostContent(post.slug);
  const related = relatedPosts(post);
  const service = services.find((item) => item.slug === post.relatedService);

  // Structured data so search engines understand this is an article.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: business.name },
    publisher: { "@type": "Organization", name: business.name },
  };

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article aria-labelledby="post-title" className="bg-white pb-20 pt-32 md:pb-28 md:pt-40 lg:pt-44">
        <header className="mx-auto max-w-[42rem] px-5 md:px-0">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 10H4m5-5-5 5 5 5" />
            </svg>
            All articles
          </Link>
          <div className="mt-8">
            <PostMeta post={post} />
          </div>
          <h1
            id="post-title"
            className="mt-4 text-[clamp(2.25rem,1.4rem+3vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.025em]"
          >
            {post.title}
          </h1>
          <p className="mt-6 text-xl leading-[1.6]">{post.description}</p>
        </header>

        <div className="mx-auto mt-12 max-w-site px-5 md:mt-16 md:px-10 lg:px-16">
          <PostCover post={post} sizes="(min-width: 1280px) 1150px, 100vw" className="aspect-[3/2] md:aspect-[21/9]" />
        </div>

        <div className="mx-auto mt-12 max-w-[42rem] px-5 md:mt-16 md:px-0">
          <Content />

          <p className="mt-14 border-t border-primary/10 pt-6 text-[0.9375rem]">
            Written by the <span className="font-semibold text-primary">{business.name}</span> team in Hobart.
          </p>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="border-t border-primary/10 bg-white py-20 md:py-24">
          <div className="mx-auto max-w-site px-5 md:px-10 lg:px-16">
            <h2 id="related-heading" className="text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-extrabold">
              Keep reading
            </h2>
            <div className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
              {related.map((item) => (
                <PostCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        heading={service ? `Need help with ${service.name}?` : undefined}
        service={service?.slug}
      />
    </main>
  );
}
