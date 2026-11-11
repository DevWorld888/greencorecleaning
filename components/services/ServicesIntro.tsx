import {
  categoryDescriptions,
  serviceCategories,
  servicesByCategory,
} from "@/config/services";

export function categoryId(category: string) {
  return category.toLowerCase();
}

// Page header: the same editorial family as About, plus quick links that jump
// to each service group. Not animated: above-the-fold content should appear
// at once (better LCP), and animating its transform while the web font loads
// can leave text unpainted in Chrome.
export function ServicesIntro() {
  return (
    <section
      aria-labelledby="services-page-heading"
      className="bg-white pb-12 pt-32 md:pb-16 md:pt-40 lg:pt-48"
    >
      <div className="mx-auto max-w-site px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h1
            id="services-page-heading"
            className="text-[clamp(2.5rem,1.3rem+3.4vw,4.75rem)] font-extrabold leading-[1.02] tracking-[-0.03em] lg:col-span-7"
          >
            Our cleaning <span className="text-secondary">services</span>
          </h1>
          <p className="max-w-[46ch] text-lg leading-[1.6] md:text-xl lg:col-span-5 lg:pb-2">
            Residential, commercial and specialist cleaning in Hobart. Choose
            your service and we&apos;ll send you a free, tailored quote.
          </p>
        </div>

        <div className="mt-12 md:mt-14">
          <nav aria-label="Service categories">
            <ul className="grid gap-3 sm:grid-cols-3">
              {serviceCategories.map((category) => (
                <li key={category}>
                  <a
                    href={`#${categoryId(category)}`}
                    className="group flex h-full flex-col rounded-card border border-primary/10 p-5 transition-colors hover:border-action hover:bg-mint sm:p-6"
                  >
                    <span className="flex items-center justify-between font-display text-xl font-bold text-primary">
                      {category}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        className="size-4 transition-transform group-hover:translate-y-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M10 4v12m-5-5 5 5 5-5" />
                      </svg>
                    </span>
                    <span className="mt-2 text-[0.9375rem] leading-[1.5]">
                      {servicesByCategory(category).length} services ·{" "}
                      {categoryDescriptions[category]}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
