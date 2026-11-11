import Link from "next/link";
import { QuoteLink } from "@/components/quote/QuoteLink";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { serviceHref, services } from "@/config/services";

// A service promotion block that writers drop into a post:
//   <ServiceCallout service="end-of-lease-cleaning" />
// Turns a helpful article into a next step, with the service preselected.
export function ServiceCallout({ service }: { service: string }) {
  const item = services.find((entry) => entry.slug === service);
  if (!item) return null;

  return (
    <aside
      aria-label={`Our ${item.name} service`}
      className="my-10 rounded-card bg-primary p-6 text-white sm:p-8 [&_:focus-visible]:outline-secondary-light"
    >
      <p className="font-display text-2xl font-bold">{item.name} in Hobart</p>
      <p className="mt-2 max-w-[52ch] leading-[1.6] text-white/80">{item.summary}</p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <QuoteLink
          service={item.slug}
          className="inline-flex h-12 items-center gap-2 rounded-control bg-secondary-light px-6 font-semibold text-primary transition-colors hover:bg-white"
        >
          Get a free quote
          <ArrowIcon className="size-4" />
        </QuoteLink>
        <Link
          href={serviceHref(item.slug)}
          className="font-semibold text-white underline-offset-4 hover:underline"
        >
          About this service
        </Link>
      </div>
    </aside>
  );
}
