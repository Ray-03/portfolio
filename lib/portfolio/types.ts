export type TextLink = {
  href: string;
  label: string;
  external?: boolean;
};

export type Proof = {
  id: string;
  figure: string;
  caption: string;
};

export type WorkCategory = "frontend" | "fullstack" | "data";

export type WorkSummary = {
  href: string;
  name: string;
  company: string;
  summary: string;
  impact: string;
  stack: string;
  category: WorkCategory;
};

export type WorkFilter = {
  id: "all" | WorkCategory;
  label: string;
};

export type WorkSection = {
  id: string;
  label: string;
  body: string;
};

export type HomeContent = {
  name: string;
  role: string;
  location: string;
  tagline: string;
  hireKicker: string;
  exploreLabel: string;
  lead: string;
  links: TextLink[];
  proofTitle: string;
  proofs: Proof[];
  workTitle: string;
  workLead: string;
  works: WorkSummary[];
  workFilters: WorkFilter[];
  openLabel: string;
  impactLabel: string;
  stackLabel: string;
  classifiedLabel: string;
  aboutTitle: string;
  skillsLabel: string;
  skills: {
    id: string;
    label: string;
    detail: string;
    level: number;
  }[];
  educationLabel: string;
  education: string;
  credentials: { label: string; value: string }[];
};

export type WorkContent = {
  backHref: string;
  backLabel: string;
  name: string;
  company: string;
  description: string;
  impactLabel: string;
  impact: string;
  stackLabel: string;
  stack: string;
  sections: WorkSection[];
};

export type MissingContent = {
  kicker: string;
  title: string;
  lead: string;
  homeHref: string;
  homeLabel: string;
  pathLabel: string;
  pathname: string;
};
