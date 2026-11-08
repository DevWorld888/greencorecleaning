import Link from "next/link";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { CheckBadge } from "@/components/ui/CheckBadge";
import { serviceAreaHref, serviceAreas } from "@/config/service-areas";
import { HobartMap } from "./HobartMap";

// Local relevance: a full-bleed map of the serviced suburbs with the copy in a
// card. Each suburb links to its SEO page, so the homepage passes authority
// to the local landing pages.

// The card lists up to this many suburbs; the rest live on /service-areas.
const MAX_LISTED_AREAS = 6;

export function ServiceAreas() {
  const visibleAreas = serviceAreas.slice(0, MAX_LISTED_AREAS);

  return (
    <section
      id="areas"
      aria-labelledby="areas-heading"
      className="relative isolate scroll-mt-24 overflow-hidden bg-water xl:flex xl:min-h-[44rem] xl:items-center"
    >
      <div className="relative aspect-[4/3] max-h-[28rem] w-full sm:aspect-[16/9] xl:absolute xl:inset-0 xl:aspect-auto xl:max-h-none">
        <HobartMap />
      </div>

      <MotionProvider>
        {/* On desktop this layer spans the whole map; it ignores the pointer so
            clicks reach the pins, and only the card takes them back. */}
        <div className="relative mx-auto w-full max-w-site px-5 pb-16 md:px-10 lg:px-16 xl:pointer-events-none xl:flex xl:justify-end xl:py-20">
          <Reveal inView className="-mt-6 xl:pointer-events-auto xl:mt-0">
            <div className="rounded-card bg-white p-7 shadow-soft sm:mx-auto sm:max-w-xl sm:p-9 xl:mx-0 xl:w-[26rem]">
              <h2
                id="areas-heading"
                className="text-[clamp(2rem,1.4rem+2vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.02em]"
              >
                Local cleaning services in Hobart
              </h2>
              <p className="mt-5 leading-[1.6]">
                We currently clean homes and properties in these suburbs:
              </p>

              <ul className="mt-5 divide-y divide-primary/10 border-y border-primary/10">
                {visibleAreas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={serviceAreaHref(area)}
                      className="group flex items-center gap-3 py-3.5 text-lg font-semibold text-primary transition-colors hover:text-action"
                    >
                      <CheckBadge />
                      {area.name}
                      <ArrowIcon className="ml-auto size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>

              {serviceAreas.length > visibleAreas.length && (
                <Link
                  href="/service-areas"
                  className="mt-4 inline-flex items-center gap-2 font-semibold text-action underline-offset-4 hover:underline"
                >
                  See all areas we cover
                  <ArrowIcon className="size-4" />
                </Link>
              )}

              <p className="mt-5 text-[0.9375rem] leading-[1.6]">
                Outside these suburbs? Get in touch and we&apos;ll let you know
                if we can help.
              </p>

              <Link
                href="/contact"
                className="relative mt-7 inline-flex h-12 items-center gap-2 overflow-hidden rounded-control bg-action px-6 font-semibold text-white before:absolute before:inset-0 before:bg-primary before:opacity-0 before:transition-opacity hover:before:opacity-20"
              >
                <span className="relative">Contact us</span>
                <ArrowIcon className="relative size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </MotionProvider>

      <p className="absolute bottom-3 left-5 text-xs text-charcoal md:left-10 lg:left-16 [&_a]:underline">
        Map data ©{" "}
        <a href="https://www.openstreetmap.org/copyright" rel="noopener" target="_blank">
          OpenStreetMap contributors
        </a>
      </p>
    </section>
  );
}
