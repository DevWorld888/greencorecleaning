import Link from "next/link";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { about } from "@/config/about";

// How we work: an editorial two-column list rather than icon cards. Each point
// links to the part of the site that backs it up.
export function AboutPrinciples() {
  return (
    <section aria-labelledby="principles-heading" className="bg-primary py-20 text-white md:py-28 lg:py-32 [&_:focus-visible]:outline-secondary-light">
      <MotionProvider>
        <div className="mx-auto max-w-site px-5 md:px-10 lg:px-16">
          <Reveal inView className="max-w-2xl">
            <h2
              id="principles-heading"
              className="text-[clamp(2rem,1.4rem+2vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-white"
            >
              How we work
            </h2>
            <p className="mt-5 text-lg leading-[1.6] text-white/80">
              No vague promises, just the way we approach every clean.
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-x-12 md:grid-cols-2 lg:mt-16 lg:gap-x-20">
            {about.principles.map((principle, index) => (
              <li key={principle.title} className="border-t border-white/15">
                <Reveal inView delay={(index % 2) * 0.08} className="flex h-full flex-col py-8 lg:py-10">
                  <h3 className="text-2xl font-bold text-white">{principle.title}</h3>
                  <p className="mt-3 max-w-[46ch] leading-[1.7] text-white/80">{principle.text}</p>
                  <Link
                    href={principle.link.href}
                    className="group mt-5 inline-flex items-center gap-2 self-start font-semibold text-secondary-light underline-offset-4 hover:underline"
                  >
                    {principle.link.label}
                    <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </MotionProvider>
    </section>
  );
}
