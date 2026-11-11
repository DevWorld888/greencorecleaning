import Image from "next/image";
import Link from "next/link";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Reveal } from "@/components/motion/Reveal";
import { QuoteLink } from "@/components/quote/QuoteLink";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { CheckBadge } from "@/components/ui/CheckBadge";
import {
  categoryDescriptions,
  serviceHref,
  servicesByCategory,
  type Service,
  type ServiceCategory,
} from "@/config/services";
import { categoryId } from "./ServicesIntro";

const quoteButtonClass =
  "relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-control bg-action px-6 font-semibold text-white before:absolute before:inset-0 before:bg-primary before:opacity-0 before:transition-opacity hover:before:opacity-20";

// One service group. Featured services (commercial priority) get a large
// photo row; the rest are compact rows. Every row carries the service slug as
// its id, so links like /services#deep-cleaning land on it.
export function ServiceCategorySection({ category, tinted = false }: { category: ServiceCategory; tinted?: boolean }) {
  const items = servicesByCategory(category);
  const featured = items.filter((service) => service.featured);
  const others = items.filter((service) => !service.featured);
  const id = categoryId(category);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-8 py-20 md:py-24 lg:py-28 ${tinted ? "bg-mint" : "bg-white"}`}
    >
      <MotionProvider>
        <div className="mx-auto max-w-site px-5 md:px-10 lg:px-16">
          <Reveal inView className="max-w-2xl">
            <h2
              id={`${id}-heading`}
              className="text-[clamp(2rem,1.4rem+2vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.02em]"
            >
              {category} cleaning
            </h2>
            <p className="mt-4 text-lg leading-[1.6]">{categoryDescriptions[category]}</p>
          </Reveal>

          {featured.length > 0 && (
            <div className="mt-14 grid gap-16 lg:gap-24">
              {featured.map((service, index) => (
                <FeaturedRow key={service.slug} service={service} reversed={index % 2 === 1} />
              ))}
            </div>
          )}

          {others.length > 0 && (
            <ul className={`border-b border-primary/10 ${featured.length > 0 ? "mt-20" : "mt-12"}`}>
              {others.map((service) => (
                <li key={service.slug} id={service.slug} className="scroll-mt-8 border-t border-primary/10">
                  <Reveal inView className="grid gap-4 py-8 lg:grid-cols-12 lg:items-center lg:gap-8">
                    <h3 className="text-2xl font-bold lg:col-span-4">{service.name}</h3>
                    <p className="max-w-[52ch] leading-[1.6] lg:col-span-5">{service.summary}</p>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:col-span-3 lg:justify-end">
                      <QuoteLink service={service.slug} className={quoteButtonClass}>
                        <span className="relative">Get a quote</span>
                        <ArrowIcon className="relative size-4" />
                      </QuoteLink>
                      <LearnMore service={service} />
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </MotionProvider>
    </section>
  );
}

function FeaturedRow({ service, reversed }: { service: Service; reversed: boolean }) {
  if (!service.featured) return null;
  const { featured } = service;

  return (
    <article id={service.slug} aria-labelledby={`${service.slug}-title`} className="scroll-mt-8">
      <Reveal inView className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className={`relative aspect-[4/3] overflow-hidden rounded-media lg:col-span-6 ${reversed ? "lg:order-2" : ""}`}>
          <Image
            src={featured.image}
            alt={featured.imageAlt}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className={`lg:col-span-6 ${reversed ? "lg:pr-8" : "lg:pl-8"}`}>
          <p className="text-sm font-semibold text-action">{featured.audience}</p>
          <h3 id={`${service.slug}-title`} className="mt-2 text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] font-extrabold leading-[1.1]">
            {service.name}
          </h3>
          <p className="mt-4 max-w-[50ch] text-lg leading-[1.6]">{service.summary}</p>
          <ul className="mt-6 grid gap-3">
            {featured.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-primary">
                <span className="mt-0.5">
                  <CheckBadge />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <QuoteLink service={service.slug} className={quoteButtonClass}>
              <span className="relative">Get a free quote</span>
              <ArrowIcon className="relative size-4" />
            </QuoteLink>
            <LearnMore service={service} />
          </div>
        </div>
      </Reveal>
    </article>
  );
}

// Only shown once the service has its own page; until then the row itself is
// the destination of every link to the service.
function LearnMore({ service }: { service: Service }) {
  if (!service.hasPage) return null;
  return (
    <Link
      href={serviceHref(service.slug)}
      className="inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline"
    >
      Learn more
      <ArrowIcon className="size-4" />
    </Link>
  );
}
