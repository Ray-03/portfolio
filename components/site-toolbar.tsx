"use client";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { ModeToggle } from "@/components/mode-toggle";

export function SiteToolbar() {
  return (
    <div className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-xl bg-background/80 p-1.5 shadow-sm backdrop-blur-md md:right-6 md:top-6">
      <LocaleSwitcher />
      <ModeToggle />
    </div>
  );
}
