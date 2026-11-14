import type { Dictionary } from "./en";
import { siteConfig } from "@/lib/site";

export const de: Dictionary = {
  meta: {
    title: "Richard Rinaldy | React- & Next.js-Engineer, Indonesien",
    description:
      "Richard Rinaldy ist Full-Stack- und Front-End-Engineer in Tangerang. React, Next.js, TypeScript und messbare SEO für Singapur, Taiwan und Indonesien.",
  },
  apps: {
    github: "GitHub",
  },
  hero: {
    tagline:
      `React- & Next.js-Engineer in Tangerang — SEO und Scale für Singapur, Taiwan und Indonesien seit ${siteConfig.careerStartYear}.`,
  },
  shell: {
    proof: "Ausgewählte Belege",
    about: "Über",
    exploreCodex: "Projekte ansehen",
    classified: "Intern",
  },
  about: {
    role: "Full-Stack & Front-End Software Engineer",
    lead:
      "Ich bin Richard Rinaldy, Full-Stack Software Engineer in Tangerang. Ich liefere React- und Next.js-Produkte, skaliere hochvolumige Systeme und mache SEO zu messbarem Traffic — in Singapur, Taiwan und Indonesien.",
    hireKicker: "Offen für Vollzeitrollen",
    contactEmail: "E-Mail",
    contactLinkedIn: "LinkedIn",
    skillsLabel: "Skills",
    educationLabel: "Ausbildung",
    education: "B.S. Computer Science · Binus University · GPA 3.71",
    skills: {
      frontend: {
        label: "Front-End",
        detail: "React · Next.js · TypeScript · Tailwind · Zustand · React Query",
      },
      seo: {
        label: "SEO & i18n",
        detail: "JSON-LD · Merchant Center · Locales · Lighthouse · GTM",
      },
      fullstack: {
        label: "Full-Stack",
        detail: "Node.js · NestJS · Python · REST APIs",
      },
      systems: {
        label: "Systeme",
        detail: "PostgreSQL · Elasticsearch · Ceph · MySQL",
      },
      cloud: {
        label: "Cloud",
        detail: "AWS · GCP · Docker · Cloud Run",
      },
    },
    credentials: [
      {
        label: "Zertifizierung",
        value: "AWS Certified Cloud Practitioner · gültig bis Feb 2029",
      },
      {
        label: "Auszeichnung",
        value: "1. Platz — Start On: Hackathon 2021",
      },
    ],
  },
  chatbot: {
    title: "KI fragen",
    lead: "Öffne eine Terminal-Sitzung mit Richards Assistenten — frag nach Arbeit, Stack oder Interessen wie bei ChatGPT.",
    placeholder: "frag nach Richards Arbeit…",
    send: "enter",
    host: "visitor@richard-rinaldy",
    path: "~/ask",
    prompt: "visitor@richard:~$",
    boot: [
      "Ask AI v1.0 — Portfolio-Assistent für Richard Rinaldy",
      "Antworten basieren nur auf gelieferter Arbeit. Tippe eine Frage oder starte einen Vorschlag.",
    ],
    suggestionsLabel: "# vorgeschlagene Befehle",
    thinking: "denkt…",
    hint: "enter zum Senden · esc zum Stoppen des Streams",
    suggestions: [
      "Was sind Richards wichtigste Front-End-Fähigkeiten?",
      "Wie hat Richard die SEO bei Trainge verbessert?",
      "Welche Hobbys hat Richard außerhalb des Codings?",
    ],
    error:
      "Etwas ist schiefgelaufen — der Assistent ist eventuell noch nicht konfiguriert. Bitte kontaktiere Richard direkt per E-Mail.",
    rateLimit:
      "Zu viele Anfragen aus diesem Netzwerk. Warte eine Minute und frag erneut zu Richards Portfolio.",
    rejected:
      "Anfrage blockiert. Frag nur nach Richards Arbeit, Stack oder Hintergrund.",
    disabled:
      "Ask AI ist gerade pausiert. Per E-Mail oder LinkedIn erreichst du Richard weiterhin.",
    budget:
      "Ask AI hat das heutige Site-Limit erreicht. Schau morgen wieder vorbei oder schreib Richard per E-Mail.",
  },
  portfolio: {
    title: "Portfolio",
    back: "Home",
    lead:
      "Case Studies zu React, Next.js, SEO und High-Scale-Systemen — für Teams in Singapur, Taiwan und Indonesien.",
    openProject: "Projekt öffnen",
    impactLabel: "Impact",
    stackLabel: "Stack",
    sections: {
      problem: "Problem",
      role: "Rolle",
      solution: "Lösung",
      result: "Ergebnis",
      proof: "Nachweis",
    },
    categories: {
      all: "Alle",
      frontend: "Front-End",
      fullstack: "Full-Stack",
      data: "Data & Analytics",
    },
    projects: [
      {
        name: "Market Capitalization View",
        company: "PropertyLimBrothers · Singapur",
        tag: "React · Next.js · Analytics",
        category: "data",
        description:
          "Interaktives Analytics-Interface für Immobilienmarkt-Trends und Preise in Singapur.",
        impact: "Recherchezeit der Nutzer um bis zu 30% reduziert.",
        stack: "React.js, Next.js, Data Analytics",
        href: "",
        relatedSkills: ["frontend"],
        problem:
          "Analysten verglichen Immobilienpreise in Singapur über verstreute Ansichten, die Recherche dauerte zu lange. Die Marktansicht musste im bestehenden React- und Next.js-Produkt schnell bleiben.",
        role:
          "Verantwortlich für die Market Capitalization View: Filter, Vergleichsstates und Analysten-Layout. Metriken mit dem Team in Singapur definiert.",
        solution:
          "Eine Analytics-Oberfläche für Trends und Preise gebaut, Filter und Vergleiche in einer Ansicht gehalten und in React und Next.js ausgeliefert.",
        result: "Recherchezeit der Nutzer um bis zu 30% gesenkt.",
        proof:
          "Für dieses interne Produkt gibt es keine öffentliche URL. Die Zahl oben ist das Ergebnis, das geteilt werden kann.",
      },
      {
        name: "SEO- & i18n-Architektur",
        company: "Trainge · Taiwan",
        tag: "Next.js · SEO · i18n",
        category: "frontend",
        description:
          "SEO-Architektur-Überarbeitung, Google Merchant Center, Mehrsprachigkeit (i18n) und dynamisches Kalendersystem.",
        impact:
          "Lighthouse SEO 60 → 90; Google-Merchant-indexierte Produkte 2,5× (1.400 → ~3.500).",
        stack: "Next.js, JSON-LD, i18n, Tailwind CSS",
        href: "",
        relatedSkills: ["seo", "frontend"],
        problem:
          "Suche und Produktfeeds waren über Sprachen hinweg schwer auffindbar. Lighthouse SEO lag bei 60, Merchant Center indexierte etwa 1.400 Produkte.",
        role:
          "Verantwortlich für SEO-Architektur, JSON-LD und i18n-Routing, gemeinsam mit dem Produktteam am dynamischen Terminkalender.",
        solution:
          "Metadata und hreflang neu aufgebaut, JSON-LD ergänzt, Google Merchant Center angebunden und den Kalender in Next.js ausgeliefert.",
        result:
          "Lighthouse SEO von 60 auf 90. Indexierte Produkte von etwa 1.400 auf etwa 3.500.",
        proof:
          "Das sind die messbaren Ergebnisse, die öffentlich geteilt werden können. Weitere Details im Gespräch.",
      },
      {
        name: "High-Scale-Transaktionen & SEO",
        company: "Shopee · Indonesien",
        tag: "Node.js · Storage · Search",
        category: "fullstack",
        description:
          "Aufbau und Skalierung hochkapazitiver Transaktionssysteme sowie Optimierung der organischen Suche.",
        impact:
          "~14.000 tägliche Operationen auf Ceph; SEO 45 → 92; +35% organischer Traffic in 3 Monaten.",
        stack: "Node.js, Python, Ceph, PostgreSQL, Elasticsearch",
        href: "",
        relatedSkills: ["fullstack", "systems", "seo"],
        problem:
          "Tägliche Transaktionen mussten bei hohem Volumen zuverlässig bleiben, und die organische Suche war schwach. Lighthouse SEO startete bei 45.",
        role:
          "Verantwortlich für die Skalierung des Transaktionspfads und die SEO-Verbesserung auf derselben Oberfläche, mit dem Plattformteam bei Storage und Search.",
        solution:
          "Das Transaktionssystem auf Ceph skaliert, PostgreSQL und Elasticsearch je nach Last eingesetzt und dieselbe SEO-Praxis im Front-End angewendet.",
        result:
          "Etwa 14.000 tägliche Operationen blieben zuverlässig. SEO von 45 auf 92, organischer Traffic +35% in 3 Monaten.",
        proof:
          "Diese Arbeit ist kein persönliches öffentliches Repository. Die Zahlen oben sind die Ergebnisse, die geteilt werden können.",
      },
    ],
  },
  notFound: {
    kicker: "HTTP 404",
    title: "Not Found",
    lead: "Die angeforderte URL wurde auf diesem Server nicht gefunden. Keine passende Route.",
    home: "Startseite",
    pathLabel: "GET",
  },
  a11y: {
    switchToLight: "Zum hellen Modus wechseln",
    switchToDark: "Zum dunklen Modus wechseln",
    language: "Sprache",
    skipToContent: "Zum Inhalt springen",
  },
};
