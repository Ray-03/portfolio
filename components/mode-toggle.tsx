"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { useI18n } from "@/components/i18n/i18n-provider";

const subscribe = () => () => {};

/** Reusable icon button for binary theme state. */
export function ThemeToggleButton({
  isDark,
  onToggle,
  lightLabel,
  darkLabel,
}: {
  isDark: boolean;
  onToggle: () => void;
  lightLabel: string;
  darkLabel: string;
}) {
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

export function ModeToggle() {
  const { dict } = useI18n();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <ThemeToggleButton
      isDark={isDark}
      onToggle={() => setTheme(isDark ? "light" : "dark")}
      lightLabel={dict.a11y.switchToLight}
      darkLabel={dict.a11y.switchToDark}
    />
  );
}
