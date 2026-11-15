// Entrance animations as plain CSS classes (see "Entrance animations" in
// app/globals.css). Server components: they add no JavaScript to the page.

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before animating (page-load reveals only). */
  delay?: number;
  /** Fade in as well as rise. Off for the main heading so it's visible at once. */
  fade?: boolean;
  /** Animate while scrolling into view instead of on page load. */
  inView?: boolean;
};

export function Reveal({ children, className = "", delay = 0, fade = true, inView = false }: RevealProps) {
  const animation = inView ? "reveal-view" : fade ? "reveal-load" : "rise-load";
  return (
    <div
      className={`${animation} ${className}`}
      style={delay && !inView ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}

export function Settle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`settle-in ${className}`}>{children}</div>;
}
