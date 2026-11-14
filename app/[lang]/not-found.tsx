import type { Metadata } from "next";
import { headers } from "next/headers";
import { MissingPage } from "@/components/portfolio/missing-page";
import { SiteShell } from "@/components/portfolio/site-shell";
import { hasLocale, defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `404 | ${siteConfig.name}`,
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? "";
  const segment = pathname.split("/").filter(Boolean)[0] ?? "";
  const locale = hasLocale(segment) ? segment : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <SiteShell>
      <MissingPage
        content={{
          kicker: dict.notFound.kicker,
          title: dict.notFound.title,
          lead: dict.notFound.lead,
          homeHref: `/${locale}`,
          homeLabel: dict.notFound.home,
          pathLabel: dict.notFound.pathLabel,
          pathname,
        }}
      />
    </SiteShell>
  );
}
