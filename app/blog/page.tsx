import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/blog/PostCard";
import { CtaBand } from "@/components/layout/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { hasRealPosts, posts } from "@/content/blog/posts";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Cleaning Tips & Guides for Hobart Homes",
  description:
    "Practical cleaning guides for Hobart homes, Airbnb hosts and renters moving out, from the GreenCoreCleaning team.",
  alternates: { canonical: "/blog" },
  // Kept out of Google until real posts are published.
  robots: hasRealPosts ? undefined : { index: false, follow: true },
};

export default function BlogPage() {
  const [latest, ...rest] = posts;

  return (
    <main className="flex-1">
      <JsonLd data={breadcrumbJsonLd([{ name: "Blog", path: "/blog" }])} />
      {/* Page header: not animated, so it appears at once (see AboutIntro). */}
      <section aria-labelledby="blog-heading" className="bg-white pb-20 pt-32 md:pb-28 md:pt-40 lg:pb-32 lg:pt-48">
        <div className="mx-auto max-w-site px-5 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <h1
              id="blog-heading"
              className="text-[clamp(2.5rem,1.3rem+3.4vw,4.75rem)] font-extrabold leading-[1.02] tracking-[-0.03em] lg:col-span-7"
            >
              Cleaning tips <span className="text-secondary">&amp; guides</span>
            </h1>
            <p className="max-w-[46ch] text-lg leading-[1.6] md:text-xl lg:col-span-5 lg:pb-2">
              Practical advice for Hobart homes, Airbnb hosts and renters moving out.
            </p>
          </div>

          {latest ? (
            <>
              <div className="mt-14 md:mt-16">
                <PostCard post={latest} featured />
              </div>
              {rest.length > 0 && (
                <div className="mt-20 grid gap-x-8 gap-y-16 border-t border-primary/10 pt-16 md:grid-cols-2">
                  {rest.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="mt-14 rounded-card border border-primary/10 bg-mint px-6 py-14 text-center sm:px-12 sm:py-20">
              <h2 className="text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-extrabold leading-[1.1]">
                Our first guides are coming soon
              </h2>
              <p className="mx-auto mt-4 max-w-[52ch] text-lg leading-[1.6]">
                We&apos;re putting together practical cleaning guides for Hobart homes. In the meantime, see exactly
                what a clean includes.
              </p>
              <Link
                href="/#standards"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline"
              >
                See our cleaning checklist
                <ArrowIcon className="size-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
