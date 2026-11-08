import { MotionProvider } from "@/components/motion/MotionProvider";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { faqs } from "@/config/faqs";

// Objection handling right before the quote form. Native <details> gives a
// keyboard- and screen-reader-friendly accordion with no JavaScript, and the
// answers stay in the HTML for search engines even when collapsed.
export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-24 bg-white py-20 md:py-28 lg:py-32"
    >
      <MotionProvider>
        <div className="mx-auto grid max-w-site grid-cols-1 gap-12 px-5 md:px-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-8 lg:gap-y-10 lg:px-16">
          <Reveal inView className="min-w-0 lg:col-span-5 lg:pr-10">
            <h2
              id="faq-heading"
              className="text-[clamp(2rem,1.4rem+2vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.02em]"
            >
              Questions about our cleaning services
            </h2>
            <p className="mt-6 max-w-[44ch] text-lg leading-[1.6]">
              The things people most often ask before booking a clean.
            </p>
          </Reveal>

          <Reveal inView delay={0.1} className="min-w-0 lg:col-span-7 lg:row-span-2">
            <div className="border-t border-primary/10">
              {faqs.map((faq) => (
                <details key={faq.id} className="faq-item group border-b border-primary/10">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                    <h3 className="text-lg font-bold leading-snug transition-colors group-hover:text-action sm:text-xl">
                      {faq.question}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="grid size-9 shrink-0 place-items-center rounded-full border border-primary/15 text-primary transition-[transform,background-color,color,border-color] duration-300 group-open:rotate-45 group-open:border-action group-open:bg-action group-open:text-white"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className="size-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M10 4v12M4 10h12" />
                      </svg>
                    </span>
                  </summary>
                  <p className="max-w-[62ch] pb-7 leading-[1.7] sm:pr-14">{faq.answer}</p>
                </details>
              ))}
            </div>
          </Reveal>

          {/* After the questions on mobile, under the heading on desktop. */}
          <Reveal inView className="min-w-0 lg:col-span-5 lg:pr-10">
            <div className="rounded-card bg-mint p-6 sm:p-7">
              <p className="font-display text-xl font-bold text-primary">
                Still have a question?
              </p>
              <p className="mt-2 leading-[1.6]">
                Add it to your quote request and we&apos;ll answer it when we
                get back to you.
              </p>
              <a
                href="#quote"
                className="relative mt-5 inline-flex h-12 items-center gap-2 overflow-hidden rounded-control bg-action px-6 font-semibold text-white before:absolute before:inset-0 before:bg-primary before:opacity-0 before:transition-opacity hover:before:opacity-20"
              >
                <span className="relative">Get a free quote</span>
                <ArrowIcon className="relative size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </MotionProvider>
    </section>
  );
}
