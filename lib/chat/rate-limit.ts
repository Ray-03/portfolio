import { CHAT_LIMITS, getGlobalDailyBudget } from "@/lib/chat/limits";

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
