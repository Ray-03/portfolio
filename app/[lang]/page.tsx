import { HomeHero } from "@/components/home-hero";
import { SiteToolbar } from "@/components/site-toolbar";
import { TabletHome } from "@/components/tablet-home";

export default function Home() {
  return (
    <main className="w-full">
      <SiteToolbar />
      <HomeHero>
        <TabletHome />
      </HomeHero>
    </main>
  );
}
