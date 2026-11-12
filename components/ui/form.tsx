// Shared form styling, used by the hero quick-quote form and the full quote form.

export const fieldClass =
  "h-14 w-full rounded-control border border-primary/15 bg-white px-4 text-base text-primary transition-colors placeholder:text-charcoal/75 hover:border-primary/30 focus-visible:border-action aria-invalid:border-red-700";

/** <select> styling: the placeholder option shows muted, with room for the chevron. */
export const selectClass = `${fieldClass} appearance-none pr-11 has-[option[value='']:checked]:text-charcoal/75`;

export function SelectChevron() {
  return (
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
  );
}
