"use client";

import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/components/i18n/i18n-provider";
import {
  localeLabels,
  locales,
  replaceLocalePath,
  type Locale,
} from "@/lib/i18n/config";

/** Reusable mono segmented control for discrete options. */
export function SegmentedControl<T extends string>({
  items,
  value,
  getLabel,
  ariaLabel,
  onChange,
  className,
}: {
  items: readonly T[];
  value: T;
  getLabel: (item: T) => string;
  ariaLabel: string;
  onChange: (item: T) => void;
  className?: string;
}) {
  return (
    <nav
      aria-label={ariaLabel}
      className={["flex items-center gap-1", className].filter(Boolean).join(" ")}
    >
      {items.map((item) => {
        const active = item === value;
        return (
          <button
            key={item}
            type="button"
            aria-current={active ? "true" : undefined}
            className={[
              "px-1 py-1 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors",
              active
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
            onClick={() => {
              if (item !== value) onChange(item);
            }}
          >
            {getLabel(item)}
          </button>
        );
      })}
    </nav>
  );
}

export function LocaleSwitcher() {
  const { locale, dict, setLocale } = useI18n();
  const pathname = usePathname() || `/${locale}`;
  const router = useRouter();

  return (
    <SegmentedControl<Locale>
      items={locales}
      value={locale}
      getLabel={(item) => localeLabels[item]}
      ariaLabel={dict.a11y.language}
      onChange={(item) => {
        setLocale(item);
        router.replace(replaceLocalePath(pathname, item));
      }}
    />
  );
}
