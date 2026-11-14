import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { buildChatSystemPrompt } from "@/data/chatbot-prompt";
import { CHAT_LIMITS, isChatRole } from "@/lib/chat";

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
    if (!isChatRole(item.role)) return null;
    if (!Array.isArray(item.parts)) return null;

    const textLength = item.parts.reduce((sum, part) => {
      if (!part || typeof part !== "object") return sum;
      const text = (part as { text?: unknown }).text;
      return typeof text === "string" ? sum + text.length : sum;
    }, 0);

    if (textLength > CHAT_LIMITS.maxChars) return null;
  }

  return messages as UIMessage[];
}

export async function POST(req: Request) {
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > CHAT_LIMITS.maxBodyBytes) {
    return invalid("Request too large.", 413);
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

  try {
    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
      abortSignal: req.signal,
    });

    return result.toUIMessageStreamResponse();
  } catch {
    return invalid("Unable to process chat messages.", 400);
  }
}
