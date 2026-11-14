import { siteConfig } from "@/lib/site";

export const en = {
  meta: {
    title: "Richard Rinaldy | React & Next.js Engineer, Indonesia",
    description:
      "Richard Rinaldy is a Full-Stack & Front-End engineer in Tangerang. React, Next.js, TypeScript, and measurable SEO across Singapore, Taiwan, and Indonesia.",
  },
  apps: {
    portfolio: "Portfolio",
    chatbot: "Ask AI",
    interests: "Interests",
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "Email",
    contact: "Contact",
  },
  hero: {
    tagline:
      `React & Next.js engineer in Tangerang — SEO and scale for Singapore, Taiwan, and Indonesia since ${siteConfig.careerStartYear}.`,
    scrollHint: "Scroll to enter",
  },
  shell: {
    proof: "Selected proof",
    about: "About",
    exploreCodex: "Explore Codex",
    classified: "Classified",
  },
  about: {
    role: "Full-Stack & Front-End Software Engineer",
    lead:
      "I'm Richard Rinaldy, a Full-Stack Software Engineer in Tangerang. I ship React and Next.js products, scale high-volume systems, and turn SEO into traffic you can measure — work across Singapore, Taiwan, and Indonesia.",
    hireKicker: "Open to full-time roles",
    contactEmail: "Email",
    contactLinkedIn: "LinkedIn",
    skillsLabel: "Skills",
    educationLabel: "Education",
    education: "B.S. Computer Science · Binus University · GPA 3.71",
    skills: {
      frontend: {
        label: "Front-End",
        detail: "React · Next.js · TypeScript · Tailwind · Zustand · React Query",
      },
      seo: {
        label: "SEO & i18n",
        detail: "JSON-LD · Merchant Center · locales · Lighthouse · GTM",
      },
      fullstack: {
        label: "Full-Stack",
        detail: "Node.js · NestJS · Python · REST APIs",
      },
      systems: {
        label: "Systems",
        detail: "PostgreSQL · Elasticsearch · Ceph · MySQL",
      },
      cloud: {
        label: "Cloud",
        detail: "AWS · GCP · Docker · Cloud Run",
      },
    },
    credentials: [
      {
        label: "Certification",
        value: "AWS Certified Cloud Practitioner · valid until Feb 2029",
      },
      {
        label: "Award",
        value: "1st Place — Start On: Hackathon 2021",
      },
    ],
  },
  chatbot: {
    title: "Ask AI",
    back: "Home",
    lead: "Open a terminal session with Richard's assistant — ask about his work, stack, or interests like ChatGPT.",
    placeholder: "ask about Richard's work…",
    send: "enter",
    host: "visitor@richard-rinaldy",
    path: "~/ask",
    prompt: "visitor@richard:~$",
    boot: [
      "Ask AI v1.0 — portfolio assistant for Richard Rinaldy",
      "Grounded in shipped work only. Type a question or run a suggestion.",
    ],
    suggestionsLabel: "# suggested commands",
    thinking: "thinking…",
    hint: "enter to send · esc to stop streaming",
    suggestions: [
      "What are Richard's main Front-End skills?",
      "How did Richard improve SEO at Trainge?",
      "What are Richard's hobbies outside coding?",
    ],
    error:
      "Something went wrong, and the assistant might not be configured yet. Please reach out to Richard directly by email.",
    rateLimit:
      "Too many questions from this network. Wait a minute, then ask about Richard's portfolio again.",
    rejected:
      "That request was blocked. Ask about Richard's work, stack, or background only.",
    disabled:
      "Ask AI is paused right now. Email or LinkedIn still reach Richard directly.",
  },
  interests: {
    title: "Interests",
    back: "Home",
    lead: "A few things outside of shipping code.",
    tabs: {
      photography: "Photography",
      music: "Music",
      travel: "Travel",
      fitness: "Fitness & Tech",
    },
    photography: {
      intro:
        "Landscape photography — manual camera settings, RAW capture, and wide, quiet framing.",
      photos: [
        {
          alt: "Mountain ridge at sunrise",
          src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
        },
        {
          alt: "Still alpine lake reflecting the peaks",
          src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
        },
        {
          alt: "Road cutting through a quiet forest",
          src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
        },
        {
          alt: "Layered mountain range at dusk",
          src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
        },
        {
          alt: "Sweeping valley under an open sky",
          src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
        },
        {
          alt: "Golden hour over a mountain lake",
          src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      placeholderNote: "Sample shots for now — real frames coming soon.",
    },
    music: {
      intro: "Mostly instrumental and cinematic arrangements while working.",
      tracks: [
        { title: "Cinematic focus mix", mood: "Cinematic", href: "" },
        { title: "Late-night instrumental set", mood: "Instrumental", href: "" },
        { title: "Ambient build music", mood: "Ambient", href: "" },
      ],
      placeholderNote: "Placeholder tracks — real links coming soon.",
    },
    travel: {
      intro:
        "Trips across Europe and Asia, with a soft spot for the history behind each place.",
      trips: [
        {
          place: "France",
          region: "Europe",
          note: "Cities, countryside, and centuries of history.",
        },
        {
          place: "Switzerland",
          region: "Europe",
          note: "Alpine towns and quiet mountain views.",
        },
        {
          place: "South Korea",
          region: "Asia",
          note: "Modern cities alongside old palaces.",
        },
        {
          place: "Japan",
          region: "Asia",
          note: "Temples, seasons, and thoughtful design.",
        },
        {
          place: "Italy",
          region: "Europe",
          note: "Ancient history layered into everyday streets.",
        },
      ],
    },
    fitness: {
      intro:
        "Building things off-screen too — one desktop part at a time, one set at a time.",
      pcBuildTitle: "Custom PC Build",
      pcBuild: [
        { label: "Case", value: "Lian Li (exact model to be added)" },
        {
          label: "Cooling",
          value: "be quiet! liquid cooling (exact model to be added)",
        },
        {
          label: "Focus",
          value: "Quiet, clean-cable builds with reliable thermals.",
        },
      ],
      trainingTitle: "Training Philosophy",
      trainingBody:
        "Follows a Push-Pull-Legs (PPL) routine — consistency over intensity, built around steady progress.",
    },
  },
  portfolio: {
    title: "Portfolio",
    back: "Home",
    lead: "Case studies in React, Next.js, SEO, and high-scale systems — shipped for teams in Singapore, Taiwan, and Indonesia.",
    openProject: "Open project",
    impactLabel: "Impact",
    stackLabel: "Stack",
    sections: {
      problem: "Problem",
      role: "Role",
      solution: "Solution",
      result: "Result",
      proof: "Proof",
    },
    categories: {
      all: "All",
      frontend: "Front-End",
      fullstack: "Full-Stack",
      data: "Data & Analytics",
    },
    projects: [
      {
        name: "Market Capitalization View",
        company: "PropertyLimBrothers · Singapore",
        tag: "React · Next.js · Analytics",
        category: "data",
        description:
          "Interactive data analytics interface for Singapore property market trends and pricing.",
        impact: "Cut user research time by up to 30%.",
        stack: "React.js, Next.js, Data Analytics",
        href: "",
        relatedSkills: ["frontend"],
        problem:
          "Analysts compared Singapore property prices across scattered views, so research took too long. The market view had to stay fast inside the existing React and Next.js product.",
        role:
          "Owned the interactive Market Capitalization View: filters, comparison states, and the analyst layout. Defined the metrics with the Singapore team.",
        solution:
          "Built one analytics surface for trends and pricing, kept filters and comparisons in a single view, and shipped the interface in React and Next.js.",
        result: "Cut user research time by up to 30%.",
        proof:
          "There is no public URL for this internal product. The figure above is the outcome that can be shared.",
      },
      {
        name: "SEO & i18n Architecture",
        company: "Trainge · Taiwan",
        tag: "Next.js · SEO · i18n",
        category: "frontend",
        description:
          "SEO architecture overhaul, Google Merchant Center integration, multi-language (i18n), and a dynamic calendar system.",
        impact:
          "Lighthouse SEO 60 → 90; Google Merchant indexed products 2.5× (1,400 → ~3,500).",
        stack: "Next.js, JSON-LD, i18n, Tailwind CSS",
        href: "",
        relatedSkills: ["seo", "frontend"],
        problem:
          "Search and product feeds were hard to discover across languages. Lighthouse SEO sat at 60, and Merchant Center indexed about 1,400 products.",
        role:
          "Owned the SEO architecture, JSON-LD, and i18n routing, and worked with the product team on a dynamic scheduling calendar.",
        solution:
          "Rebuilt metadata and hreflang, added JSON-LD structured data, connected Google Merchant Center, and shipped the calendar in Next.js.",
        result:
          "Lighthouse SEO moved from 60 to 90. Indexed products grew from about 1,400 to about 3,500.",
        proof:
          "These are the measured outcomes that can be shared publicly. Further detail is available in conversation.",
      },
      {
        name: "High-Scale Transactions & SEO",
        company: "Shopee · Indonesia",
        tag: "Node.js · Storage · Search",
        category: "fullstack",
        description:
          "Built and scaled high-capacity transaction systems with organic search optimization.",
        impact:
          "~14,000 daily operations on Ceph Storage; SEO 45 → 92; +35% organic traffic in 3 months.",
        stack: "Node.js, Python, Ceph, PostgreSQL, Elasticsearch",
        href: "",
        relatedSkills: ["fullstack", "systems", "seo"],
        problem:
          "Daily transactions had to stay reliable at high volume, and organic search was weak. Lighthouse SEO started at 45.",
        role:
          "Owned scaling the transaction path and the SEO improvements on the same product surface, with the platform team on storage and search.",
        solution:
          "Scaled the transaction system on Ceph distributed storage, used PostgreSQL and Elasticsearch where the workload needed them, and applied the same SEO practice on the front end.",
        result:
          "About 14,000 daily operations held reliably. SEO moved from 45 to 92, and organic traffic rose 35% within 3 months.",
        proof:
          "This work is not a public personal repository. The figures above are the outcomes that can be shared.",
      },
    ],
  },
  notFound: {
    kicker: "HTTP 404",
    title: "Not Found",
    lead: "The requested URL was not found on this server. No matching route.",
    home: "Home",
    pathLabel: "GET",
  },
  a11y: {
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    close: "Close",
    theme: "Theme",
    skipToContent: "Skip to content",
  },
};

export type Dictionary = typeof en;
