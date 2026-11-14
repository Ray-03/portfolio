"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  localeCookie,
  localeHtmlLang,
  type Locale,
} from "@/lib/i18n/config";
import { loadDictionary, type Dictionary } from "@/lib/i18n/get-dictionary";

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
  const requestId = useRef(0);
  const localeRef = useRef(initialLocale);

  useEffect(() => {
    localeRef.current = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    const id = ++requestId.current;
    const previous = localeRef.current;
    setLocaleState(next);
    document.documentElement.lang = localeHtmlLang[next];
    document.cookie = `${localeCookie}=${next}; path=/; max-age=31536000; samesite=lax`;
    void loadDictionary(next)
      .then((nextDict) => {
        if (id === requestId.current) setDict(nextDict);
      })
      .catch(() => {
        if (id !== requestId.current) return;
        setLocaleState(previous);
        document.documentElement.lang = localeHtmlLang[previous];
      });
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
