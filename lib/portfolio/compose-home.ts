import { richardData } from "@/data/richard-data";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { HomeContent, WorkCategory } from "@/lib/portfolio/types";
import { workSlugs, type WorkSlug } from "@/lib/portfolio/work-slugs";
import { siteConfig } from "@/lib/site";

export function workPath(locale: Locale, slug: WorkSlug) {
  return `/${locale}/work/${slug}`;
}

function asCategory(value: string): WorkCategory {
  if (value === "frontend" || value === "fullstack" || value === "data") {
    return value;
  }
  return "frontend";
}

function projects(dict: Dictionary) {
  if (dict.portfolio.projects.length !== workSlugs.length) {
    throw new Error(
      `Expected ${workSlugs.length} portfolio projects, received ${dict.portfolio.projects.length}.`,
    );
  }
  return dict.portfolio.projects;
}

export function composeHome(dict: Dictionary, locale: Locale): HomeContent {
  const items = projects(dict);

  return {
    name: siteConfig.name,
    role: dict.about.role,
    location: siteConfig.location,
    tagline: dict.hero.tagline,
    hireKicker: dict.about.hireKicker,
    exploreLabel: dict.shell.exploreCodex,
    lead: dict.about.lead,
    links: [
      { href: `mailto:${siteConfig.email}`, label: dict.about.contactEmail },
      {
        href: siteConfig.linkedin,
        label: dict.about.contactLinkedIn,
        external: true,
      },
      { href: siteConfig.github, label: dict.apps.github, external: true },
    ],
    proofTitle: dict.shell.proof,
    proofs: items.map((project, index) => ({
      id: workSlugs[index],
      figure: project.impact,
      caption: project.company,
    })),
    workTitle: dict.portfolio.title,
    workLead: dict.portfolio.lead,
    works: items.map((project, index) => ({
      href: workPath(locale, workSlugs[index]),
      name: project.name,
      company: project.company,
      summary: project.description,
      impact: project.impact,
      stack: project.stack,
      category: asCategory(project.category),
    })),
    workFilters: [
      { id: "all", label: dict.portfolio.categories.all },
      { id: "frontend", label: dict.portfolio.categories.frontend },
      { id: "fullstack", label: dict.portfolio.categories.fullstack },
      { id: "data", label: dict.portfolio.categories.data },
    ],
    openLabel: dict.portfolio.openProject,
    impactLabel: dict.portfolio.impactLabel,
    stackLabel: dict.portfolio.stackLabel,
    classifiedLabel: dict.shell.classified,
    aboutTitle: dict.shell.about,
    skillsLabel: dict.about.skillsLabel,
    skills: richardData.skillStats.map((stat) => {
      const copy = dict.about.skills[stat.id];
      return {
        id: stat.id,
        label: copy.label,
        detail: copy.detail,
        level: stat.level,
      };
    }),
    educationLabel: dict.about.educationLabel,
    education: dict.about.education,
    credentials: dict.about.credentials.map((item) => ({
      label: item.label,
      value: item.value,
    })),
  };
}
