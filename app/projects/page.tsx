import type { Metadata } from "next";
import { CtaBand } from "@/components/layout/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProjectsEmpty } from "@/components/projects/ProjectsEmpty";
import { ProjectsGallery } from "@/components/projects/ProjectsGallery";
import { hasRealProjects, projects } from "@/config/projects";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Our Work: Cleaning Projects in Hobart",
  description:
    "See before-and-after results from our cleaning work in Hobart, then request your free, no-obligation quote.",
  alternates: { canonical: "/projects" },
  // Kept out of Google until real projects are published (placeholders or the
  // "coming soon" message aren't worth indexing).
  robots: hasRealProjects ? undefined : { index: false, follow: true },
};

export default function ProjectsPage() {
  return (
    <main className="flex-1">
      <JsonLd data={breadcrumbJsonLd([{ name: "Our Work", path: "/projects" }])} />
      {/* Page header: not animated, so it appears at once (see AboutIntro). */}
      <section aria-labelledby="projects-heading" className="bg-white pb-20 pt-32 md:pb-28 md:pt-40 lg:pb-32 lg:pt-48">
        <div className="mx-auto max-w-site px-5 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <h1
              id="projects-heading"
              className="text-[clamp(2.5rem,1.3rem+3.4vw,4.75rem)] font-extrabold leading-[1.02] tracking-[-0.03em] lg:col-span-7"
            >
              Our <span className="text-secondary">work</span>
            </h1>
            <p className="max-w-[46ch] text-lg leading-[1.6] md:text-xl lg:col-span-5 lg:pb-2">
              {projects.length > 0
                ? "Before-and-after results from homes and properties we've cleaned in Hobart. Drag across each photo to compare."
                : "Before-and-after photos of our cleaning work in Hobart will appear here."}
            </p>
          </div>

          <div className="mt-12 md:mt-16">
            {projects.length > 0 ? <ProjectsGallery projects={projects} /> : <ProjectsEmpty />}
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
