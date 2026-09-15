import type { Dictionary } from "./en";

export const de: Dictionary = {
  meta: {
    title: "Portfolio",
    description: "Theme-Grundlage für das Portfolio.",
  },
  apps: {
    about: "Über mich",
    portfolio: "Portfolio",
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "E-Mail",
    contact: "Kontakt",
  },
  theme: {
    eyebrow: "Theme-Grundlage",
    title: "Primary · Secondary · Hell / Dunkel",
    description:
      "Teal als Primary und Amber als Secondary, angebunden über shadcn-CSS-Variablen. Schalte den Modus um, um beide Themes zu prüfen.",
    tokenLabel: "Token",
    tokens: {
      primary: "Primary",
      secondary: "Secondary",
      accent: "Accent",
      muted: "Muted",
      card: "Card",
      destructive: "Destructive",
    },
    componentTitle: "Komponenten-Check",
    componentDescription:
      "Buttons und Badges mit Primary- und Secondary-Varianten.",
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
    switchToLight: "Zum hellen Modus wechseln",
    switchToDark: "Zum dunklen Modus wechseln",
    language: "Sprache",
  },
};
