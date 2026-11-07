import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { serviceCategories, servicesByCategory } from "@/config/services";

const fieldClass =
  "h-14 w-full rounded-control border border-primary/15 bg-white px-4 text-base text-primary transition-colors placeholder:text-charcoal/60 hover:border-primary/30 focus-visible:border-action";

type QuoteFormProps = {
  className?: string;
  /** Rendered beside the submit button, e.g. a secondary link. */
  secondaryAction?: React.ReactNode;
};

// Visual only for now: submission and final selector UX are a later approved step.
export function QuoteForm({ className = "", secondaryAction }: QuoteFormProps) {
  return (
    <div id="quote" className={`scroll-mt-8 ${className}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor="quote-service" className="text-sm font-semibold text-primary">
            Service
          </label>
          <div className="relative">
            <select
              id="quote-service"
              defaultValue=""
              className={`${fieldClass} appearance-none pr-11`}
            >
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
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 7.5 5 5 5-5" />
            </svg>
          </div>
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="quote-suburb" className="text-sm font-semibold text-primary">
            Suburb
          </label>
          <input
            id="quote-suburb"
            type="text"
            autoComplete="address-level2"
            placeholder="Your suburb"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <button
          type="button"
          className="relative inline-flex h-14 shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-control bg-action px-8 text-[1.0625rem] font-semibold text-white shadow-soft before:absolute before:inset-0 before:bg-primary before:opacity-0 before:transition-opacity hover:before:opacity-20"
        >
          <span className="relative">Get my free quote</span>
          <ArrowIcon className="relative size-5" />
        </button>
        {secondaryAction}
      </div>
    </div>
  );
}
