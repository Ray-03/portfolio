"use client";

import Link from "next/link";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ModeToggle } from "@/components/mode-toggle";
import { useI18n } from "@/components/i18n/i18n-provider";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  const { locale } = useI18n();

  return (
    <header className="flex items-center justify-between gap-4 border-b border-border py-5">
      <Link
        href={`/${locale}`}
        className="font-heading text-xl font-medium tracking-[0.06em] text-foreground"
      >
        {siteConfig.name}
      </Link>
      <div className="flex items-center gap-3">
        <LocaleSwitcher />
        <ModeToggle />
      </div>
    </header>
  );
}
