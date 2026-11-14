import { AskTerminal } from "@/components/portfolio/ask-terminal";
import { CodexArchives } from "@/components/portfolio/codex-archives";
import { HeroDecree } from "@/components/portfolio/hero-decree";
import { isChatEnabled } from "@/lib/chat";
import type { HomeContent } from "@/lib/portfolio/types";

function indexLabel(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function HomeView({ content }: { content: HomeContent }) {
  return (
    <div className="flex flex-col gap-16 sm:gap-20">
      <HeroDecree
        name={content.name}
        role={content.role}
        location={content.location}
        tagline={content.tagline}
        hireKicker={content.hireKicker}
        exploreLabel={content.exploreLabel}
        proofs={content.proofs}
        links={content.links}
      />

      <section aria-labelledby="proof-heading">
        <h2
          id="proof-heading"
          className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase"
        >
          {content.proofTitle}
        </h2>
        <ol className="mt-6 divide-y divide-border border-y border-border">
          {content.proofs.map((proof, index) => (
            <li
              key={proof.id}
              className="grid gap-3 py-6 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:items-baseline sm:gap-8 sm:py-7"
            >
              <span className="font-heading text-4xl leading-none font-medium text-foreground/25">
                {indexLabel(index)}
              </span>
              <div>
                <p className="font-heading text-2xl leading-snug font-medium tracking-[0.03em] text-primary sm:text-3xl">
                  {proof.figure}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{proof.caption}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <AskTerminal enabled={isChatEnabled()} />

      <section aria-labelledby="work-heading" className="work-stage">
        <div className="work-sticky">
          <h2
            id="work-heading"
            className="font-heading text-4xl font-medium tracking-[0.035em] text-foreground sm:text-5xl"
          >
            {content.workTitle}
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground/80">
            {content.workLead}
          </p>
        </div>
        <div className="mt-10 md:mt-0">
          <CodexArchives
            works={content.works}
            workFilters={content.workFilters}
            openLabel={content.openLabel}
            impactLabel={content.impactLabel}
            stackLabel={content.stackLabel}
            classifiedLabel={content.classifiedLabel}
          />
        </div>
      </section>

      <section aria-labelledby="about-heading">
        <h2
          id="about-heading"
          className="font-heading text-4xl font-medium tracking-[0.035em] text-foreground"
        >
          {content.aboutTitle}
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/85">
          {content.lead}
        </p>

        <div className="mt-10">
          <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
            {content.skillsLabel}
          </p>
          <ul className="mt-5 divide-y divide-border border-y border-border">
            {content.skills.map((skill) => (
              <li
                key={skill.id}
                className="grid gap-3 py-5 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:items-center sm:gap-8"
              >
                <div>
                  <p className="text-sm font-medium tracking-[0.02em] text-foreground">
                    {skill.label}
                  </p>
                  <p
                    className="mt-1 font-mono text-[11px] tabular-nums tracking-[0.08em] text-primary"
                    aria-label={`${skill.level} of 100`}
                  >
                    {skill.level}
                  </p>
                </div>
                <div>
                  <div
                    className="h-0.5 w-full overflow-hidden bg-border"
                    role="meter"
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={skill.label}
                  >
                    <div
                      className="h-full bg-primary transition-[width] duration-700 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {skill.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
            {content.educationLabel}
          </p>
          <p className="mt-2 text-sm text-foreground">{content.education}</p>
        </div>
        <dl className="mt-6 grid gap-4">
          {content.credentials.map((item) => (
            <div key={item.label}>
              <dt className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                {item.label}
              </dt>
              <dd className="mt-1 text-sm text-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
