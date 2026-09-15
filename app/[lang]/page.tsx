import { HeroScroll } from "@/components/hero-scroll";
import { SiteToolbar } from "@/components/site-toolbar";
import { ThemeFoundation } from "@/components/theme-foundation";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <main className="w-full">
      <SiteToolbar />
      <HeroScroll>
        <ThemeFoundation dict={dict} />
      </HeroScroll>
    </main>
  );
}
