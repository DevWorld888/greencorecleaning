import { MotionProvider } from "@/components/motion/MotionProvider";
import { Reveal } from "@/components/motion/Reveal";
import { QuoteLink } from "@/components/quote/QuoteLink";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

// Closing call to action for inner pages, just above the footer. Not used on
// the homepage, which already ends with the full quote form.
export function CtaBand({
  heading = "Ready for a cleaner home?",
  text = "Tell us about your property and we'll send you a free, tailored quote. There's no obligation to book.",
  service,
}: {
  heading?: string;
  text?: string;
  /** Preselects a service in the quote form, e.g. on a service page. */
  service?: string;
}) {
  return (
    <section aria-labelledby="cta-band-heading" className="bg-mint py-16 md:py-20">
      <MotionProvider>
        <Reveal inView className="mx-auto flex max-w-site flex-col gap-8 px-5 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16">
          <div className="max-w-2xl">
            <h2
              id="cta-band-heading"
              className="text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] font-extrabold leading-[1.1] tracking-[-0.02em]"
            >
              {heading}
            </h2>
            <p className="mt-4 text-lg leading-[1.6]">{text}</p>
          </div>
          <QuoteLink
            service={service}
            className="relative inline-flex h-14 shrink-0 items-center gap-2 self-start overflow-hidden rounded-control bg-action px-8 text-[1.0625rem] font-semibold text-white shadow-soft before:absolute before:inset-0 before:bg-primary before:opacity-0 before:transition-opacity hover:before:opacity-20 lg:self-center"
          >
            <span className="relative">Get my free quote</span>
            <ArrowIcon className="relative size-5" />
          </QuoteLink>
        </Reveal>
      </MotionProvider>
    </section>
  );
}
