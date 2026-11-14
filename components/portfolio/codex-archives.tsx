"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import type { HomeContent, WorkFilter, WorkSummary } from "@/lib/portfolio/types";

type CodexArchivesProps = Pick<
  HomeContent,
  | "works"
  | "workFilters"
  | "openLabel"
  | "impactLabel"
  | "stackLabel"
  | "classifiedLabel"
>;

const ease = [0.22, 1, 0.36, 1] as const;

function Filigree() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="codex-filigree pointer-events-none absolute inset-0 h-full w-full"
    >
      <path d="M2 18 V4 H16 M8 8 C12 4 16 8 14 14" />
      <path d="M84 4 H98 V18 M92 8 C88 4 84 8 86 14" />
      <path d="M2 82 V98 H16 M8 92 C12 96 16 92 14 86" />
      <path d="M84 98 H98 V82 M92 92 C88 96 84 92 86 86" />
    </svg>
  );
}

function CodexEntry({
  work,
  index,
  open,
  reduce,
  openLabel,
  impactLabel,
  stackLabel,
  classifiedLabel,
  onToggle,
}: {
  work: WorkSummary;
  index: number;
  open: boolean;
  reduce: boolean;
  openLabel: string;
  impactLabel: string;
  stackLabel: string;
  classifiedLabel: string;
  onToggle: () => void;
}) {
  const panelId = `codex-${work.category}-${index}`;

  return (
    <motion.li layout className="codex-entry relative" data-open={open}>
      <Filigree />
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="relative z-10 w-full px-5 py-5 text-left sm:px-6 sm:py-6"
      >
        <p className="font-mono text-[11px] tracking-[0.16em] text-primary uppercase">
          {String(index + 1).padStart(2, "0")}
          <span className="mx-2 text-border">/</span>
          {work.company}
        </p>
        <h3 className="mt-2 font-heading text-3xl font-medium tracking-[0.03em] text-foreground sm:text-4xl">
          {work.name}
        </h3>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="dossier"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.38, ease }}
            className="overflow-hidden"
          >
            <div className="relative z-10 grid gap-5 px-5 pb-6 sm:px-6 sm:pb-7">
              <p className="max-w-xl text-sm leading-relaxed text-foreground/85">
                {work.summary}
              </p>
              <p className="codex-stamp max-w-sm">
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase">
                  {classifiedLabel}
                  <span className="mx-1.5">·</span>
                  {impactLabel}
                </span>
                <span className="mt-1 block font-heading text-lg leading-snug tracking-[0.02em] text-foreground">
                  {work.impact}
                </span>
              </p>
              <p className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
                {stackLabel}
                <span className="mx-2 text-border">/</span>
                <span className="normal-case tracking-normal">{work.stack}</span>
              </p>
              <Link
                href={work.href}
                className="w-fit text-sm text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
              >
                {openLabel}
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.li>
  );
}

export function CodexArchives({
  works,
  workFilters,
  openLabel,
  impactLabel,
  stackLabel,
  classifiedLabel,
}: CodexArchivesProps) {
  const [filter, setFilter] = useState<WorkFilter["id"]>("all");
  const [openHref, setOpenHref] = useState<string | null>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  const visible =
    filter === "all" ? works : works.filter((work) => work.category === filter);

  return (
    <LayoutGroup>
      <div
        role="group"
        aria-label={workFilters[0]?.label}
        className="mb-5 flex flex-wrap gap-2"
      >
        {workFilters.map((item) => {
          const active = item.id === filter;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setFilter(item.id);
                setOpenHref(null);
              }}
              className={
                active
                  ? "border border-primary bg-primary/15 px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-primary uppercase"
                  : "border border-border px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase hover:border-primary/60 hover:text-foreground"
              }
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <motion.ul layout className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {visible.map((work) => (
            <CodexEntry
              key={work.href}
              work={work}
              index={works.indexOf(work)}
              open={openHref === work.href}
              reduce={reduce}
              openLabel={openLabel}
              impactLabel={impactLabel}
              stackLabel={stackLabel}
              classifiedLabel={classifiedLabel}
              onToggle={() =>
                setOpenHref((current) =>
                  current === work.href ? null : work.href,
                )
              }
            />
          ))}
        </AnimatePresence>
      </motion.ul>
    </LayoutGroup>
  );
}
