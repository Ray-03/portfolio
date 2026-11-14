/** Kill switch: set CHAT_ENABLED=false on Vercel/local to pause Ask AI. Default on. */
export function isChatEnabled() {
  const value = process.env.CHAT_ENABLED?.trim().toLowerCase();
  if (!value) return true;
  return value !== "false" && value !== "0" && value !== "off";
}

/** Site-wide daily cap across all visitors. Override with CHAT_DAILY_BUDGET. */
export function getGlobalDailyBudget() {
  const raw = process.env.CHAT_DAILY_BUDGET?.trim();
  if (!raw) return 500;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return 500;
  return parsed;
}

export const CHAT_LIMITS = {
  /** Room for a real back-and-forth; still bounds cost. */
  maxMessages: 24,
  /** Only the newest turns are sent to the model (cost + focus). */
  modelContextMessages: 10,
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
const globalDailyBuckets = new Map<string, RateBucket>();

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

/** Shared budget for the whole site (all IPs). Best-effort per serverless isolate. */
export function consumeGlobalDailyBudget(): {
  ok: boolean;
  remaining: number;
  resetAt: number;
} {
  return consumeBucket(
    globalDailyBuckets,
    "global",
    CHAT_LIMITS.dailyWindowMs,
    getGlobalDailyBudget(),
  );
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

/** Clear free-work / general-AI abuse — skip if the ask still names Richard/portfolio. */
const OFF_TOPIC_PATTERNS = [
  /\b(write|generate|fix|debug)\b[\s\S]{0,60}\b(code|function|class|sql|regex|script)\b/i,
  /\b(leetcode|hackerrank|homework|assignment|essay)\b/i,
  /\b(weather|stock price|bitcoin|crypto)\b/i,
  /\bwho (is|won) (the )?(current )?president\b/i,
  /\btell me a (joke|story)\b/i,
  /\bact as (a |an )?(general|unrestricted|evil)\b/i,
];

const PORTFOLIO_ANCHORS =
  /\b(richard|rinaldy|portfolio|trainge|shopee|propertylim|binus|frontend|front-end|next\.?js|react)\b/i;

export function looksLikePromptInjection(text: string): boolean {
  return BLOCKED_PATTERNS.some((pattern) => pattern.test(text));
}

export function looksLikeOffTopic(text: string): boolean {
  if (PORTFOLIO_ANCHORS.test(text)) return false;
  return OFF_TOPIC_PATTERNS.some((pattern) => pattern.test(text));
}

/** Keep recent turns only — lowers token cost and reduces prompt-injection surface. */
export function trimMessagesForModel<T>(messages: T[]): T[] {
  const limit = CHAT_LIMITS.modelContextMessages;
  if (messages.length <= limit) return messages;
  return messages.slice(-limit);
}

export function extractMessageText(parts: unknown): string {
  if (!Array.isArray(parts)) return "";
  return parts.reduce((sum, part) => {
    if (!part || typeof part !== "object") return sum;
    const text = (part as { text?: unknown }).text;
    return typeof text === "string" ? sum + text : sum;
  }, "");
}
