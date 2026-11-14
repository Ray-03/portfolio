import Link from "next/link";
import type { WorkContent } from "@/lib/portfolio/types";

export function WorkArticle({ content }: { content: WorkContent }) {
  return (
    <article>
      <Link
        href={content.backHref}
        className="font-mono text-[11px] tracking-[0.16em] text-primary uppercase"
      >
        {content.backLabel}
      </Link>
      <p className="mt-6 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
        {content.company}
      </p>
      <h1 className="mt-2 font-heading text-4xl font-medium leading-[1.05] tracking-[0.03em] text-foreground sm:text-5xl">
        {content.name}
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/85">
        {content.description}
      </p>
      <p className="mt-8 max-w-xl font-heading text-2xl leading-snug font-medium text-primary">
        {content.impact}
      </p>
      <p className="mt-3 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
        {content.impactLabel}
        <span className="mx-2 text-border">/</span>
        {content.stackLabel} {content.stack}
      </p>

      <div className="mt-14 grid gap-10">
        {content.sections.map((section) => (
          <section key={section.id} aria-labelledby={`${section.id}-heading`}>
            <h2
              id={`${section.id}-heading`}
              className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase"
            >
              {section.label}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/85">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}
