"use client";

import Image from "next/image";
import { useState } from "react";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import type { Project } from "@/config/projects";

// Drag to compare the "before" and "after" photos. The control is a native
// range input stretched over the image, so it works with mouse, touch and
// keyboard (arrow keys), and screen readers announce it as a slider.
export function BeforeAfter({ project, sizes, className = "" }: { project: Project; sizes: string; className?: string }) {
  const [position, setPosition] = useState(50);
  const { photos } = project;

  return (
    <div className={`relative isolate overflow-hidden rounded-media ${className}`}>
      {/* After: the full image underneath */}
      <div className="absolute inset-0">
        {photos ? (
          <Image src={photos.after} alt={`After: ${photos.alt}`} fill sizes={sizes} placeholder="blur" className="object-cover" />
        ) : (
          <PhotoPlaceholder label="After photo, same angle as before" tone="mint" align="end" className="size-full" />
        )}
      </div>

      {/* Before: the same frame on top, clipped to the left of the divider */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        {photos ? (
          <Image src={photos.before} alt={`Before: ${photos.alt}`} fill sizes={sizes} placeholder="blur" className="object-cover" />
        ) : (
          <PhotoPlaceholder label="Before photo" align="start" className="size-full" />
        )}
      </div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-primary/85 px-3 py-1 text-xs font-semibold text-white">
        Before
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary">
        After
      </span>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label={`Compare before and after: ${project.title}`}
        aria-valuetext={`${position}% before`}
        className="peer absolute inset-0 z-10 size-full cursor-ew-resize opacity-0"
      />

      {/* Divider and handle (visual only; the range input does the work).
          The handle shows the focus ring, since the input itself is invisible. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 z-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(15_69_87/0.15)] peer-focus-visible:[&>span]:outline-2 peer-focus-visible:[&>span]:outline-offset-2 peer-focus-visible:[&>span]:outline-action"
        style={{ left: `${position}%` }}
      >
        <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-primary shadow-soft">
          <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m7 6-4 4 4 4M13 6l4 4-4 4" />
          </svg>
        </span>
      </div>
    </div>
  );
}
