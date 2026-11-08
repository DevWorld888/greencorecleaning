"use client";

import { goToQuote, quoteHref, type QuotePrefill } from "@/lib/quote-prefill";

type QuoteLinkProps = QuotePrefill & {
  className?: string;
  children: React.ReactNode;
};

// A link to the quote form with the service (and/or suburb) preselected.
// Without JavaScript it's a normal link; with it, it skips the page reload.
export function QuoteLink({ service, suburb, className, children }: QuoteLinkProps) {
  return (
    <a
      href={quoteHref({ service, suburb })}
      onClick={(event) => {
        event.preventDefault();
        goToQuote({ service, suburb });
      }}
      className={className}
    >
      {children}
    </a>
  );
}
