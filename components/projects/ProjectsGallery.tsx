"use client";

import { useState } from "react";
import { QuoteLink } from "@/components/quote/QuoteLink";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { CheckBadge } from "@/components/ui/CheckBadge";
import type { Project } from "@/config/projects";
import { serviceAreas } from "@/config/service-areas";
import { services } from "@/config/services";
import { BeforeAfter } from "./BeforeAfter";

const serviceName = (slug: string) => services.find((service) => service.slug === slug)?.name ?? slug;
const suburbName = (slug: string) => serviceAreas.find((area) => area.slug === slug)?.name ?? slug;

// Filterable project list. The first project of every three spans the full
// width, so the grid has rhythm instead of a wall of identical cards.
export function ProjectsGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string | null>(null);

  // Only offer filters for services that actually have projects.
  const filterOptions = services.filter((service) => projects.some((project) => project.service === service.slug));
  const visible = filter ? projects.filter((project) => project.service === filter) : projects;

  return (
    <div>
      {filterOptions.length > 1 && (
        <div role="group" aria-label="Filter projects by service" className="flex flex-wrap gap-2">
          {[{ slug: null, name: "All projects" }, ...filterOptions].map((option) => {
            const active = filter === option.slug;
            return (
              <button
                key={option.slug ?? "all"}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(option.slug)}
                className={`h-11 rounded-full border px-5 text-[0.9375rem] font-semibold transition-colors ${
                  active
                    ? "border-primary bg-primary text-white"
                    : "border-primary/15 bg-white text-primary hover:border-primary/40"
                }`}
              >
                {option.name}
              </button>
            );
          })}
        </div>
      )}

      <p aria-live="polite" className="sr-only">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <div className="mt-10 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:mt-12">
        {visible.map((project, index) => (
          <ProjectCard key={project.slug} project={project} wide={index % 3 === 0} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, wide }: { project: Project; wide: boolean }) {
  return (
    <article id={project.slug} aria-labelledby={`${project.slug}-title`} className={`scroll-mt-8 ${wide ? "md:col-span-2" : ""}`}>
      <BeforeAfter
        project={project}
        sizes={wide ? "(min-width: 1280px) 1150px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
        className={wide ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]" : "aspect-[4/3]"}
      />

      <div className={`mt-6 ${wide ? "lg:grid lg:grid-cols-12 lg:gap-8" : ""}`}>
        <div className={wide ? "lg:col-span-7" : ""}>
          <p className="text-sm font-semibold text-action">
            {serviceName(project.service)} · {suburbName(project.suburb)} · {project.date}
          </p>
          <h2 id={`${project.slug}-title`} className="mt-2 text-2xl font-bold leading-tight sm:text-[1.75rem]">
            {project.title}
          </h2>
          <p className="mt-3 max-w-[56ch] leading-[1.7]">{project.summary}</p>
        </div>

        <div className={wide ? "mt-6 lg:col-span-5 lg:mt-0" : "mt-6"}>
          <ul className="grid gap-2.5" aria-label="What we did">
            {project.scope.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-primary">
                <span className="mt-0.5">
                  <CheckBadge />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <QuoteLink
            service={project.service}
            className="group mt-6 inline-flex items-center gap-2 font-semibold text-action underline-offset-4 hover:underline"
          >
            Get a quote for {serviceName(project.service)}
            <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </QuoteLink>
        </div>
      </div>
    </article>
  );
}
