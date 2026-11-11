import type { Metadata } from "next";
import Link from "next/link";
import { QuoteLink } from "@/components/quote/QuoteLink";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export const metadata: Metadata = {
  title: "Coming soon · GreenCoreCleaning",
};

const shortcuts = [
  { label: "Our services", href: "/services" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Shown for any URL that doesn't exist yet (pages still being built, or a
// mistyped address). Next.js serves it with a 404 status and noindex.
export default function NotFound() {
  return (
    <main className="flex-1">
      <section aria-labelledby="not-found-heading" className="bg-white pb-20 pt-32 md:pb-28 md:pt-40 lg:pt-44">
        <div className="mx-auto grid max-w-site grid-cols-1 items-center gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-8 lg:px-16">
          <div className="min-w-0 lg:col-span-6">
            <h1
              id="not-found-heading"
              className="text-[clamp(2.5rem,1.3rem+3.4vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em]"
            >
              Something <span className="text-secondary">special</span> is under construction
            </h1>
            <p className="mt-6 max-w-[44ch] text-lg leading-[1.6] md:text-xl">
              We&apos;re giving this page a final polish before it opens. Check back soon, or keep exploring below.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/"
                className="relative inline-flex h-14 items-center gap-2 overflow-hidden rounded-control bg-action px-7 text-[1.0625rem] font-semibold text-white shadow-soft before:absolute before:inset-0 before:bg-primary before:opacity-0 before:transition-opacity hover:before:opacity-20"
              >
                <span className="relative">Back to home</span>
                <ArrowIcon className="relative size-5" />
              </Link>
              <QuoteLink className="inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline">
                Get a free quote
                <ArrowIcon className="size-4" />
              </QuoteLink>
            </div>

            <nav aria-label="Popular pages" className="mt-12 border-t border-primary/10 pt-6">
              <p className="text-sm text-charcoal">Error 404 · Pages that are ready to visit:</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {shortcuts.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex h-10 items-center rounded-full border border-primary/15 px-4 text-[0.9375rem] font-semibold text-primary transition-colors hover:border-action hover:bg-mint"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="min-w-0 lg:col-span-5 lg:col-start-8">
            <CleaningSign />
          </div>
        </div>
      </section>
    </main>
  );
}

// A fold-out "cleaning in progress" floor sign, drawn in brand colours.
function CleaningSign() {
  return (
    <svg
      viewBox="0 0 420 440"
      role="img"
      aria-label="A cleaning in progress floor sign"
      className="mx-auto w-full max-w-[26rem]"
    >
      {/* Polished-floor shine under the sign */}
      <ellipse cx="200" cy="404" rx="170" ry="22" className="fill-sky" />
      <ellipse cx="150" cy="398" rx="60" ry="6" className="fill-white/70" />

      {/* Back leg of the A-frame */}
      <path d="M262 74 L346 392 L322 392 L250 98 Z" className="fill-primary/70" />

      {/* Front board */}
      <path d="M128 66 Q200 48 272 66 L330 392 L70 392 Z" className="fill-primary" />
      <path d="M140 96 Q200 82 260 96 L306 362 L94 362 Z" className="fill-secondary-light" />

      {/* Handle */}
      <rect x="178" y="30" width="44" height="22" rx="11" className="fill-none stroke-primary" strokeWidth="9" />

      {/* Pictogram: a person mopping, with a bucket */}
      <g className="fill-primary">
        <circle cx="180" cy="142" r="12" />
        <path d="M167 160 h26 l9 50 h-13 l-6 -28 l-6 28 h-13 Z" />
        <path d="M196 168 L236 228" className="fill-none stroke-primary" strokeWidth="6" strokeLinecap="round" />
        <rect x="222" y="226" width="32" height="9" rx="4" />
        <rect x="126" y="202" width="28" height="24" rx="4" />
        <path d="M128 202 q12 -16 24 0" className="fill-none stroke-primary" strokeWidth="4" />
      </g>

      {/* Sign text */}
      <text x="200" y="288" textAnchor="middle" className="fill-primary font-display text-[21px] font-extrabold tracking-[0.04em]">
        CLEANING
      </text>
      <text x="200" y="318" textAnchor="middle" className="fill-primary font-display text-[21px] font-extrabold tracking-[0.04em]">
        IN PROGRESS
      </text>

      {/* Sparkles (gently twinkle; static when reduced motion is preferred) */}
      <g className="fill-secondary">
        <path className="sparkle" d="M364 92 q4 22 24 26 q-20 4 -24 26 q-4 -22 -24 -26 q20 -4 24 -26Z" />
        <path className="sparkle [animation-delay:0.6s]" d="M388 170 q2 11 12 13 q-10 2 -12 13 q-2 -11 -12 -13 q10 -2 12 -13Z" />
        <path className="sparkle [animation-delay:1.2s]" d="M40 150 q3 15 17 18 q-14 3 -17 18 q-3 -15 -17 -18 q14 -3 17 -18Z" />
      </g>
    </svg>
  );
}
