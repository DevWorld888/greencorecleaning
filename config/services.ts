// Single source of truth for services. The homepage, the quote form and future
// /services/[slug] pages all read from this list.
//
// DRAFT COPY: summaries and inclusions are placeholders written for layout.
// The owner must confirm every line before launch (see PRODUCT.md).

import type { StaticImageData } from "next/image";
import regularHouseImage from "@/public/images/services/regular-house-cleaning.jpg";
import airbnbImage from "@/public/images/services/airbnb-cleaning.jpg";

export type ServiceCategory = "Residential" | "Commercial" | "Specialist";

export type Service = {
  slug: string;
  name: string;
  category: ServiceCategory;
  summary: string;
  /** Featured services get a large panel on the homepage. */
  featured?: {
    audience: string;
    includes: string[];
    image: StaticImageData;
    imageAlt: string;
  };
};

export const services: Service[] = [
  {
    slug: "regular-house-cleaning",
    name: "Regular House Cleaning",
    category: "Residential",
    summary:
      "Weekly, fortnightly or monthly cleans that keep your home consistently fresh, on a schedule that suits you.",
    featured: {
      audience: "For busy Hobart households",
      includes: [
        "Kitchen benches, splashbacks and appliance exteriors",
        "Bathrooms, toilets and showers cleaned and sanitised",
        "Dusting, vacuuming and mopping throughout",
        "Beds made and rooms tidied",
      ],
      image: regularHouseImage,
      imageAlt: "Bright, freshly cleaned kitchen with white cabinets and a marble island",
    },
  },
  {
    slug: "airbnb-cleaning",
    name: "Airbnb Cleaning",
    category: "Residential",
    summary:
      "Turnover cleans between guests, so every stay starts with a spotless, guest-ready property.",
    featured: {
      audience: "For Airbnb and short-stay hosts",
      includes: [
        "Full turnover clean between check-out and check-in",
        "Fresh linen and towels changed and beds remade",
        "Kitchen and bathroom reset for the next guest",
        "Flexible scheduling around your bookings",
      ],
      image: airbnbImage,
      imageAlt: "Freshly made bed with crisp white linen in a bright studio apartment",
    },
  },
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning",
    category: "Residential",
    summary: "A detailed top-to-bottom clean for homes that need extra attention.",
  },
  {
    slug: "end-of-lease-cleaning",
    name: "End of Lease Cleaning",
    category: "Residential",
    summary: "A thorough vacate clean to help you hand the property back with confidence.",
  },
  {
    slug: "commercial-cleaning",
    name: "Commercial Cleaning",
    category: "Commercial",
    summary: "Reliable cleaning for shops, clinics and shared commercial spaces.",
  },
  {
    slug: "office-cleaning",
    name: "Office Cleaning",
    category: "Commercial",
    summary: "Clean, tidy workspaces on a schedule that works around your team.",
  },
  {
    slug: "builders-cleaning",
    name: "Builders / Post-Construction Cleaning",
    category: "Specialist",
    summary: "Dust and debris removal to get new builds and renovations ready for handover.",
  },
  {
    slug: "carpet-cleaning",
    name: "Carpet Cleaning",
    category: "Specialist",
    summary: "Refresh carpets and rugs throughout your home or workplace.",
  },
  {
    slug: "window-cleaning",
    name: "Window Cleaning",
    category: "Specialist",
    summary: "Streak-free glass, frames and sills, inside and out.",
  },
  {
    slug: "caulking",
    name: "Caulking",
    category: "Specialist",
    summary: "Fresh, clean sealant lines for bathrooms, kitchens and wet areas.",
  },
];

export const serviceCategories: ServiceCategory[] = ["Residential", "Commercial", "Specialist"];

export const featuredServices = services.filter(
  (service): service is Service & { featured: NonNullable<Service["featured"]> } =>
    Boolean(service.featured),
);

export function servicesByCategory(category: ServiceCategory) {
  return services.filter((service) => service.category === category);
}

export function serviceHref(slug: string) {
  return `/services/${slug}`;
}
