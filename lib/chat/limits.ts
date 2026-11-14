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

/** Keep recent turns only — lowers token cost and reduces prompt-injection surface. */
export function trimMessagesForModel<T>(messages: T[]): T[] {
  const limit = CHAT_LIMITS.modelContextMessages;
  if (messages.length <= limit) return messages;
  return messages.slice(-limit);
}
