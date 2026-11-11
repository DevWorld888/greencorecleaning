// Completed cleaning projects, shown on /projects.
//
// NEVER add invented projects (CLAUDE.md). Each entry must be a real job with
// real before/after photos taken from the same angle.
//
// The three examples below are PLACEHOLDERS for reviewing the design. Before
// launch, set SHOW_PLACEHOLDER_PROJECTS to false: if no real projects exist
// yet, the page shows an honest "coming soon" message and stays out of Google.

import type { StaticImageData } from "next/image";
// Example photos supplied for the design review. They look AI-generated, so
// they must never be presented as a real job: keep this entry a placeholder.
import exampleLivingRoomBefore from "@/public/images/projects/example-living-room/before.jpg";
import exampleLivingRoomAfter from "@/public/images/projects/example-living-room/after.jpg";

export const SHOW_PLACEHOLDER_PROJECTS = true;

export type Project = {
  slug: string;
  title: string;
  /** Service slug from config/services.ts. */
  service: string;
  /** Suburb slug from config/service-areas.ts. */
  suburb: string;
  /** Display date, e.g. "March 2027". */
  date: string;
  summary: string;
  scope: string[];
  /** Real photos. Omit only on placeholders, which show "Photo here" boxes. */
  photos?: { before: StaticImageData; after: StaticImageData; alt: string };
  placeholder?: boolean;
};

const allProjects: Project[] = [
  {
    slug: "example-living-room",
    title: "Lorem ipsum dolor sit amet",
    service: "regular-house-cleaning",
    suburb: "sandy-bay",
    date: "Lorem 2027",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
    scope: ["Lorem ipsum dolor sit", "Consectetur adipiscing elit", "Integer posuere erat", "Venenatis dapibus posuere"],
    photos: {
      before: exampleLivingRoomBefore,
      after: exampleLivingRoomAfter,
      alt: "Living room with a grey sofa, coffee table and fireplace",
    },
    placeholder: true,
  },
  {
    slug: "placeholder-airbnb",
    title: "Consectetur adipiscing elit",
    service: "airbnb-cleaning",
    suburb: "howrah",
    date: "Lorem 2027",
    summary: "Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper.",
    scope: ["Donec ullamcorper nulla", "Metus auctor fringilla", "Vestibulum id ligula"],
    placeholder: true,
  },
  {
    slug: "placeholder-regular-house",
    title: "Integer posuere erat",
    service: "regular-house-cleaning",
    suburb: "hobart",
    date: "Lorem 2027",
    summary: "Aenean lacinia bibendum nulla sed consectetur. Curabitur blandit tempus porttitor.",
    scope: ["Aenean lacinia bibendum", "Nulla sed consectetur", "Curabitur blandit tempus"],
    placeholder: true,
  },
];

export const projects = allProjects.filter((project) => SHOW_PLACEHOLDER_PROJECTS || !project.placeholder);

/** True once at least one real project is published. Controls indexing. */
export const hasRealProjects = allProjects.some((project) => !project.placeholder);
