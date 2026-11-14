export const CHAT_LIMITS = {
  maxMessages: 16,
  maxChars: 1200,
  maxBodyBytes: 24_000,
  maxOutputTokens: 450,
  /** Soft cap per IP (best-effort on serverless isolates). */
  rateLimitWindowMs: 60_000,
  rateLimitMaxRequests: 8,
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

const rateBuckets = new Map<string, RateBucket>();

export function consumeRateLimit(ip: string): {
  ok: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const existing = rateBuckets.get(ip);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + CHAT_LIMITS.rateLimitWindowMs;
    rateBuckets.set(ip, { count: 1, resetAt });
    return {
      ok: true,
      remaining: CHAT_LIMITS.rateLimitMaxRequests - 1,
      resetAt,
    };
  }

  if (existing.count >= CHAT_LIMITS.rateLimitMaxRequests) {
    return { ok: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    ok: true,
    remaining: CHAT_LIMITS.rateLimitMaxRequests - existing.count,
    resetAt: existing.resetAt,
  };
}

/** Cheap jailbreak / off-scope probes before spending tokens. */
const BLOCKED_PATTERNS = [
  /ignore (all |any )?(previous|prior|above) (instructions|prompts)/i,
  /system prompt/i,
  /jailbreak/i,
  /dan mode/i,
  /developer mode/i,
  /act as (?!richard|his assistant)/i,
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
