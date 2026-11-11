// Marks where a real photo will go. Deliberately obvious, so a missing photo
// is never mistaken for finished content. Replace with <Image> before launch.
export function PhotoPlaceholder({
  label,
  className = "",
  tone = "sky",
  align = "center",
}: {
  label: string;
  className?: string;
  /** Background tint, e.g. to tell "before" and "after" apart. */
  tone?: "sky" | "mint";
  /** Where the label sits, e.g. centred in one half of a before/after comparison. */
  align?: "center" | "start" | "end";
}) {
  const alignClass = {
    center: "place-items-center",
    start: "items-center justify-items-start pl-[8%]",
    end: "items-center justify-items-end pr-[8%]",
  }[align];

  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${label}`}
      data-placeholder="photo"
      className={`grid ${alignClass} rounded-media border-2 border-dashed border-primary/25 p-6 text-center ${tone === "mint" ? "bg-mint" : "bg-sky/60"} ${className}`}
    >
      <div className={align === "center" ? "" : "w-[34%] min-w-32"}>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="mx-auto size-10 text-primary/50"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
          <circle cx="12" cy="13.5" r="3.5" />
        </svg>
        <p className="mt-3 font-display text-lg font-bold text-primary">Photo here</p>
        <p className="mt-1 max-w-[28ch] text-sm text-charcoal">{label}</p>
      </div>
    </div>
  );
}
