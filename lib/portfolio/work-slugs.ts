/**
 * Stable work identities. `portfolio.projects` in every dictionary follows this
 * order: copy can change, slugs cannot.
 */
export const workSlugs = [
  "propertylimbrothers-market-view",
  "trainge-seo-i18n",
  "shopee-scale-and-seo",
] as const;

export type WorkSlug = (typeof workSlugs)[number];

export function isWorkSlug(value: string): value is WorkSlug {
  return (workSlugs as readonly string[]).includes(value);
}
