import { MotionProvider } from "@/components/motion/MotionProvider";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { cleaningChecklist } from "@/config/cleaning-checklist";
import { RoomChecklist } from "./RoomChecklist";

// Trust through transparency: instead of claiming quality, show exactly what a
// clean covers. The only dark band before the footer.
export function CleaningStandards() {
  return (
    <section
      id="standards"
      aria-labelledby="standards-heading"
      className="scroll-mt-24 bg-primary py-20 text-white md:py-28 lg:py-32 [&_:focus-visible]:outline-secondary-light"
    >
      <MotionProvider>
        <div className="mx-auto grid max-w-site grid-cols-1 gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-8 lg:px-16">
          <Reveal inView className="min-w-0 lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <h2
                id="standards-heading"
                className="text-[clamp(2rem,1.4rem+2vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-white [text-wrap:pretty]"
              >
                Know exactly what gets cleaned
              </h2>
              <p className="mt-6 max-w-[44ch] text-lg leading-[1.6] text-white/80">
                No vague promises. Here&apos;s what a standard clean covers in
                each room, so you know what to expect before we arrive. Need
                something extra? Add it to your quote request.
              </p>
              <a
                href="#quote"
                className="mt-8 inline-flex h-12 items-center gap-2 rounded-control bg-secondary-light px-6 font-semibold text-primary transition-colors hover:bg-white"
              >
                Get your free quote
                <ArrowIcon className="size-4" />
              </a>
            </div>
          </Reveal>

          <Reveal inView delay={0.1} className="min-w-0 lg:col-span-7">
            <RoomChecklist rooms={cleaningChecklist} />
          </Reveal>
        </div>
      </MotionProvider>
    </section>
  );
}
