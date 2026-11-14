import type { Dictionary } from "./en";
import { siteConfig } from "@/lib/site";

export const de: Dictionary = {
  meta: {
    title: "Richard Rinaldy | React- & Next.js-Engineer, Indonesien",
    description:
      "Richard Rinaldy ist Full-Stack- und Front-End-Engineer in Tangerang. React, Next.js, TypeScript und messbare SEO für Singapur, Taiwan und Indonesien.",
  },
  apps: {
    portfolio: "Portfolio",
    chatbot: "KI fragen",
    interests: "Interessen",
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "E-Mail",
    contact: "Kontakt",
  },
  hero: {
    tagline:
      `React- & Next.js-Engineer in Tangerang — SEO und Scale für Singapur, Taiwan und Indonesien seit ${siteConfig.careerStartYear}.`,
    scrollHint: "Scrollen zum Eintreten",
  },
  shell: {
    proof: "Ausgewählte Belege",
    about: "Über",
    exploreCodex: "Kodex öffnen",
    classified: "Verschlusssache",
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
      frontend: { label: "Front-End", detail: "React · Next.js · TypeScript" },
      seo: { label: "SEO & i18n", detail: "Lighthouse · Merchant · Locales" },
      fullstack: { label: "Full-Stack", detail: "Node.js · Python" },
      systems: { label: "Systeme", detail: "Scale · Storage · Search" },
      cloud: { label: "Cloud", detail: "AWS" },
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
    back: "Home",
    lead: "Frag Richards KI-Assistenten nach seiner Erfahrung, seinem Stack oder seinen Interessen.",
    placeholder: "Frag nach Richards Arbeit...",
    send: "Senden",
    suggestions: [
      "Was sind Richards wichtigste Front-End-Fähigkeiten?",
      "Wie hat Richard die SEO bei Trainge verbessert?",
      "Welche Hobbys hat Richard außerhalb des Codings?",
    ],
    error:
      "Etwas ist schiefgelaufen — der Assistent ist eventuell noch nicht konfiguriert. Bitte kontaktiere Richard direkt per E-Mail.",
  },
  interests: {
    title: "Interessen",
    back: "Home",
    lead: "Ein paar Dinge neben dem Programmieren.",
    tabs: {
      photography: "Fotografie",
      music: "Musik",
      travel: "Reisen",
      fitness: "Fitness & Technik",
    },
    photography: {
      intro:
        "Landschaftsfotografie — manuelle Kameraeinstellungen, RAW-Aufnahmen und weite, ruhige Bildkomposition.",
      photos: [
        {
          alt: "Bergkamm im Sonnenaufgang",
          src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
        },
        {
          alt: "Ruhiger Alpensee spiegelt die Gipfel",
          src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
        },
        {
          alt: "Straße durch einen ruhigen Wald",
          src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
        },
        {
          alt: "Gestaffelte Bergketten in der Dämmerung",
          src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
        },
        {
          alt: "Weites Tal unter offenem Himmel",
          src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
        },
        {
          alt: "Goldene Stunde über einem Bergsee",
          src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      placeholderNote: "Vorerst Beispielfotos — echte Fotos folgen.",
    },
    music: {
      intro: "Beim Arbeiten meist instrumentale und filmische Arrangements.",
      tracks: [
        { title: "Cinematic Fokus-Mix", mood: "Cinematic", href: "" },
        { title: "Instrumentales Spät-Set", mood: "Instrumental", href: "" },
        { title: "Ambient-Musik zum Bauen", mood: "Ambient", href: "" },
      ],
      placeholderNote: "Platzhalter-Tracks — echte Links folgen.",
    },
    travel: {
      intro:
        "Reisen durch Europa und Asien, mit einer Schwäche für die Geschichte hinter jedem Ort.",
      trips: [
        {
          place: "Frankreich",
          region: "Europa",
          note: "Städte, Landschaften und Jahrhunderte an Geschichte.",
        },
        {
          place: "Schweiz",
          region: "Europa",
          note: "Alpine Orte und ruhige Bergblicke.",
        },
        {
          place: "Südkorea",
          region: "Asien",
          note: "Moderne Städte neben alten Palästen.",
        },
        {
          place: "Japan",
          region: "Asien",
          note: "Tempel, Jahreszeiten und durchdachtes Design.",
        },
        {
          place: "Italien",
          region: "Europa",
          note: "Antike Geschichte mitten im Alltag.",
        },
      ],
    },
    fitness: {
      intro:
        "Auch abseits des Bildschirms am Bauen — ein PC-Teil, ein Satz nach dem anderen.",
      pcBuildTitle: "Custom-PC-Build",
      pcBuild: [
        { label: "Gehäuse", value: "Lian Li (genaues Modell folgt)" },
        {
          label: "Kühlung",
          value: "be quiet! Wasserkühlung (genaues Modell folgt)",
        },
        {
          label: "Fokus",
          value: "Leise, saubere Builds mit verlässlichen Temperaturen.",
        },
      ],
      trainingTitle: "Trainingsphilosophie",
      trainingBody:
        "Folgt einer Push-Pull-Legs-(PPL)-Routine — Konstanz statt Intensität, stetiger Fortschritt.",
    },
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
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    close: "Schließen",
    theme: "Theme",
    skipToContent: "Zum Inhalt springen",
  },
};
