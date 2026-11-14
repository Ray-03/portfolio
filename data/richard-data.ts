import { siteConfig } from "@/lib/site";

/**
 * Single English source of truth grounding the AI Assistant chatbot.
 * Not localized — the model is instructed to answer in whichever
 * language the visitor writes in, regardless of this data's language.
 */

export const richardData = {
  identity: {
    name: siteConfig.name,
    role: siteConfig.title,
    location: siteConfig.location,
    email: siteConfig.email,
    github: siteConfig.github,
    linkedin: siteConfig.linkedin,
    careerStartYear: siteConfig.careerStartYear,
  },

  education: {
    degree: "B.S. in Computer Science",
    school: "Binus University",
    gpa: "3.71",
  },

  certifications: [
    {
      name: "AWS Certified Cloud Practitioner",
      validUntil: "February 2029",
    },
  ],

  awards: [
    {
      name: "1st Place Winner",
      event: "Start On: Hackathon 2021",
    },
  ],

  experience: [
    {
      company: "PropertyLimBrothers",
      location: "Singapore",
      project: "Market Capitalization View",
      description:
        "Interactive data analytics interface for analyzing Singapore property market trends and pricing.",
      impact: "Cut user research time by up to 30%.",
      stack: ["React.js", "Next.js", "Data Analytics"],
    },
    {
      company: "Trainge",
      location: "Taiwan",
      project: "SEO & i18n Architecture",
      description:
        "SEO architecture overhaul, Google Merchant Center integration, multi-language (i18n) architecture, and a dynamic scheduling calendar system.",
      impact:
        "Lighthouse SEO score rose from 60 to 90. Google Merchant indexed products grew 2.5x, from about 1,400 to about 3,500.",
      stack: ["Next.js", "JSON-LD Structured Data", "i18n Framework", "Tailwind CSS"],
    },
    {
      company: "Shopee",
      location: "Indonesia",
      project: "High-Scale Transaction System & SEO",
      description:
        "Developed and scaled a high-capacity daily transaction system, plus organic search optimization.",
      impact:
        "Handled roughly 14,000 daily operations reliably on Ceph Distributed Storage. SEO score rose from 45 to 92, with organic traffic up 35% within 3 months.",
      stack: ["Node.js", "Python", "Ceph Distributed Storage", "PostgreSQL", "Elasticsearch"],
    },
  ],

  techStack: {
    frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    backend: ["Node.js", "Python"],
    dataAndInfra: ["PostgreSQL", "Elasticsearch", "Ceph Distributed Storage"],
    cloud: ["AWS"],
    practices: ["SEO architecture", "i18n / multi-language systems", "JSON-LD structured data"],
  },

  /**
   * RPG-style skill ratings, 0–100, grounded in shipped work
   * (not self-grade inflation). Education stays here for detail questions only.
   */
  skillStats: [
    { id: "frontend", level: 92 },
    { id: "seo", level: 90 },
    { id: "fullstack", level: 86 },
    { id: "systems", level: 84 },
    { id: "cloud", level: 72 },
  ] as const,

  interests: {
    photography: {
      label: "Landscape Photography",
      summary:
        "Shoots landscapes with manual camera settings and RAW capture, favoring wide, quiet framing.",
    },
    music: {
      label: "Music",
      summary: "Listens mostly to instrumental and cinematic arrangements while working.",
    },
    travel: {
      label: "Travel & History",
      summary:
        "Has traveled through Europe (France, Switzerland) and Asia (South Korea, Japan, Italy), with an interest in the history behind the places visited.",
    },
    fitness: {
      label: "Fitness & Custom Tech",
      summary:
        "Builds custom desktop PCs (Lian Li cases, be quiet! cooling) and follows a Push-Pull-Legs (PPL) training routine.",
    },
  },

  faqs: [
    {
      question: "Is Richard available for new opportunities?",
      answer:
        "Richard is open to hearing about new opportunities. The best way to check current availability and timing is to reach out directly via email or LinkedIn.",
    },
    {
      question: "What are Richard's compensation expectations?",
      answer:
        "Richard prefers to discuss compensation based on the specific role's scope and responsibilities, and is happy to align expectations directly in conversation rather than quote a number here.",
    },
    {
      question: "What roles is Richard most interested in?",
      answer:
        "Richard is most interested in Front-End or Full-Stack engineering roles that involve React / Next.js product work, especially where performance, SEO, or system scalability matter.",
    },
  ],
} as const;

export type RichardData = typeof richardData;
