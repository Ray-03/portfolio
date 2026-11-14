/** Kill switch: set CHAT_ENABLED=false on Vercel/local to pause Ask AI. Default on. */
export function isChatEnabled() {
  const value = process.env.CHAT_ENABLED?.trim().toLowerCase();
  if (!value) return true;
  return value !== "false" && value !== "0" && value !== "off";
}

export const CHAT_LIMITS = {
  /** Room for a real back-and-forth; still bounds cost. */
  maxMessages: 24,
  maxChars: 2000,
  maxBodyBytes: 32_000,
  maxOutputTokens: 700,
  /**
   * Soft caps per IP (best-effort on serverless).
   * Tuned for humans + shared office NAT, not rapid scrapers:
   * ~1 msg every few seconds is fine; sustained spray is not.
   */
  rateLimitWindowMs: 60_000,
  rateLimitMaxRequests: 20,
  dailyWindowMs: 24 * 60 * 60 * 1000,
  dailyMaxRequests: 120,
} as const;

const ALLOWED_CLIENT_ROLES = new Set(["user", "assistant"]);

export function isClientChatRole(
  value: unknown,
): value is "user" | "assistant" {
  return typeof value === "string" && ALLOWED_CLIENT_ROLES.has(value);
}

/** @deprecated use isClientChatRole — system role must never come from the client */
export function isChatRole(value: unknown): value is "user" | "assistant" | "system" {
  return value === "user" || value === "assistant" || value === "system";
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

type RateBucket = { count: number; resetAt: number };

const minuteBuckets = new Map<string, RateBucket>();
const dailyBuckets = new Map<string, RateBucket>();

function consumeBucket(
  store: Map<string, RateBucket>,
  key: string,
  windowMs: number,
  max: number,
): { ok: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { ok: true, remaining: max - 1, resetAt };
  }

  if (existing.count >= max) {
    return { ok: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    ok: true,
    remaining: max - existing.count,
    resetAt: existing.resetAt,
  };
}

export function consumeRateLimit(ip: string): {
  ok: boolean;
  remaining: number;
  resetAt: number;
  kind: "minute" | "daily";
} {
  const minute = consumeBucket(
    minuteBuckets,
    ip,
    CHAT_LIMITS.rateLimitWindowMs,
    CHAT_LIMITS.rateLimitMaxRequests,
  );
  if (!minute.ok) {
    return { ...minute, kind: "minute" };
  }

  const daily = consumeBucket(
    dailyBuckets,
    ip,
    CHAT_LIMITS.dailyWindowMs,
    CHAT_LIMITS.dailyMaxRequests,
  );
  if (!daily.ok) {
    return { ...daily, kind: "daily" };
  }

  return { ...minute, kind: "minute" };
}

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

/**
 * Only block clear jailbreak probes — not normal curiosity.
 * Off-topic portfolio-adjacent questions are handled by the system prompt.
 */
const BLOCKED_PATTERNS = [
  /ignore (all |any )?(previous|prior|above) (instructions|prompts)/i,
  /\bjailbreak\b/i,
  /\bdan mode\b/i,
];

export function looksLikePromptInjection(text: string): boolean {
  return BLOCKED_PATTERNS.some((pattern) => pattern.test(text));
}

export function extractMessageText(parts: unknown): string {
  if (!Array.isArray(parts)) return "";
  return parts.reduce((sum, part) => {
    if (!part || typeof part !== "object") return sum;
    const text = (part as { text?: unknown }).text;
    return typeof text === "string" ? sum + text : sum;
  }, "");
}
