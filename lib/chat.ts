export const CHAT_LIMITS = {
  maxMessages: 24,
  maxChars: 4000,
  maxBodyBytes: 48_000,
} as const;

export function isChatRole(value: unknown): value is "user" | "assistant" | "system" {
  return value === "user" || value === "assistant" || value === "system";
}
