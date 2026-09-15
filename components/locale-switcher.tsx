"use client";

import { usePathname } from "next/navigation";
import { localeLabels, locales, type Locale } from "@/lib/i18n/config";
import { useI18n } from "@/components/i18n/i18n-provider";
import { cn } from "@/lib/utils";

function replaceLocale(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/");
  if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
    segments[1] = nextLocale;
    return segments.join("/") || `/${nextLocale}`;
  }
  return `/${nextLocale}`;
}

export function LocaleSwitcher() {
  const { locale, dict, setLocale } = useI18n();
  const pathname = usePathname() || `/${locale}`;

  return (
    <nav aria-label={dict.a11y.language} className="flex items-center gap-1">
      {locales.map((item) => {
        const active = item === locale;

        return (
          <button
            key={item}
            type="button"
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-md px-2 py-1 text-xs font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            onClick={() => {
              if (item === locale) return;
              setLocale(item);
              // Update the URL without a Next.js navigation (avoids remount / scroll reset)
              const href = replaceLocale(
                window.location.pathname || pathname,
                item,
              );
              window.history.replaceState(
                window.history.state,
                "",
                href + window.location.search + window.location.hash,
              );
            }}
          >
            {localeLabels[item]}
          </button>
        );
      })}
    </nav>
  );
}
