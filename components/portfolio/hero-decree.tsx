"use client";

import { useLayoutEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { RoyalSeal } from "@/components/portfolio/royal-seal";
import type { HomeContent } from "@/lib/portfolio/types";

const rise = {
  hidden: { opacity: 0.72, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const decree = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

type HeroDecreeProps = Pick<
  HomeContent,
  | "name"
  | "role"
  | "location"
  | "tagline"
  | "hireKicker"
  | "exploreLabel"
  | "proofs"
  | "links"
>;

export function HeroDecree({
  name,
  role,
  location,
  tagline,
  hireKicker,
  exploreLabel,
  proofs,
  links,
}: HeroDecreeProps) {
  const controls = useAnimation();

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    controls.set("hidden");
    void controls.start("show");
  }, [controls]);

  return (
    <header className="relative">
      <motion.div
        variants={decree}
        initial="show"
        animate={controls}
        className="relative z-10 grid items-end gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:gap-16"
      >
        <div>
          <motion.p
            variants={rise}
            className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase"
          >
            {hireKicker}
          </motion.p>
          <motion.p
            variants={rise}
            className="mt-3 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase"
          >
            {location}
          </motion.p>
          <motion.h1
            variants={rise}
            className="mt-4 font-heading text-6xl leading-[0.9] font-medium tracking-[0.03em] text-foreground sm:text-7xl lg:text-8xl"
          >
            {name}
          </motion.h1>
          <motion.p variants={rise} className="mt-5 max-w-xl text-sm text-foreground/90">
            {role}
          </motion.p>
          <motion.p
            variants={rise}
            className="mt-4 max-w-xl text-lg leading-snug text-foreground/85"
          >
            {tagline}
          </motion.p>
          <motion.div
            variants={rise}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-sm text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
          <motion.div variants={rise} className="mt-8">
            <RoyalSeal label={exploreLabel} />
          </motion.div>
        </div>

        <motion.ul
          variants={rise}
          className="grid gap-5 border-primary/40 lg:border-l lg:pl-8"
        >
          {proofs.map((proof) => (
            <li key={proof.id} className="border-t border-primary/30 pt-4 first:border-t-0 first:pt-0">
              <p className="font-heading text-2xl leading-snug font-medium tracking-[0.02em] text-primary">
                {proof.figure}
              </p>
              <p className="mt-1 text-xs tracking-[0.08em] text-muted-foreground uppercase">
                {proof.caption}
              </p>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </header>
  );
}
