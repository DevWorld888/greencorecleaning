"use client";

import { goToQuote, isQuoteFormVisible, quoteHref, type QuotePrefill } from "@/lib/quote-prefill";

type QuoteLinkProps = QuotePrefill & {
  className?: string;
  children: React.ReactNode;
};

// A link to the quote form with the service (and/or suburb) preselected.
// Without JavaScript it's a normal link. With it:
// - on the page that holds the form, it fills the form without reloading;
// - on other pages it does a full page load. Next.js would otherwise handle
//   the click client-side and restore the cached homepage, whose form never
//   sees the new ?service= value.
export function QuoteLink({ service, suburb, className, children }: QuoteLinkProps) {
  const href = quoteHref({ service, suburb });
  return (
    <a
      href={href}
      onClick={(event) => {
        event.preventDefault();
        if (isQuoteFormVisible()) goToQuote({ service, suburb });
        else window.location.assign(href);
      }}
      className={className}
    >
      {children}
    </a>
  );
}
