import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/portfolio/site-shell";
import { WorkArticle } from "@/components/portfolio/work-article";
import { hasLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { composeWork } from "@/lib/portfolio/compose-work";
import { isWorkSlug, workSlugs } from "@/lib/portfolio/work-slugs";
import {
  buildWorkJsonLd,
  getSiteUrl,
  getWorkLanguageAlternates,
  getWorkUrl,
  ogLocale,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    workSlugs.map((slug) => ({ lang, slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isWorkSlug(slug)) return {};

  const dict = await getDictionary(lang);
  const work = composeWork(dict, lang, slug);
  const siteUrl = getSiteUrl();
  const pageUrl = getWorkUrl(lang, slug, siteUrl);
  const title = `${work.name} | ${siteConfig.name}`;

  return {
    title,
    description: work.description,
    alternates: {
      canonical: pageUrl,
      languages: getWorkLanguageAlternates(slug, siteUrl),
    },
    openGraph: {
      type: "article",
      url: pageUrl,
      title,
      description: work.description,
      locale: ogLocale[lang],
      siteName: `${siteConfig.name} Portfolio`,
    },
  };
}

export default async function WorkPage({
  params,
}: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isWorkSlug(slug)) notFound();

  const dict = await getDictionary(lang);
  const work = composeWork(dict, lang, slug);

  return (
    <SiteShell>
      <JsonLd
        data={buildWorkJsonLd({
          locale: lang,
          slug,
          name: work.name,
          description: work.description,
        })}
      />
      <WorkArticle content={work} />
    </SiteShell>
  );
}
