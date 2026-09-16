import type { Dictionary } from "./en";

export const id: Dictionary = {
  meta: {
    title: "Portofolio",
    description: "Fondasi tema untuk portofolio.",
  },
  apps: {
    about: "Tentang Saya",
    portfolio: "Portofolio",
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "Email",
    contact: "Kontak",
  },
  hero: {
    tagline:
      "Membangun antarmuka React & Next.js berperforma tinggi dengan motion yang jelas dan craft yang rapi.",
  },
  about: {
    title: "Tentang Saya",
    role: "Front-End Software Engineer",
    lead:
      "Saya membangun antarmuka yang rapi dan performa — dari landing dengan motion hingga UI produk yang jelas dan terarah.",
    body:
      "Saya peduli pada tipografi, detail interaksi, dan hasil yang tetap nyaman di berbagai perangkat. Di luar fitur, biasanya saya menyempurnakan animasi, aksesibilitas, atau momen kecil yang membuat produk terasa finished.",
    back: "Beranda",
    close: "Tutup",
  },
  portfolio: {
    title: "Portofolio",
    back: "Beranda",
    lead: "Karya dan eksperimen terpilih — antarmuka, motion, dan craft front-end.",
    openProject: "Buka proyek",
    projects: [
      {
        name: "Portofolio Pribadi",
        tag: "Next.js · Motion",
        description:
          "Pengalaman tablet berbasis scroll dengan tema, i18n, dan home bergaya OS untuk navigasi.",
        href: "https://github.com/Ray-03",
      },
      {
        name: "Sistem UI produk",
        tag: "Design systems",
        description:
          "Library komponen dan pola yang fokus pada kejelasan, aksesibilitas, dan interaksi konsisten.",
        href: "",
      },
      {
        name: "Studi motion",
        tag: "Prototype",
        description:
          "Eksperimen kecil seputar scroll storytelling, mikrointeraksi, dan metafora UI spasial.",
        href: "",
      },
    ],
  },
  theme: {
    eyebrow: "Fondasi tema",
    title: "Primary · Secondary · Terang / Gelap",
    description:
      "Primary teal dan secondary amber, terhubung lewat variabel CSS shadcn. Ganti mode untuk melihat kedua tema.",
    tokenLabel: "Token",
    tokens: {
      primary: "Primary",
      secondary: "Secondary",
      accent: "Accent",
      muted: "Muted",
      card: "Card",
      destructive: "Destructive",
    },
    componentTitle: "Cek komponen",
    componentDescription:
      "Tombol dan badge memakai varian primary dan secondary.",
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
    switchToLight: "Ganti ke mode terang",
    switchToDark: "Ganti ke mode gelap",
    language: "Bahasa",
  },
};
