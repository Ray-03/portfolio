import type { Dictionary } from "./en";
import { siteConfig } from "@/lib/site";

export const id: Dictionary = {
  meta: {
    title: "Richard Rinaldy | Engineer React & Next.js, Indonesia",
    description:
      "Richard Rinaldy, Full-Stack & Front-End engineer di Tangerang. React, Next.js, TypeScript, dan SEO terukur untuk produk di Singapura, Taiwan, dan Indonesia.",
  },
  apps: {
    portfolio: "Portofolio",
    chatbot: "Tanya AI",
    interests: "Minat",
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "Email",
    contact: "Kontak",
  },
  hero: {
    tagline:
      `Engineer React & Next.js di Tangerang — SEO dan skala untuk Singapura, Taiwan, dan Indonesia sejak ${siteConfig.careerStartYear}.`,
    scrollHint: "Geser untuk masuk",
  },
  shell: {
    proof: "Bukti terpilih",
    about: "Tentang",
    exploreCodex: "Buka Kodeks",
    classified: "Terklasifikasi",
  },
  about: {
    role: "Full-Stack & Front-End Software Engineer",
    lead:
      "Saya Richard Rinaldy, Full-Stack Software Engineer di Tangerang. Saya mengirim produk React dan Next.js, men-scale sistem volume tinggi, dan mengubah SEO jadi traffic yang terukur — kerja di Singapura, Taiwan, dan Indonesia.",
    hireKicker: "Terbuka untuk peran full-time",
    contactEmail: "Email",
    contactLinkedIn: "LinkedIn",
    skillsLabel: "Skill",
    educationLabel: "Pendidikan",
    education: "S1 Computer Science · Binus University · IPK 3.71",
    skills: {
      frontend: {
        label: "Front-End",
        detail: "React · Next.js · TypeScript · Tailwind · Zustand · React Query",
      },
      seo: {
        label: "SEO & i18n",
        detail: "JSON-LD · Merchant Center · locale · Lighthouse · GTM",
      },
      fullstack: {
        label: "Full-Stack",
        detail: "Node.js · NestJS · Python · REST APIs",
      },
      systems: {
        label: "Sistem",
        detail: "PostgreSQL · Elasticsearch · Ceph · MySQL",
      },
      cloud: {
        label: "Cloud",
        detail: "AWS · GCP · Docker · Cloud Run",
      },
    },
    credentials: [
      {
        label: "Sertifikasi",
        value: "AWS Certified Cloud Practitioner · valid s/d Feb 2029",
      },
      {
        label: "Penghargaan",
        value: "Juara 1 — Start On: Hackathon 2021",
      },
    ],
  },
  chatbot: {
    title: "Tanya AI",
    back: "Beranda",
    lead: "Buka sesi terminal dengan asisten Richard — tanya soal kerja, stack, atau hobinya seperti ChatGPT.",
    placeholder: "tanya soal kerja Richard…",
    send: "enter",
    host: "visitor@richard-rinaldy",
    path: "~/ask",
    prompt: "visitor@richard:~$",
    boot: [
      "Ask AI v1.0 — asisten portofolio Richard Rinaldy",
      "Jawaban berbasis data karya yang sudah di-ship. Ketik pertanyaan atau jalankan saran.",
    ],
    suggestionsLabel: "# perintah yang disarankan",
    thinking: "berpikir…",
    hint: "enter untuk kirim · esc untuk stop streaming",
    suggestions: [
      "Apa keahlian utama Richard di Front-End?",
      "Bagaimana Richard meningkatkan SEO di Trainge?",
      "Apa saja hobi dan minat Richard di luar koding?",
    ],
    error:
      "Ada yang tidak beres, mungkin asisten ini belum dikonfigurasi. Silakan hubungi Richard langsung lewat email.",
    rateLimit:
      "Terlalu banyak pertanyaan dari jaringan ini. Tunggu sebentar, lalu tanya lagi soal portofolio Richard.",
    rejected:
      "Permintaan ditolak. Tanya hanya soal kerja, stack, atau latar belakang Richard.",
  },
  interests: {
    title: "Minat",
    back: "Beranda",
    lead: "Beberapa hal di luar ngoding.",
    tabs: {
      photography: "Fotografi",
      music: "Musik",
      travel: "Travel",
      fitness: "Fitness & Tech",
    },
    photography: {
      intro:
        "Fotografi landscape — setting kamera manual, RAW capture, dan framing yang luas dan tenang.",
      photos: [
        {
          alt: "Punggung gunung saat matahari terbit",
          src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
        },
        {
          alt: "Danau alpine tenang memantulkan puncak gunung",
          src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
        },
        {
          alt: "Jalan membelah hutan yang sepi",
          src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
        },
        {
          alt: "Deretan pegunungan saat senja",
          src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
        },
        {
          alt: "Lembah luas di bawah langit terbuka",
          src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
        },
        {
          alt: "Golden hour di atas danau gunung",
          src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      placeholderNote: "Contoh foto dulu — foto asli menyusul.",
    },
    music: {
      intro: "Kebanyakan dengar instrumental dan scoring sinematik saat kerja.",
      tracks: [
        { title: "Mix fokus sinematik", mood: "Sinematik", href: "" },
        { title: "Set instrumental larut malam", mood: "Instrumental", href: "" },
        { title: "Musik ambient buat build", mood: "Ambient", href: "" },
      ],
      placeholderNote: "Track placeholder — link asli menyusul.",
    },
    travel: {
      intro: "Trip ke Eropa dan Asia, suka juga sama sejarah di balik tempatnya.",
      trips: [
        {
          place: "Prancis",
          region: "Eropa",
          note: "Kota, pedesaan, dan sejarah berabad-abad.",
        },
        {
          place: "Swiss",
          region: "Eropa",
          note: "Kota kecil pegunungan Alpen dan pemandangan tenang.",
        },
        {
          place: "Korea Selatan",
          region: "Asia",
          note: "Kota modern berdampingan dengan istana lama.",
        },
        {
          place: "Jepang",
          region: "Asia",
          note: "Kuil, musim, dan desain yang dipikirkan matang.",
        },
        {
          place: "Italia",
          region: "Eropa",
          note: "Sejarah kuno menyatu di jalanan sehari-hari.",
        },
      ],
    },
    fitness: {
      intro: "Membangun hal lain di luar layar juga — satu part PC, satu set latihan.",
      pcBuildTitle: "Custom PC Build",
      pcBuild: [
        { label: "Case", value: "Lian Li (model persis menyusul)" },
        {
          label: "Cooling",
          value: "Liquid cooling be quiet! (model persis menyusul)",
        },
        {
          label: "Fokus",
          value: "Build yang tenang, cable management rapi, thermal stabil.",
        },
      ],
      trainingTitle: "Filosofi Latihan",
      trainingBody:
        "Ikut rutin Push-Pull-Legs (PPL) — konsisten dibanding intens, progres bertahap.",
    },
  },
  portfolio: {
    title: "Portofolio",
    back: "Beranda",
    lead:
      "Studi kasus React, Next.js, SEO, dan sistem skala tinggi — dikirim untuk tim di Singapura, Taiwan, dan Indonesia.",
    openProject: "Buka proyek",
    impactLabel: "Dampak",
    stackLabel: "Stack",
    sections: {
      problem: "Masalah",
      role: "Peran",
      solution: "Solusi",
      result: "Hasil",
      proof: "Bukti",
    },
    categories: {
      all: "Semua",
      frontend: "Front-End",
      fullstack: "Full-Stack",
      data: "Data & Analytics",
    },
    projects: [
      {
        name: "Market Capitalization View",
        company: "PropertyLimBrothers · Singapura",
        tag: "React · Next.js · Analytics",
        category: "data",
        description:
          "Antarmuka analitik data interaktif untuk tren pasar dan harga properti Singapura.",
        impact: "Memangkas waktu riset pengguna hingga 30%.",
        stack: "React.js, Next.js, Data Analytics",
        href: "",
        relatedSkills: ["frontend"],
        problem:
          "Analis membandingkan harga properti Singapura di banyak tampilan, jadi riset memakan waktu. Tampilan pasar harus tetap cepat di produk React dan Next.js yang sudah ada.",
        role:
          "Memegang Market Capitalization View: filter, state perbandingan, dan layout analis. Definisi metrik dikerjakan bersama tim Singapura.",
        solution:
          "Membangun satu permukaan analitik untuk tren dan harga, menahan filter serta perbandingan di satu tampilan, lalu mengirimnya dengan React dan Next.js.",
        result: "Waktu riset pengguna turun hingga 30%.",
        proof:
          "Produk internal ini tidak punya URL publik. Angka di atas adalah hasil yang boleh dibagikan.",
      },
      {
        name: "Arsitektur SEO & i18n",
        company: "Trainge · Taiwan",
        tag: "Next.js · SEO · i18n",
        category: "frontend",
        description:
          "Pembenahan arsitektur SEO, integrasi Google Merchant Center, multi-language (i18n), dan kalender dinamis.",
        impact:
          "Lighthouse SEO 60 → 90; produk terindeks Google Merchant naik 2.5× (1.400 → ~3.500).",
        stack: "Next.js, JSON-LD, i18n, Tailwind CSS",
        href: "",
        relatedSkills: ["seo", "frontend"],
        problem:
          "Pencarian dan feed produk sulit ditemukan lintas bahasa. Lighthouse SEO berada di 60, dan Merchant Center mengindeks sekitar 1.400 produk.",
        role:
          "Memegang arsitektur SEO, JSON-LD, dan routing i18n, serta mengerjakan kalender penjadwalan dinamis bersama tim produk.",
        solution:
          "Membangun ulang metadata dan hreflang, menambahkan JSON-LD, menghubungkan Google Merchant Center, dan mengirim kalender di Next.js.",
        result:
          "Lighthouse SEO naik dari 60 ke 90. Produk terindeks bertambah dari sekitar 1.400 menjadi sekitar 3.500.",
        proof:
          "Angka-angka ini adalah hasil terukur yang boleh dibagikan. Detail lebih lanjut ada dalam percakapan.",
      },
      {
        name: "Sistem Transaksi Skala Tinggi & SEO",
        company: "Shopee · Indonesia",
        tag: "Node.js · Storage · Search",
        category: "fullstack",
        description:
          "Pengembangan dan penskalaan sistem transaksi berkapasitas tinggi serta optimasi pencarian organik.",
        impact:
          "~14.000 operasi harian di Ceph Storage; SEO 45 → 92; +35% organic traffic dalam 3 bulan.",
        stack: "Node.js, Python, Ceph, PostgreSQL, Elasticsearch",
        href: "",
        relatedSkills: ["fullstack", "systems", "seo"],
        problem:
          "Transaksi harian harus andal pada volume tinggi, sementara pencarian organik lemah. Lighthouse SEO mulai di 45.",
        role:
          "Memegang penskalaan jalur transaksi dan perbaikan SEO di permukaan produk yang sama, bersama tim platform untuk storage dan search.",
        solution:
          "Menskalakan sistem transaksi di penyimpanan terdistribusi Ceph, memakai PostgreSQL dan Elasticsearch sesuai beban, lalu menerapkan praktik SEO yang sama di front end.",
        result:
          "Sekitar 14.000 operasi harian tetap andal. SEO naik dari 45 ke 92, dan traffic organik bertambah 35% dalam 3 bulan.",
        proof:
          "Pekerjaan ini bukan repositori publik pribadi. Angka di atas adalah hasil yang boleh dibagikan.",
      },
    ],
  },
  notFound: {
    kicker: "HTTP 404",
    title: "Not Found",
    lead: "URL yang diminta tidak ditemukan di server ini. Tidak ada route yang cocok.",
    home: "Beranda",
    pathLabel: "GET",
  },
  a11y: {
    switchToLight: "Ganti ke mode terang",
    switchToDark: "Ganti ke mode gelap",
    language: "Bahasa",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    close: "Tutup",
    theme: "Tema",
    skipToContent: "Loncat ke konten",
  },
};
