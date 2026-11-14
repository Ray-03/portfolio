import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 flex flex-wrap items-baseline justify-between gap-3 border-t border-border py-6 text-sm text-muted-foreground">
      <p>{siteConfig.location}</p>
      <a
        href={`mailto:${siteConfig.email}`}
        className="text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
      >
        {siteConfig.email}
      </a>
    </footer>
  );
}
