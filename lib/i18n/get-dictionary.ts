import { defaultLocale, hasLocale, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export type { Dictionary };

export async function loadDictionary(locale: Locale): Promise<Dictionary> {
  switch (locale) {
    case "id":
      return (await import("@/lib/i18n/dictionaries/id")).id;
    case "zh":
      return (await import("@/lib/i18n/dictionaries/zh")).zh;
    case "de":
      return (await import("@/lib/i18n/dictionaries/de")).de;
    default:
      return (await import("@/lib/i18n/dictionaries/en")).en;
  }
}

export async function getDictionary(locale: string): Promise<Dictionary> {
  return loadDictionary(hasLocale(locale) ? locale : defaultLocale);
}
