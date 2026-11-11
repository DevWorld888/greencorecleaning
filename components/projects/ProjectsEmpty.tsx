import Link from "next/link";
import { QuoteLink } from "@/components/quote/QuoteLink";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

// Honest pre-launch state: shown when there are no real projects yet, instead
// of filling the page with invented work.
export function ProjectsEmpty() {
  return (
    <div className="rounded-card border border-primary/10 bg-mint px-6 py-14 text-center sm:px-12 sm:py-20">
      <h2 className="text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-extrabold leading-[1.1]">
        Our first projects are coming soon
      </h2>
      <p className="mx-auto mt-4 max-w-[52ch] text-lg leading-[1.6]">
        We&apos;re a new Hobart business, and the jobs we complete will appear here. In the meantime, you can see exactly
        what a clean includes.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
        <Link
          href="/#standards"
          className="inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline"
        >
          See our cleaning checklist
          <ArrowIcon className="size-4" />
        </Link>
        <QuoteLink className="relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-control bg-action px-6 font-semibold text-white before:absolute before:inset-0 before:bg-primary before:opacity-0 before:transition-opacity hover:before:opacity-20">
          <span className="relative">Get a free quote</span>
          <ArrowIcon className="relative size-4" />
        </QuoteLink>
      </div>
    </div>
  );
}
