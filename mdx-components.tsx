// Required by @next/mdx. Maps each Markdown element in a blog post to a styled
// component, so writers use plain Markdown (## headings, lists, links…) and
// the post comes out in the site's typography.

import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { ServiceCallout } from "@/components/blog/ServiceCallout";

const components: MDXComponents = {
  h2: (props) => (
    <h2 className="mb-4 mt-14 text-[clamp(1.5rem,1.25rem+0.9vw,2rem)] font-bold leading-tight" {...props} />
  ),
  h3: (props) => <h3 className="mb-3 mt-10 text-xl font-bold leading-snug" {...props} />,
  p: (props) => <p className="my-5 text-[1.0625rem] leading-[1.75]" {...props} />,
  // Bullets are drawn by the list, so nested ol/ul items stay correct.
  ul: (props) => (
    <ul
      className="my-6 grid gap-3 [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.7em] [&>li]:before:size-2 [&>li]:before:rounded-full [&>li]:before:bg-secondary"
      {...props}
    />
  ),
  ol: (props) => (
    <ol className="my-6 grid list-decimal gap-3 pl-6 marker:font-bold marker:text-action [&>li]:pl-1" {...props} />
  ),
  li: (props) => <li className="text-[1.0625rem] leading-[1.7]" {...props} />,
  a: ({ href = "", ...props }) => {
    const className = "font-medium text-action underline underline-offset-2 transition-colors hover:text-primary";
    return href.startsWith("/") ? (
      <Link href={href} className={className} {...props} />
    ) : (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...props} />
    );
  },
  strong: (props) => <strong className="font-semibold text-primary" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-10 rounded-card bg-mint px-6 py-5 font-display text-xl font-semibold leading-snug text-primary sm:px-8 [&_p]:my-0 [&_p]:text-[length:inherit] [&_p]:leading-[inherit]"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-primary/10" />,
  table: (props) => (
    <div className="my-8 overflow-x-auto">
      <table className="w-full min-w-[32rem] border-collapse text-left text-[0.9375rem]" {...props} />
    </div>
  ),
  th: (props) => <th className="border-b-2 border-primary/15 py-3 pr-4 font-semibold text-primary" {...props} />,
  td: (props) => <td className="border-b border-primary/10 py-3 pr-4 align-top" {...props} />,

  // Custom components available in every post without importing them.
  ServiceCallout,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
