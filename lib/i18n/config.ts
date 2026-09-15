export const locales = ["en", "id", "zh", "de"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeCookie = "NEXT_LOCALE";

export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  id: "id",
  zh: "zh-CN",
  de: "de",
};

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  id: "ID",
  zh: "中文",
  de: "DE",
};

export function hasLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
