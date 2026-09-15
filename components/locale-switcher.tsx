"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeCookie, localeLabels, locales, type Locale } from "@/lib/i18n/config";
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
  const { locale, dict } = useI18n();
  const pathname = usePathname() || `/${locale}`;

  return (
    <nav aria-label={dict.a11y.language} className="flex items-center gap-1">
      {locales.map((item) => {
        const href = replaceLocale(pathname, item);
        const active = item === locale;

        return (
          <Link
            key={item}
            href={href}
            hrefLang={item}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-md px-2 py-1 text-xs font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            onClick={() => {
              document.cookie = `${localeCookie}=${item}; path=/; max-age=31536000; samesite=lax`;
            }}
          >
            {localeLabels[item]}
          </Link>
        );
      })}
    </nav>
  );
}
