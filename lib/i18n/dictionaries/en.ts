export const en = {
  meta: {
    title: "Portfolio",
    description: "Theme foundation for the portfolio.",
  },
  apps: {
    about: "About Me",
    portfolio: "Portfolio",
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "Email",
    contact: "Contact",
  },
  hero: {
    tagline:
      "Building high-performance React & Next.js interfaces with clear motion and craft.",
  },
  about: {
    title: "About Me",
    role: "Front-End Software Engineer",
    lead:
      "I build polished, performant interfaces — from motion-rich landing experiences to product UIs that feel clear and intentional.",
    body:
      "I care about typography, interaction details, and shipping work that holds up across devices. Outside of shipping features, I’m usually refining animations, accessibility, or the little moments that make a product feel finished.",
    back: "Home",
    close: "Close",
  },
  portfolio: {
    title: "Portfolio",
    back: "Home",
    lead: "Selected work and experiments — interfaces, motion, and front-end craft.",
    openProject: "Open project",
    projects: [
      {
        name: "Personal Portfolio",
        tag: "Next.js · Motion",
        description:
          "A scroll-driven tablet experience with theming, i18n, and an OS-inspired home for navigation.",
        href: "https://github.com/Ray-03",
      },
      {
        name: "Product UI systems",
        tag: "Design systems",
        description:
          "Component libraries and patterns focused on clarity, accessibility, and consistent interaction.",
        href: "",
      },
      {
        name: "Motion studies",
        tag: "Prototype",
        description:
          "Small experiments in scroll storytelling, micro-interactions, and spatial UI metaphors.",
        href: "",
      },
    ],
  },
  theme: {
    eyebrow: "Theme foundation",
    title: "Primary · Secondary · Light / Dark",
    description:
      "Teal primary and amber secondary, wired through shadcn CSS variables. Toggle the mode to preview both themes.",
    tokenLabel: "Token",
    tokens: {
      primary: "Primary",
      secondary: "Secondary",
      accent: "Accent",
      muted: "Muted",
      card: "Card",
      destructive: "Destructive",
    },
    componentTitle: "Component check",
    componentDescription:
      "Buttons and badges using primary and secondary variants.",
    buttons: {
      primary: "Primary",
      secondary: "Secondary",
      outline: "Outline",
      ghost: "Ghost",
    },
    badges: {
      default: "Default",
      secondary: "Secondary",
      outline: "Outline",
    },
  },
  a11y: {
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",
    language: "Language",
  },
};

export type Dictionary = typeof en;
