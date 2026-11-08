import { MotionProvider } from "@/components/motion/MotionProvider";
import { Reveal } from "@/components/motion/Reveal";
import { QuoteRequestForm } from "@/components/quote/QuoteRequestForm";

const nextSteps = [
  {
    title: "Send your request",
    text: "Share a few details about your property and the clean you need.",
  },
  {
    title: "We review the details",
    text: "We look at your property and the scope, and contact you if we need anything else.",
  },
  {
    title: "Receive your quote",
    text: "You get a tailored quote for your property, free and with no obligation.",
  },
  {
    title: "Book your clean",
    text: "Happy with the quote? We arrange a time that suits you.",
  },
];

// The main conversion point. The process sits beside the form so visitors
// know what happens to their details right when they decide to send them.
export function QuoteSection() {
  return (
    <section
      id="quote"
      aria-labelledby="quote-heading"
      className="scroll-mt-8 bg-mint py-20 md:py-28 lg:py-32"
    >
      <MotionProvider>
        <div className="mx-auto max-w-site px-5 md:px-10 lg:px-16">
          <Reveal inView className="max-w-2xl">
            <h2
              id="quote-heading"
              className="text-[clamp(2rem,1.4rem+2vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.02em]"
            >
              Request your free cleaning quote
            </h2>
            <p className="mt-5 text-lg leading-[1.6]">
              Tell us about your property and we&apos;ll prepare a quote tailored to
              it. It&apos;s free and there&apos;s no obligation to book.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-start">
            <Reveal inView delay={0.05} className="min-w-0 lg:col-span-7">
              <div className="rounded-card bg-white p-6 shadow-soft sm:p-10">
                <QuoteRequestForm />
              </div>
            </Reveal>

            <Reveal inView delay={0.15} className="min-w-0 lg:sticky lg:top-8 lg:col-span-5">
              <aside
                aria-labelledby="next-steps-heading"
                className="rounded-card bg-primary p-7 text-white sm:p-10"
              >
                <h3 id="next-steps-heading" className="text-2xl font-bold text-white">
                  What happens next
                </h3>
                <ol className="mt-8">
                  {nextSteps.map((step, index) => (
                    <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
                      {/* Connector line between steps */}
                      {index < nextSteps.length - 1 && (
                        <span aria-hidden="true" className="absolute bottom-0 left-[1.0625rem] top-10 w-px bg-white/20" />
                      )}
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary-light font-display font-bold text-primary">
                        {index + 1}
                      </span>
                      <div className="pt-1">
                        <p className="font-display text-lg font-bold">{step.title}</p>
                        <p className="mt-1 leading-[1.6] text-white/80">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </aside>
            </Reveal>
          </div>
        </div>
      </MotionProvider>
    </section>
  );
}
