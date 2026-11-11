// Verified business details. The footer (and later the structured data) only
// shows a detail once it has a value here, so nothing unconfirmed is published.
//
// Pending from the owner: ABN, social media links, phone, WhatsApp, email.

export type SocialNetwork = "Instagram" | "Facebook";

export const business = {
  name: "GreenCoreCleaning",
  /** Service area, not a street address. */
  area: "Hobart, Tasmania",
  /** e.g. "12 345 678 901". */
  abn: null as string | null,
  socials: [] as { network: SocialNetwork; href: string }[],
  /** As customers dial it, e.g. "0400 123 456". Becomes a tap-to-call link. */
  phone: null as string | null,
  /** International format without + or spaces, e.g. "61400123456". Opens a chat. */
  whatsapp: null as string | null,
  email: null as string | null,
};
