import {
  localeHtmlLang,
  type Locale,
} from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";

export const ogLocale: Record<Locale, string> = {
  en: "en_US",
  id: "id_ID",
  zh: "zh_CN",
  de: "de_DE",
};

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NODE_ENV === "production") {
    console.warn(
      "NEXT_PUBLIC_SITE_URL is not set; canonical URLs will fall back to localhost.",
    );
  }
  return "http://localhost:3000";
}

export function getLocaleUrl(locale: Locale, siteUrl = getSiteUrl()) {
  return `${siteUrl}/${locale}`;
}

export function getLanguageAlternates(siteUrl = getSiteUrl()) {
  return {
    en: getLocaleUrl("en", siteUrl),
    id: getLocaleUrl("id", siteUrl),
    "zh-CN": getLocaleUrl("zh", siteUrl),
    de: getLocaleUrl("de", siteUrl),
    "x-default": getLocaleUrl("en", siteUrl),
  };
}

export function getWorkUrl(locale: Locale, slug: string, siteUrl = getSiteUrl()) {
  return `${getLocaleUrl(locale, siteUrl)}/work/${slug}`;
}

export function getWorkLanguageAlternates(slug: string, siteUrl = getSiteUrl()) {
  return {
    en: getWorkUrl("en", slug, siteUrl),
    id: getWorkUrl("id", slug, siteUrl),
    "zh-CN": getWorkUrl("zh", slug, siteUrl),
    de: getWorkUrl("de", slug, siteUrl),
    "x-default": getWorkUrl("en", slug, siteUrl),
  };
}

export function buildPersonJsonLd(locale: Locale, description: string) {
  const siteUrl = getSiteUrl();
  const pageUrl = getLocaleUrl(locale, siteUrl);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: siteConfig.name,
        url: pageUrl,
        jobTitle: siteConfig.title,
        description,
        email: siteConfig.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Tangerang",
          addressCountry: "ID",
        },
        sameAs: [siteConfig.github, siteConfig.linkedin],
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "SEO",
          "Node.js",
          "Python",
          "AWS",
          "i18n",
        ],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Binus University",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: `${siteConfig.name} Portfolio`,
        url: siteUrl,
        inLanguage: localeHtmlLang[locale],
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#profile`,
        url: pageUrl,
        inLanguage: localeHtmlLang[locale],
        mainEntity: { "@id": `${siteUrl}/#person` },
        about: { "@id": `${siteUrl}/#person` },
      },
    ],
  };
}

export function buildWorkJsonLd(input: {
  locale: Locale;
  slug: string;
  name: string;
  description: string;
}) {
  const siteUrl = getSiteUrl();
  const pageUrl = getWorkUrl(input.locale, input.slug, siteUrl);

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${pageUrl}#work`,
    name: input.name,
    description: input.description,
    url: pageUrl,
    inLanguage: localeHtmlLang[input.locale],
    author: { "@id": `${siteUrl}/#person` },
  };
}
