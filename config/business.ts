// Verified business details: the single source of the NAP (Name, Address,
// Phone). The footer, contact page and structured data only show a detail once
// it has a value here, so nothing unconfirmed is published. Keep these values
// identical to the Google Business Profile.
//
// Pending from the owner: social media links, email.

export type SocialNetwork = "Instagram" | "Facebook";

export const business = {
  /** Exactly as it appears on Google Business Profile. */
  name: "Green Core Cleaning",
  /** Service area, not a street address (service-area business). */
  area: "Hobart, Tasmania",
  abn: "12 149 192 639" as string | null,
  socials: [] as { network: SocialNetwork; href: string }[],
  /** As customers dial it. Becomes a tap-to-call link. */
  phone: "0432 004 267" as string | null,
  /** International format for structured data (what Google recommends). */
  phoneInternational: "+61 432 004 267" as string | null,
  /** International format without + or spaces, e.g. "61400123456". Opens a chat. */
  whatsapp: "61432004267" as string | null,
  email: null as string | null,
};
