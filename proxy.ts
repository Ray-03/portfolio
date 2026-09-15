import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse, type NextRequest } from "next/server";
import {
  defaultLocale,
  hasLocale,
  localeCookie,
  locales,
  type Locale,
} from "@/lib/i18n/config";

function getPreferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(localeCookie)?.value;
  if (cookieLocale && hasLocale(cookieLocale)) {
    return cookieLocale;
  }

  const languages = new Negotiator({
    headers: {
      "accept-language": request.headers.get("accept-language") ?? undefined,
    },
  }).languages();

  try {
    const matched = match(languages, [...locales], defaultLocale);
    return hasLocale(matched) ? matched : defaultLocale;
  } catch {
    return defaultLocale;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set(localeCookie, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
