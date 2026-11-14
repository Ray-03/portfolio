const ALLOWED_CLIENT_ROLES = new Set(["user", "assistant"]);

export function isClientChatRole(
  value: unknown,
): value is "user" | "assistant" {
  return typeof value === "string" && ALLOWED_CLIENT_ROLES.has(value);
}

export function extractMessageText(parts: unknown): string {
  if (!Array.isArray(parts)) return "";
  return parts.reduce((sum, part) => {
    if (!part || typeof part !== "object") return sum;
    const text = (part as { text?: unknown }).text;
    return typeof text === "string" ? sum + text : sum;
  }, "");
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
