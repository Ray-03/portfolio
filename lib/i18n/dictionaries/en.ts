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
