import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { buildChatSystemPrompt } from "@/data/chatbot-prompt";
import {
  CHAT_LIMITS,
  consumeGlobalDailyBudget,
  consumeRateLimit,
  extractMessageText,
  getClientIp,
  isAllowedChatOrigin,
  isChatEnabled,
  isClientChatRole,
  looksLikeOffTopic,
  looksLikePromptInjection,
  trimMessagesForModel,
} from "@/lib/chat";

export const maxDuration = 30;

const systemPrompt = buildChatSystemPrompt();

function invalid(message: string, status = 400) {
  return new Response(message, { status });
}

function parseMessages(payload: unknown): UIMessage[] | null {
  if (!payload || typeof payload !== "object" || !("messages" in payload)) {
    return null;
  }

  const { messages } = payload as { messages: unknown };
  if (!Array.isArray(messages) || messages.length === 0) return null;
  if (messages.length > CHAT_LIMITS.maxMessages) return null;

  for (const message of messages) {
    if (!message || typeof message !== "object") return null;
    const item = message as { role?: unknown; parts?: unknown };
    // Never accept client-supplied system messages (prompt injection vector).
    if (!isClientChatRole(item.role)) return null;
    if (!Array.isArray(item.parts)) return null;

    const text = extractMessageText(item.parts);
    if (text.length > CHAT_LIMITS.maxChars) return null;
  }

  return messages as UIMessage[];
}

function lastUserText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (message.role !== "user") continue;
    return extractMessageText(message.parts);
  }
  return "";
}

export async function POST(req: Request) {
  if (!isChatEnabled()) {
    return invalid("Ask AI is temporarily disabled.", 503);
  }

  if (!isAllowedChatOrigin(req)) {
    return invalid("Forbidden origin.", 403);
  }

  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > CHAT_LIMITS.maxBodyBytes) {
    return invalid("Request too large.", 413);
  }

  const ip = getClientIp(req);
  const rate = consumeRateLimit(ip);
  if (!rate.ok) {
    return new Response("Too many requests. Try again shortly.", {
      status: 429,
      headers: {
        "Retry-After": String(
          Math.max(1, Math.ceil((rate.resetAt - Date.now()) / 1000)),
        ),
      },
    });
  }

  const budget = consumeGlobalDailyBudget();
  if (!budget.ok) {
    return new Response("Ask AI daily budget reached. Try again tomorrow.", {
      status: 429,
      headers: {
        "Retry-After": String(
          Math.max(1, Math.ceil((budget.resetAt - Date.now()) / 1000)),
        ),
        "X-Chat-Budget": "exhausted",
      },
    });
  }

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return invalid("GOOGLE_GENERATIVE_AI_API_KEY is not configured.", 503);
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return invalid("Invalid JSON body.");
  }

  const messages = parseMessages(payload);
  if (!messages) {
    return invalid("Invalid chat payload.");
  }

  const latest = lastUserText(messages);
  if (!latest.trim()) {
    return invalid("Empty user message.");
  }
  if (looksLikePromptInjection(latest) || looksLikeOffTopic(latest)) {
    return invalid("Message rejected.", 400);
  }

  try {
    const context = trimMessagesForModel(messages);
    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: systemPrompt,
      messages: await convertToModelMessages(context),
      maxOutputTokens: CHAT_LIMITS.maxOutputTokens,
      temperature: 0.3,
      abortSignal: req.signal,
    });

    return result.toUIMessageStreamResponse();
  } catch {
    return invalid("Unable to process chat messages.", 400);
  }
}
