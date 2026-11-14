import Link from "next/link";
import type { MissingContent } from "@/lib/portfolio/types";

export function MissingPage({ content }: { content: MissingContent }) {
  return (
    <article>
      <p className="font-mono text-[11px] tracking-[0.16em] text-primary uppercase">
        {content.kicker}
      </p>
      <h1 className="mt-4 font-heading text-5xl font-medium tracking-[0.035em] text-foreground">
        {content.title}
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/80">
        {content.lead}
      </p>
      {content.pathname ? (
        <p className="mt-6 font-mono text-xs text-muted-foreground">
          {content.pathLabel} {content.pathname}
        </p>
      ) : null}
      <Link
        href={content.homeHref}
        className="mt-8 inline-block text-sm text-primary underline decoration-primary/30 underline-offset-4"
      >
        {content.homeLabel}
      </Link>
    </article>
  );
}
