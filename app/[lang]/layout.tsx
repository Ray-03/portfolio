import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Noto_Sans_SC,
  Noto_Serif_SC,
} from "next/font/google";
import { notFound } from "next/navigation";
import { I18nProvider } from "@/components/i18n/i18n-provider";
import { JsonLd } from "@/components/json-ld";
import { ThemeProvider } from "@/components/theme-provider";
import {
  hasLocale,
  localeHtmlLang,
  locales,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import {
  buildPersonJsonLd,
  getLanguageAlternates,
  getLocaleUrl,
  getSiteUrl,
  ogLocale,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const notoSerifSc = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  preload: false,
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const notoSansSc = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const siteUrl = getSiteUrl();
  const pageUrl = getLocaleUrl(lang, siteUrl);
  const languageAlternates = getLanguageAlternates(siteUrl);

  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: `${siteConfig.name} Portfolio`,
    authors: [{ name: siteConfig.name, url: siteConfig.linkedin }],
    creator: siteConfig.name,
    robots: { index: true, follow: true },
    alternates: {
      canonical: pageUrl,
      languages: languageAlternates,
    },
    openGraph: {
      type: "profile",
      locale: ogLocale[lang],
      alternateLocale: locales
        .filter((item) => item !== lang)
        .map((item) => ogLocale[item]),
      url: pageUrl,
      siteName: `${siteConfig.name} Portfolio`,
      title: dict.meta.title,
      description: dict.meta.description,
      firstName: "Richard",
      lastName: "Rinaldy",
      username: siteConfig.handle,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const locale = lang;
  const dict = await getDictionary(locale);

  return (
    <html
      lang={localeHtmlLang[locale]}
      suppressHydrationWarning
      className={`${cormorant.variable} ${notoSerifSc.variable} ${plexSans.variable} ${plexMono.variable} ${notoSansSc.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-clip font-sans" suppressHydrationWarning>
        <JsonLd data={buildPersonJsonLd(locale, dict.meta.description)} />
        <ThemeProvider>
          <I18nProvider key={locale} locale={locale} dict={dict}>
            <a
              href="#main-content"
              className="absolute left-4 top-4 z-[100] -translate-y-16 bg-primary px-4 py-2 text-sm text-primary-foreground transition focus:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {dict.a11y.skipToContent}
            </a>
            <div id="main-content" tabIndex={-1} className="outline-none">
              {children}
            </div>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
