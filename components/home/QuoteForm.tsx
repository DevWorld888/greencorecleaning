"use client";

import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { SelectChevron, selectClass } from "@/components/ui/form";
import { OTHER_SUBURB } from "@/config/quote-form";
import { serviceAreas } from "@/config/service-areas";
import { serviceCategories, servicesByCategory } from "@/config/services";
import { goToQuote } from "@/lib/quote-prefill";

type QuoteFormProps = {
  className?: string;
  /** Rendered beside the submit button, e.g. a secondary link. */
  secondaryAction?: React.ReactNode;
};

// Hero quick-quote: the first, low-effort step. It doesn't send anything; it
// carries the service and suburb down to the full quote form (#quote).
// Without JavaScript it's a GET form that reloads the page with the same URL.
export function QuoteForm({ className = "", secondaryAction }: QuoteFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    goToQuote({
      service: String(data.get("service") ?? "") || undefined,
      suburb: String(data.get("suburb") ?? "") || undefined,
    });
  }

  return (
    <form action="/#quote" method="get" onSubmit={handleSubmit} aria-label="Start your quote" className={className}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor="hero-service" className="text-sm font-semibold text-primary">
            Service
          </label>
          <div className="relative">
            <select id="hero-service" name="service" defaultValue="" className={selectClass}>
              <option value="" disabled>
                Choose a service
              </option>
              {serviceCategories.map((category) => (
                <optgroup key={category} label={category}>
                  {servicesByCategory(category).map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <SelectChevron />
          </div>
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="hero-suburb" className="text-sm font-semibold text-primary">
            Suburb
          </label>
          <div className="relative">
            <select id="hero-suburb" name="suburb" defaultValue="" className={selectClass}>
              <option value="" disabled>
                Choose your suburb
              </option>
              {serviceAreas.map((area) => (
                <option key={area.slug} value={area.slug}>
                  {area.name}
                </option>
              ))}
              <option value={OTHER_SUBURB}>Other suburb</option>
            </select>
            <SelectChevron />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <button
          type="submit"
          className="relative inline-flex h-14 shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-control bg-action px-8 text-[1.0625rem] font-semibold text-white shadow-soft before:absolute before:inset-0 before:bg-primary before:opacity-0 before:transition-opacity hover:before:opacity-20"
        >
          <span className="relative">Get my free quote</span>
          <ArrowIcon className="relative size-5" />
        </button>
        {secondaryAction}
      </div>
    </form>
  );
}
