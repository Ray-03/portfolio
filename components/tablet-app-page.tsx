"use client";

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

type TabletAppPageProps = {
  open: boolean;
  title: string;
  backLabel: string;
  titleId: string;
  onBack: () => void;
  children: ReactNode;
};

const pageTransition = {
  type: "spring" as const,
  stiffness: 420,
  damping: 38,
  mass: 0.8,
};

export function TabletAppPage({
  open,
  title,
  backLabel,
  titleId,
  onBack,
  children,
}: TabletAppPageProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onBack();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onBack]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={pageTransition}
          className="absolute inset-0 z-30 flex flex-col bg-background"
        >
          <header className="relative flex shrink-0 items-center justify-center border-b border-border/70 bg-card/90 px-3 py-3 backdrop-blur-md">
            <button
              type="button"
              onClick={onBack}
              className="absolute left-2 top-1/2 flex -translate-y-1/2 items-center gap-0.5 rounded-lg px-1.5 py-1 text-sm font-medium text-primary transition hover:bg-primary/10"
            >
              <ChevronLeft className="size-5" strokeWidth={2.25} />
              <span>{backLabel}</span>
            </button>
            <h2
              id={titleId}
              className="text-sm font-semibold tracking-tight text-foreground"
            >
              {title}
            </h2>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-8 pb-32 pt-10 md:px-10">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
