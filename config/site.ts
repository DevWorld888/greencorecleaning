// Site-wide SEO settings. Everything search engines see (canonical URLs,
// sitemap, robots, structured data, social previews) is built from here.
//
// DOMAIN: the real domain isn't confirmed yet. Set NEXT_PUBLIC_SITE_URL in the
// hosting environment (e.g. https://greencorecleaning.com.au) or change the
// fallback below. Nothing else needs editing when the domain is known.

const fallbackUrl = "https://greencorecleaning.com.au"; // PROVISIONAL

export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl).replace(/\/$/, ""),
  name: "GreenCoreCleaning",
  locale: "en_AU",
  /** Used when a page doesn't set its own description. */
  description:
    "Professional home, Airbnb and end of lease cleaning in Hobart, Sandy Bay and Howrah. Tell us about your property and get a free, no-obligation quote.",
};

/**
 * Whether search engines may index this deployment. True by default, so the
 * live site is never accidentally hidden. Previews on Vercel are blocked
 * automatically; on other hosts set NEXT_PUBLIC_SITE_INDEXABLE=false on any
 * staging/test deployment.
 */
export const isIndexable =
  process.env.NEXT_PUBLIC_SITE_INDEXABLE !== "false" && process.env.VERCEL_ENV !== "preview";

/** Absolute URL for a path, e.g. absoluteUrl("/about"). */
export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
