"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle";
import { useI18n } from "@/components/i18n/i18n-provider";

const subscribe = () => () => {};

export function ModeToggle() {
  const { dict } = useI18n();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <ThemeToggle
      isDark={isDark}
      onToggle={() => setTheme(isDark ? "light" : "dark")}
      lightLabel={dict.a11y.switchToLight}
      darkLabel={dict.a11y.switchToDark}
    />
  );
}
