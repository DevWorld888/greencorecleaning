// Registry of area pages. To add one: create content/areas/<slug>.ts with an
// AreaPage object, then import it and add it to the list below.
// (The /suburb-page skill does both for you.)

import { isPublishable, type AreaPage } from "./types";

const allAreaPages: AreaPage[] = [];

/** Every area page, including drafts still waiting for owner confirmation. */
export const areaPages = allAreaPages;

/** Only the pages that are ready to be shown to visitors and search engines. */
export const publishedAreaPages = allAreaPages.filter(isPublishable);

export function getAreaPage(slug: string) {
  return allAreaPages.find((area) => area.slug === slug);
}
