import Image from "next/image";
import Link from "next/link";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Reveal } from "@/components/motion/Reveal";
import { QuoteLink } from "@/components/quote/QuoteLink";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { CheckBadge } from "@/components/ui/CheckBadge";
import {
  featuredServices,
  serviceCategories,
  serviceHref,
  servicesByCategory,
} from "@/config/services";

// Featured services get large, asymmetric photo panels (commercial priority);
// every other service is a compact, grouped text link to its own page.
export function FeaturedServices() {
  const otherServices = serviceCategories.map((category) => ({
    category,
    items: servicesByCategory(category).filter((service) => !service.featured),
  }));

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-24 bg-white py-20 md:py-28 lg:py-32"
    >
      <MotionProvider>
        <div className="mx-auto max-w-site px-5 md:px-10 lg:px-16">
          <Reveal inView className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2
              id="services-heading"
              className="text-[clamp(2rem,1.4rem+2vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.02em] lg:col-span-7"
            >
              Cleaning services in Hobart, tailored to your home
            </h2>
            <div className="lg:col-span-5">
              <p className="max-w-[46ch] text-lg leading-[1.6]">
                From weekly house cleans to Airbnb turnovers, choose the service
                that fits your property and we&apos;ll tailor the quote to it.
              </p>
              <Link
                href="/services"
                className="mt-4 inline-flex items-center gap-2 font-semibold text-action underline-offset-4 hover:underline"
              >
                View all services
                <ArrowIcon className="size-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:items-start lg:gap-8">
            {featuredServices.map((service, index) => (
              <Reveal
                key={service.slug}
                inView
                delay={index * 0.1}
                className={index === 0 ? "lg:col-span-7" : "lg:col-span-5"}
              >
                <article aria-labelledby={`${service.slug}-heading`}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-media lg:aspect-auto lg:h-[26rem]">
                    <Image
                      src={service.featured.image}
                      alt={service.featured.imageAlt}
                      fill
                      placeholder="blur"
                      sizes={index === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 42vw, 100vw"}
                      className="object-cover"
                    />
                  </div>

                  <div className="relative mx-4 -mt-20 rounded-card border border-primary/5 bg-white p-6 shadow-soft sm:mx-6 lg:p-8">
                    <h3 id={`${service.slug}-heading`} className="text-2xl font-bold leading-tight">
                      {service.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-action">
                      {service.featured.audience}
                    </p>
                    <p className="mt-4 leading-[1.6]">{service.summary}</p>

                    <ul className={`mt-5 grid gap-2.5 ${index === 0 ? "lg:grid-cols-2 lg:gap-x-6" : ""}`}>
                      {service.featured.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-primary">
                          <span className="mt-0.5">
                            <CheckBadge />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <QuoteLink
                        service={service.slug}
                        className="relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-control bg-action px-6 font-semibold text-white before:absolute before:inset-0 before:bg-primary before:opacity-0 before:transition-opacity hover:before:opacity-20"
                      >
                        <span className="relative">Get a free quote</span>
                        <ArrowIcon className="relative size-4" />
                      </QuoteLink>
                      <Link
                        href={serviceHref(service.slug)}
                        className="inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline"
                      >
                        Explore {service.name}
                        <ArrowIcon className="size-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal inView className="mt-16 lg:mt-20">
            <h3 className="text-xl font-bold">More cleaning services</h3>
            <div className="mt-6 grid gap-8 md:grid-cols-3 md:gap-10">
              {otherServices.map(({ category, items }) => (
                <div key={category}>
                  <p className="border-b border-primary/10 pb-3 text-sm font-semibold text-charcoal">
                    {category}
                  </p>
                  <ul>
                    {items.map((service) => (
                      <li key={service.slug} className="border-b border-primary/10">
                        <Link
                          href={serviceHref(service.slug)}
                          className="group flex items-center justify-between gap-4 py-4 font-semibold text-primary transition-colors hover:text-action"
                        >
                          {service.name}
                          <ArrowIcon className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </MotionProvider>
    </section>
  );
}
