"use client";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { ModeToggle } from "@/components/mode-toggle";

export function SiteToolbar() {
  return (
    <div className="fixed right-7 top-7 z-50 flex items-center gap-2 rounded-xl bg-background/80 p-1.5 shadow-sm backdrop-blur-md md:right-8 md:top-8">
      <LocaleSwitcher />
      <ModeToggle />
    </div>
  );
}
