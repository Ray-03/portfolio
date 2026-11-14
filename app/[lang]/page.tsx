import { notFound } from "next/navigation";
import { HomeView } from "@/components/portfolio/home-view";
import { SiteShell } from "@/components/portfolio/site-shell";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { composeHome } from "@/lib/portfolio/compose-home";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <SiteShell>
      <HomeView content={composeHome(dict, lang)} />
    </SiteShell>
  );
}
