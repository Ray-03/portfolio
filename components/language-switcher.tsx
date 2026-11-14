"use client";

import { cn } from "@/lib/utils";

type LanguageSwitcherProps<T extends string> = {
  items: readonly T[];
  value: T;
  getLabel: (item: T) => string;
  ariaLabel: string;
  onChange: (item: T) => void;
  className?: string;
};

export function LanguageSwitcher<T extends string>({
  items,
  value,
  getLabel,
  ariaLabel,
  onChange,
  className,
}: LanguageSwitcherProps<T>) {
  return (
    <nav aria-label={ariaLabel} className={cn("flex items-center gap-1", className)}>
      {items.map((item) => {
        const active = item === value;
        return (
          <button
            key={item}
            type="button"
            aria-current={active ? "true" : undefined}
            className={cn(
              "px-1 py-1 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors",
              active
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
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
