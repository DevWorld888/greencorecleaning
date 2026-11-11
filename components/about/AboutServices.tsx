import Image from "next/image";
import Link from "next/link";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { serviceAreaHref, serviceAreas } from "@/config/service-areas";
import { featuredServices, serviceHref } from "@/config/services";

// What we do and where: internal links from About to the pages that convert.
export function AboutServices() {
  return (
    <section aria-labelledby="about-services-heading" className="bg-white py-20 md:py-28 lg:py-32">
      <MotionProvider>
        <div className="mx-auto max-w-site px-5 md:px-10 lg:px-16">
          <Reveal inView className="max-w-2xl">
            <h2
              id="about-services-heading"
              className="text-[clamp(2rem,1.4rem+2vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.02em]"
            >
              What we clean, and where
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-8">
            <Reveal inView className="min-w-0 lg:col-span-8">
              <ul className="grid gap-6 sm:grid-cols-2">
                {featuredServices.map((service) => (
                  <li key={service.slug}>
                    <Link href={serviceHref(service.slug)} className="group block">
                      <div className="relative aspect-[3/2] overflow-hidden rounded-media">
                        <Image
                          src={service.featured.image}
                          alt={service.featured.imageAlt}
                          fill
                          placeholder="blur"
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <h3 className="mt-5 flex items-center gap-2 text-xl font-bold transition-colors group-hover:text-action">
                        {service.name}
                        <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                      </h3>
                      <p className="mt-2 leading-[1.6]">{service.summary}</p>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-action underline-offset-4 hover:underline"
              >
                View all services
                <ArrowIcon className="size-4" />
              </Link>
            </Reveal>

            <Reveal inView delay={0.1} className="min-w-0 lg:col-span-4">
              <div className="rounded-card bg-sky/70 p-7 sm:p-8">
                <h3 className="text-xl font-bold">Where we work</h3>
                <ul className="mt-5 divide-y divide-primary/10 border-y border-primary/10">
                  {serviceAreas.map((area) => (
                    <li key={area.slug}>
                      <Link
                        href={serviceAreaHref(area)}
                        className="group flex items-center justify-between py-3.5 font-semibold text-primary transition-colors hover:text-action"
                      >
                        {area.name}
                        <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[0.9375rem] leading-[1.6]">
                  Outside these suburbs?{" "}
                  <Link href="/contact" className="font-semibold text-action underline underline-offset-2">
                    Get in touch
                  </Link>{" "}
                  and we&apos;ll let you know if we can help.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </MotionProvider>
    </section>
  );
}
