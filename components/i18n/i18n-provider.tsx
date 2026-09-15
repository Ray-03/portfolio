"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  localeCookie,
  localeHtmlLang,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n/get-dictionary";

type I18nContextValue = {
  locale: Locale;
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale: initialLocale,
  dict: initialDict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState(initialLocale);
  const [dict, setDict] = useState(initialDict);

  useEffect(() => {
    setLocaleState(initialLocale);
    setDict(initialDict);
  }, [initialLocale, initialDict]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    setDict(getDictionary(next));
    document.documentElement.lang = localeHtmlLang[next];
    document.cookie = `${localeCookie}=${next}; path=/; max-age=31536000; samesite=lax`;
  }, []);

  return (
    <I18nContext.Provider value={{ locale, dict, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return value;
}
