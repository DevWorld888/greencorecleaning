import { MotionProvider } from "@/components/motion/MotionProvider";
import { Reveal } from "@/components/motion/Reveal";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { about } from "@/config/about";

// Page header. Editorial rather than a second homepage hero: large type, then
// one wide photo. Top padding leaves room for the transparent site header.
// The text isn't animated: above-the-fold content should appear at once
// (better LCP), and animating its transform while the web font loads can
// leave text unpainted in Chrome.
export function AboutIntro() {
  return (
    <section
      aria-labelledby="about-heading"
      className="bg-white pb-16 pt-32 md:pb-20 md:pt-40 lg:pt-48"
    >
      <MotionProvider>
        <div className="mx-auto max-w-site px-5 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            {/* The H1 scales with its column (cqi), not the viewport, so the long
                single word "GreenCoreCleaning" always fits on one line. */}
            <div className="@container min-w-0 lg:col-span-7">
              <h1
                id="about-heading"
                className="text-[min(4.75rem,10cqi)] font-extrabold leading-[1.02] tracking-[-0.03em]"
              >
                About <span className="text-secondary">GreenCoreCleaning</span>
              </h1>
            </div>
            <p className="max-w-[46ch] text-lg leading-[1.6] md:text-xl lg:col-span-5 lg:pb-2">
              {about.intro}
            </p>
          </div>

          <Reveal delay={0.1} className="mt-12 md:mt-16">
            <PhotoPlaceholder
              label="Wide photo of the founder or team at work in a Hobart home"
              className="aspect-[4/3] sm:aspect-[21/9]"
            />
          </Reveal>
        </div>
      </MotionProvider>
    </section>
  );
}
