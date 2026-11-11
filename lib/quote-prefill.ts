// The bridge between "start a quote" entry points (hero form, service panels)
// and the full quote form: the choices travel in the URL
// (/?service=airbnb-cleaning&suburb=sandy-bay#quote), so they also work as plain
// links without JavaScript and the page stays static.

export const QUOTE_PREFILL_EVENT = "quote:prefill";

export type QuotePrefill = { service?: string; suburb?: string };

export function quoteHref({ service, suburb }: QuotePrefill) {
  const params = new URLSearchParams();
  if (service) params.set("service", service);
  if (suburb) params.set("suburb", suburb);
  const query = params.toString();
  return `/${query ? `?${query}` : ""}#quote`;
}

/**
 * Whether the quote form is on the page the visitor is looking at. Checking
 * that it exists isn't enough: Next.js keeps previously visited pages in the
 * DOM, hidden, so the homepage form can be present while on /services.
 */
export function isQuoteFormVisible() {
  const form = document.getElementById("quote");
  return Boolean(form && form.getClientRects().length > 0);
}

/** Client-side: update the URL, tell the form to read it, scroll to it. */
export function goToQuote(prefill: QuotePrefill) {
  window.history.pushState(null, "", quoteHref(prefill));
  window.dispatchEvent(new Event(QUOTE_PREFILL_EVENT));
  document.getElementById("quote")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function readQuotePrefill(): QuotePrefill {
  const params = new URLSearchParams(window.location.search);
  return { service: params.get("service") ?? undefined, suburb: params.get("suburb") ?? undefined };
}
