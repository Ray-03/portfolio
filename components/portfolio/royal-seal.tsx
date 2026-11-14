"use client";

import { motion } from "framer-motion";

export function RoyalSeal({ label }: { label: string }) {
  return (
    <motion.a
      href="#work-heading"
      aria-label={label}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      className="group inline-flex items-center gap-4"
    >
      <span className="relative grid size-16 place-items-center rounded-full border border-[#d4af37] bg-[#6e2430] shadow-[0_0_0_4px_rgba(18,15,13,0.45),0_10px_28px_rgba(0,0,0,0.35)] transition duration-300 group-hover:shadow-[0_0_0_4px_rgba(18,15,13,0.45),0_0_28px_rgba(212,175,55,0.55)]">
        <span className="absolute inset-1 rounded-full border border-[#d4af37]/70" />
        <span className="font-heading text-xl tracking-[0.14em] text-[#f4ecd8]">
          RR
        </span>
      </span>
      <span className="font-mono text-[11px] tracking-[0.22em] text-primary uppercase">
        {label}
      </span>
    </motion.a>
  );
}
