import type { MetadataRoute } from "next";
import { locales, type Locale } from "@/lib/i18n/config";
import { workSlugs } from "@/lib/portfolio/work-slugs";
import { getLocaleUrl, getSiteUrl } from "@/lib/seo";

function languageAlternates(path: string, siteUrl: string) {
  const urlFor = (locale: Locale) => `${getLocaleUrl(locale, siteUrl)}${path}`;
  return {
    en: urlFor("en"),
    id: urlFor("id"),
    "zh-CN": urlFor("zh"),
    de: urlFor("de"),
    "x-default": urlFor("en"),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const paths = ["", ...workSlugs.map((slug) => `/work/${slug}`)];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${getLocaleUrl(locale, siteUrl)}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? (locale === "en" ? 1 : 0.8) : 0.7,
      alternates: { languages: languageAlternates(path, siteUrl) },
    })),
  );
}
