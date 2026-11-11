import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { QuoteLink } from "@/components/quote/QuoteLink";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { business, type SocialNetwork } from "@/config/business";
import { footerCompanyNav, legalNav, type NavItem } from "@/config/navigation";
import { serviceAreaHref, serviceAreas } from "@/config/service-areas";
import { serviceHref, services } from "@/config/services";
import logoWhite from "@/public/images/logo/logowhite-trimmed.png";

// Site-wide footer (rendered by app/layout.tsx). Every list comes from config,
// so new services, suburbs or business details appear here automatically.
export function Footer() {
  const groups: { title: string; items: NavItem[]; className?: string }[] = [
    {
      title: "Services",
      items: services.map((service) => ({ label: service.name, href: serviceHref(service.slug) })),
      className: "col-span-2 sm:col-span-1",
    },
    {
      title: "Service areas",
      items: serviceAreas.map((area) => ({ label: area.name, href: serviceAreaHref(area) })),
    },
    { title: "Company", items: footerCompanyNav },
  ];

  return (
    <footer className="bg-primary text-white [&_:focus-visible]:outline-secondary-light">
      <div className="mx-auto max-w-site px-5 md:px-10 lg:px-16">
        <div className="grid gap-14 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
          <div className="lg:col-span-4 lg:pr-8">
            <Link href="/" aria-label={`${business.name} home`} className="inline-block">
              <Image src={logoWhite} alt="" sizes="160px" className="h-auto w-36 sm:w-40" />
            </Link>
            <p className="mt-6 max-w-[34ch] leading-[1.6] text-white/75">
              Home and property cleaning in {business.area}.
            </p>
            <QuoteLink className="mt-7 inline-flex h-12 items-center gap-2 rounded-control bg-secondary-light px-6 font-semibold text-primary transition-colors hover:bg-white">
              Get a free quote
              <ArrowIcon className="size-4" />
            </QuoteLink>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:col-span-8">
            {groups.map((group) => (
              <nav key={group.title} aria-labelledby={`footer-${group.title}`} className={group.className}>
                <h2 id={`footer-${group.title}`} className="text-base font-bold text-white">
                  {group.title}
                </h2>
                <ul className="mt-5 grid gap-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[0.9375rem] text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/15 py-7 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {business.name}
            {business.abn && <span> · ABN {business.abn}</span>}
          </p>
          <div className="flex items-center gap-6">
            {legalNav.map((item) => (
              <Link key={item.href} href={item.href} className="underline-offset-4 transition-colors hover:text-white hover:underline">
                {item.label}
              </Link>
            ))}
            {business.socials.map((social) => (
              <a
                key={social.network}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${business.name} on ${social.network}`}
                className="transition-colors hover:text-white"
              >
                <SocialIcon network={social.network} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// The page is prerendered, so reading the date needs "use cache": Next.js
// computes it on the server and refreshes it daily, keeping the year current.
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

function SocialIcon({ network }: { network: SocialNetwork }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {network === "Instagram" ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </>
      ) : (
        <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v6h4v-6h3l1-4h-4V8Z" />
      )}
    </svg>
  );
}
