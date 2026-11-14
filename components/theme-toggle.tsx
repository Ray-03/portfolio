"use client";

import { Moon, Sun } from "lucide-react";

type ThemeToggleProps = {
  isDark: boolean;
  onToggle: () => void;
  lightLabel: string;
  darkLabel: string;
};

export function ThemeToggle({
  isDark,
  onToggle,
  lightLabel,
  darkLabel,
}: ThemeToggleProps) {
  return (
    <button
      type="button"
      className="inline-flex size-8 shrink-0 items-center justify-center text-muted-foreground transition hover:text-primary"
      aria-label={isDark ? lightLabel : darkLabel}
      onClick={onToggle}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
