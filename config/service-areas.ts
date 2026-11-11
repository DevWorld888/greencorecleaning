// Suburbs the business currently services. Read by the homepage service-area
// map and list, and by future /service-areas/[slug] pages.
//
// Confirmed by the owner for launch: Hobart, Sandy Bay and Howrah.
// To add a suburb, add a line here. Its name must match the OpenStreetMap
// locality name used in data/hobart-map.ts so it appears on the map.

export type ServiceArea = {
  slug: string;
  name: string;
  /**
   * Whether the suburb gets its own SEO landing page. Hobart does not: the
   * homepage already targets "cleaning services Hobart", and a second page
   * with the same intent would compete with it (keyword cannibalisation).
   */
  hasPage: boolean;
};

export const serviceAreas: ServiceArea[] = [
  { slug: "hobart", name: "Hobart", hasPage: false },
  { slug: "sandy-bay", name: "Sandy Bay", hasPage: true },
  { slug: "howrah", name: "Howrah", hasPage: true },
];

export function serviceAreaHref(area: ServiceArea) {
  return area.hasPage ? `/service-areas/${area.slug}` : "/services";
}

/** Readable list of serviced suburbs, e.g. "Hobart, Sandy Bay and Howrah". */
export function formatAreaList() {
  const names = serviceAreas.map((area) => area.name);
  return names.length > 1
    ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`
    : names.join("");
}
