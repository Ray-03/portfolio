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
  hero: {
    tagline:
      "Hochperformante React- & Next.js-Interfaces mit klarer Motion und sorgfältiger Craft.",
  },
  about: {
    title: "Über mich",
    role: "Front-End Software Engineer",
    lead:
      "Ich baue polierte, performante Interfaces — von motion-reichen Landing Experiences bis zu klaren, bewussten Product-UIs.",
    body:
      "Mir liegen Typografie, Interaktionsdetails und Ergebnisse am Herzen, die auf Geräten standhalten. Neben Features verfeinere ich oft Animationen, Accessibility oder die kleinen Momente, die ein Produkt fertig wirken lassen.",
    back: "Home",
    close: "Schließen",
  },
  portfolio: {
    title: "Portfolio",
    back: "Home",
    lead: "Ausgewählte Arbeiten und Experimente — Interfaces, Motion und Front-End-Handwerk.",
    openProject: "Projekt öffnen",
    projects: [
      {
        name: "Persönliches Portfolio",
        tag: "Next.js · Motion",
        description:
          "Eine scroll-getriebene Tablet-Erfahrung mit Theming, i18n und einem OS-inspirierten Home für Navigation.",
        href: "https://github.com/Ray-03",
      },
      {
        name: "Product-UI-Systeme",
        tag: "Design systems",
        description:
          "Component Libraries und Patterns mit Fokus auf Klarheit, Accessibility und konsistente Interaktion.",
        href: "",
      },
      {
        name: "Motion Studies",
        tag: "Prototype",
        description:
          "Kleine Experimente zu Scroll-Storytelling, Micro-Interactions und räumlichen UI-Metaphern.",
        href: "",
      },
    ],
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
