function hostFromUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    return new URL(value).host.toLowerCase();
  } catch {
    return null;
  }
}

/** Allowed browser origins for /api/chat (blocks casual cross-site abuse). */
export function getAllowedChatHosts(): Set<string> {
  const hosts = new Set<string>(["localhost:3000", "127.0.0.1:3000"]);

  const site = hostFromUrl(process.env.NEXT_PUBLIC_SITE_URL);
  if (site) hosts.add(site);

  const vercel = process.env.VERCEL_URL?.replace(/^https?:\/\//, "").toLowerCase();
  if (vercel) hosts.add(vercel);

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ?.replace(/^https?:\/\//, "")
    .toLowerCase();
  if (production) hosts.add(production);

  return hosts;
}

/**
 * Require Origin/Referer to match this site.
 * Same-origin fetch often omits Origin — fall back to Host + Sec-Fetch-Site.
 */
export function isAllowedChatOrigin(req: Request): boolean {
  const allowed = getAllowedChatHosts();
  const originHost = hostFromUrl(req.headers.get("origin"));
  if (originHost && allowed.has(originHost)) return true;

  const refererHost = hostFromUrl(req.headers.get("referer"));
  if (refererHost && allowed.has(refererHost)) return true;

  const fetchSite = req.headers.get("sec-fetch-site");
  const host = req.headers.get("host")?.toLowerCase();
  if (
    fetchSite === "same-origin" &&
    host &&
    (allowed.has(host) || host.endsWith(".vercel.app"))
  ) {
    return true;
  }

  // Local `next dev` / curl without Origin — allow only outside production.
  if (process.env.NODE_ENV !== "production" && !originHost && !refererHost) {
    return true;
  }

  return false;
}
