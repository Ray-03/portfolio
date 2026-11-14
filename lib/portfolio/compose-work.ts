import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { WorkContent } from "@/lib/portfolio/types";
import { workSlugs, type WorkSlug } from "@/lib/portfolio/work-slugs";

const sectionIds = ["problem", "role", "solution", "result", "proof"] as const;

export function composeWork(
  dict: Dictionary,
  locale: Locale,
  slug: WorkSlug,
): WorkContent {
  const project = dict.portfolio.projects[workSlugs.indexOf(slug)];
  if (!project) {
    throw new Error(`Missing copy for ${slug}.`);
  }

  return {
    backHref: `/${locale}`,
    backLabel: dict.portfolio.back,
    name: project.name,
    company: project.company,
    description: project.description,
    impactLabel: dict.portfolio.impactLabel,
    impact: project.impact,
    stackLabel: dict.portfolio.stackLabel,
    stack: project.stack,
    sections: sectionIds.map((id) => ({
      id,
      label: dict.portfolio.sections[id],
      body: project[id],
    })),
  };
}
