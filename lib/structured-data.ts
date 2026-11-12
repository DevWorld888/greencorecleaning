// Structured data (schema.org JSON-LD): a machine-readable description of the
// business and each page, which Google uses for local results and rich
// snippets. Built only from verified config: a detail appears here once it's
// filled in config/business.ts, and nothing is invented (no street address,
// no star ratings until there are real reviews).

import { business } from "@/config/business";
import type { Faq } from "@/config/faqs";
import { serviceAreas } from "@/config/service-areas";
import { services } from "@/config/services";
import { absoluteUrl, site } from "@/config/site";

const businessId = absoluteUrl("/#business");

/** The business itself. Rendered on every page by app/layout.tsx. */
export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": businessId,
    name: business.name,
    url: site.url,
    description: site.description,
    logo: absoluteUrl("/images/logo/logo-trimmed.png"),
    image: absoluteUrl("/images/logo/logo-trimmed.png"),
    // A service-area business: where it works, not a street address.
    areaServed: serviceAreas.map((area) => ({ "@type": "Place", name: `${area.name}, Tasmania` })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cleaning services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.name, description: service.summary },
      })),
    },
    ...(business.phone && { telephone: business.phone }),
    ...(business.email && { email: business.email }),
    ...(business.abn && { taxID: business.abn }),
    ...(business.socials.length > 0 && { sameAs: business.socials.map((social) => social.href) }),
  };
}

/** The website as a whole (helps Google show the site name in results). */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: "en-AU",
    publisher: { "@id": businessId },
  };
}

/** Breadcrumb trail, e.g. Home › Blog › Article. Shown by Google in results. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** FAQ page data. Only owner-confirmed answers are included. */
export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs
      .filter((faq) => faq.confirmed)
      .map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
  };
}

/** Article data for a blog post. */
export function articleJsonLd(post: { title: string; description: string; date: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: absoluteUrl(`/blog/${post.slug}`),
    author: { "@id": businessId },
    publisher: { "@id": businessId },
  };
}
