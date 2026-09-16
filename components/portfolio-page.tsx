"use client";

import { ExternalLink } from "lucide-react";
import { TabletAppPage } from "@/components/tablet-app-page";
import { useI18n } from "@/components/i18n/i18n-provider";

type PortfolioPageProps = {
  open: boolean;
  onBack: () => void;
};

export function PortfolioPage({ open, onBack }: PortfolioPageProps) {
  const { dict } = useI18n();
  const projects = dict.portfolio.projects;

  return (
    <TabletAppPage
      open={open}
      onBack={onBack}
      title={dict.portfolio.title}
      backLabel={dict.portfolio.back}
      titleId="portfolio-page-title"
    >
      <div className="mx-auto max-w-lg">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {dict.portfolio.lead}
        </p>

        <ul className="mt-8 space-y-4">
          {projects.map((project) => (
            <li key={project.name}>
              <article className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-primary">
                      {project.tag}
                    </p>
                  </div>
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      aria-label={`${dict.portfolio.openProject}: ${project.name}`}
                    >
                      <ExternalLink className="size-4" strokeWidth={2} />
                    </a>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </TabletAppPage>
  );
}
