"use client";

import { usePathname, useRouter } from "next/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useI18n } from "@/components/i18n/i18n-provider";
import {
  localeLabels,
  locales,
  replaceLocalePath,
} from "@/lib/i18n/config";

export function LocaleSwitcher() {
  const { locale, dict, setLocale } = useI18n();
  const pathname = usePathname() || `/${locale}`;
  const router = useRouter();

  return (
    <LanguageSwitcher
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
