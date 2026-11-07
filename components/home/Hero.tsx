import Image from "next/image";
import heroImage from "@/public/images/hero-living-room-wide.jpg";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Reveal, Settle } from "@/components/motion/Reveal";
import { CheckBadge } from "@/components/ui/CheckBadge";
import { QuoteForm } from "./QuoteForm";

const steps = [
  { label: "Tell us about your property", Icon: ClipboardIcon },
  { label: "Get your free quote", Icon: TagIcon },
  { label: "We clean, you relax", Icon: HomeCheckIcon },
];

const featuredServices = [
  "Regular & Deep Cleaning",
  "End of Lease Cleaning",
  "Airbnb Cleaning",
];

function ClipboardIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M9 12h6M9 16h4" />
    </svg>
  );
}

function HomeCheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      <path d="m9 14.5 2 2 4-4" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M10 8.5v7l5.5-3.5z" fill="currentColor" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </svg>
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-white lg:flex lg:min-h-[min(100svh,58rem)] lg:items-center"
    >
      <MotionProvider>
        {/* Full-bleed photo. Desktop fades it out toward the copy on the left and into the next
            section below; mobile fades it down into the copy. No hard edge anywhere. */}
        <div className="relative aspect-[4/3] w-full mask-b-from-55% md:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[56%] lg:mask-b-from-80% lg:mask-l-from-50% lg:mask-l-to-80% xl:w-[62%]">
          <Settle className="absolute inset-0">
            <Image
              src={heroImage}
              alt="Bright, spotless open-plan living room with light carpet, grey sofas and white walls"
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 1280px) 62vw, (min-width: 1024px) 56vw, 100vw"
              className="-scale-x-100 object-cover object-[50%_65%]"
            />
          </Settle>

          <Reveal
            delay={0.4}
            className="absolute right-[6%] top-[18%] hidden rounded-card bg-white/95 px-5 py-4 shadow-soft lg:block"
          >
            <ul aria-label="Popular services" className="grid gap-2.5">
              {featuredServices.map((service) => (
                <li key={service} className="flex items-center gap-2.5 text-sm font-semibold text-primary">
                  <CheckBadge />
                  {service}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={0.5}
            className="absolute bottom-[24%] right-[10%] hidden items-center gap-3 rounded-card bg-white/95 px-4 py-3 shadow-soft lg:flex"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-mint text-action">
              <TagIcon />
            </span>
            <span>
              <span className="block font-display font-bold leading-tight text-primary">
                Free quotes
              </span>
              <span className="block text-sm text-charcoal">
                No obligation, tailored to your home.
              </span>
            </span>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-site px-5 pb-16 md:px-10 md:pb-24 lg:px-16 lg:pb-28 lg:pt-36">
          <div className="-mt-10 max-w-xl md:-mt-16 lg:mt-0 lg:max-w-[36rem]">
            <Reveal fade={false}>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/90 px-3.5 py-1.5 text-sm font-semibold text-primary">
                <span aria-hidden="true" className="size-2 rounded-full bg-secondary" />
                Spotless homes, every visit
              </p>
            </Reveal>

            {/* No fade on the heading: it is the likely LCP element and stays visible from first paint. */}
            <Reveal fade={false}>
              <h1
                id="hero-heading"
                className="text-[clamp(2.5rem,1.3rem+3.4vw,4.25rem)] font-extrabold leading-[1.03] tracking-[-0.025em]"
              >
                Home cleaning in Hobart,{" "}
                <span className="text-secondary lg:block">done with care.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[44ch] text-lg leading-[1.55] md:text-xl">
                Regular, deep, end of lease and Airbnb cleaning for Hobart
                homes. Tell us about your property and we&apos;ll send a free,
                no-obligation quote.
              </p>
            </Reveal>

            <Reveal delay={0.16} className="mt-10">
              <QuoteForm
                secondaryAction={
                  // Target section does not exist yet; wire it when "Our Work" is built.
                  <a
                    href="#our-work"
                    className="inline-flex h-14 shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-control border border-primary/15 bg-white px-6 text-[1.0625rem] font-semibold text-primary transition-colors hover:border-primary/30 hover:bg-mint"
                  >
                    <PlayIcon />
                    See Our Work
                  </a>
                }
              />
            </Reveal>

            <Reveal delay={0.24}>
              <ol
                aria-label="How it works"
                className="mt-10 grid gap-4 rounded-card border border-secondary/15 bg-mint p-5 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-primary/10 sm:p-0"
              >
                {steps.map(({ label, Icon }, index) => (
                  <li key={label} className="flex items-center gap-3 sm:px-5 sm:py-5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-action shadow-soft">
                      <Icon />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-action">
                        Step {index + 1}
                      </span>
                      <span className="block text-sm font-semibold leading-snug text-primary">
                        {label}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </MotionProvider>
    </section>
  );
}
