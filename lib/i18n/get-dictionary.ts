import { defaultLocale, hasLocale, type Locale } from "@/lib/i18n/config";
import { de } from "@/lib/i18n/dictionaries/de";
import { en, type Dictionary } from "@/lib/i18n/dictionaries/en";
import { id } from "@/lib/i18n/dictionaries/id";
import { zh } from "@/lib/i18n/dictionaries/zh";

const dictionaries: Record<Locale, Dictionary> = { en, id, zh, de };

export function getDictionary(locale: string): Dictionary {
  return hasLocale(locale) ? dictionaries[locale] : dictionaries[defaultLocale];
}

export type { Dictionary };
