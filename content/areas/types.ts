// The content model for a local area page (/service-areas/<slug>).
//
// Generic on purpose: nothing here is specific to cleaning or to Hobart, so
// the same model works for any local business (plumbers, dentists…).
//
// Every field is required. That's the point: a page can't be published as a
// thin copy with only the suburb name changed (a "doorway page", which Google
// penalises). Uniqueness and keywords are then checked by `npm run areas:check`.

export type AreaPage = {
  /** URL and id: /service-areas/<slug>. Must match an area in config. */
  slug: string;
  /** Display name, e.g. "Sandy Bay". */
  name: string;

  seo: {
    /** <title>, ~50–60 characters, includes the primary keyword. */
    title: string;
    /** Meta description, 70–160 characters, includes the primary keyword. */
    description: string;
    /** The main search this page targets, e.g. "cleaning services Sandy Bay". */
    primaryKeyword: string;
    /** Supporting searches, e.g. "end of lease cleaning Sandy Bay". */
    secondaryKeywords: string[];
  };

  /** First paragraph. Must include the primary keyword naturally. */
  intro: string;

  /** What the area is like: homes, residents, rhythm. Real, sourced facts only. */
  localContext: {
    heading: string;
    paragraphs: string[];
  };

  /** 2–4 services that matter most here, each with its own local angle. */
  services: {
    /** Service slug from the business's service list. */
    service: string;
    /** Why this service is relevant in this area, in one or two sentences. */
    localAngle: string;
  }[];

  /** 2–4 questions specific to this area (not copies of the site-wide FAQ). */
  faqs: {
    question: string;
    answer: string;
  }[];

  /** Slugs of neighbouring areas, for internal links. */
  nearby: string[];

  /**
   * Where each local fact comes from. Not shown on the page: it's the proof
   * that nothing was invented, and lets anyone re-check the facts later.
   */
  sources: {
    fact: string;
    url: string;
  }[];

  /**
   * Things the business owner still has to confirm. While this list isn't
   * empty the page stays unpublished, whatever else is ready.
   */
  ownerToConfirm: string[];
};

/** A page goes live only when the owner has confirmed everything on it. */
export function isPublishable(area: AreaPage) {
  return area.ownerToConfirm.length === 0;
}
