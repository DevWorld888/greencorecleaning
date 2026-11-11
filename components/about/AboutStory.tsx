import { MotionProvider } from "@/components/motion/MotionProvider";
import { Reveal } from "@/components/motion/Reveal";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { about } from "@/config/about";

// The founder's story: portrait beside the text. Content is placeholder until
// the owner provides the real story (see config/about.ts).
export function AboutStory() {
  const { story } = about;

  return (
    <section aria-labelledby="story-heading" className="bg-white pb-20 md:pb-28 lg:pb-32">
      <MotionProvider>
        <div className="mx-auto grid max-w-site grid-cols-1 gap-12 px-5 md:px-10 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-16">
          <Reveal inView className="min-w-0 lg:col-span-5">
            <PhotoPlaceholder label="Portrait of the founder" className="aspect-[4/5]" />
          </Reveal>

          <Reveal inView delay={0.1} className="min-w-0 lg:col-span-6 lg:col-start-7">
            <h2
              id="story-heading"
              className="text-[clamp(2rem,1.4rem+2vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.02em]"
            >
              {story.heading}
            </h2>
            <div className="mt-6 grid max-w-[60ch] gap-5 text-lg leading-[1.7]">
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-8 border-t border-primary/10 pt-6">
              <span className="block font-display text-xl font-bold text-primary">{story.founderName}</span>
              <span className="text-charcoal">{story.founderRole}, GreenCoreCleaning</span>
            </p>
          </Reveal>
        </div>
      </MotionProvider>
    </section>
  );
}
