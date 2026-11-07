// `onDark` swaps to the light green so the badge keeps 3:1 contrast on primary.
export function CheckBadge({ onDark = false }: { onDark?: boolean }) {
  return (
    <span
      className={`grid size-5 shrink-0 place-items-center rounded-full ${
        onDark ? "bg-secondary-light text-primary" : "bg-secondary text-white"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="size-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m5 10.5 3.2 3L15 7" />
      </svg>
    </span>
  );
}
