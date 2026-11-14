"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import ReactMarkdown from "react-markdown";
import { useI18n } from "@/components/i18n/i18n-provider";

function messageText(message: UIMessage) {
  return message.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function AskTerminal({ enabled = true }: { enabled?: boolean }) {
  const { dict } = useI18n();
  const copy = dict.chatbot;
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        fetch: async (input, init) => {
          const response = await fetch(input, init);
          if (response.status === 429) {
            throw new Error("RATE_LIMIT");
          }
          if (response.status === 400 || response.status === 403) {
            throw new Error("REJECTED");
          }
          if (response.status === 503) {
            throw new Error("DISABLED");
          }
          if (!response.ok) {
            throw new Error("CHAT_ERROR");
          }
          return response;
        },
      }),
    [],
  );

  const { messages, sendMessage, status, error, stop } = useChat({
    transport,
  });

  const errorMessage = !enabled
    ? copy.disabled
    : error?.message === "RATE_LIMIT"
      ? copy.rateLimit
      : error?.message === "REJECTED" || error?.message === "DISABLED"
        ? error.message === "DISABLED"
          ? copy.disabled
          : copy.rejected
        : error
          ? copy.error
          : null;

  const busy = status === "submitted" || status === "streaming";
  const locked = !enabled || busy;

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, status, error]);

  async function ask(text: string) {
    const trimmed = text.trim();
    if (!trimmed || !enabled || busy) return;
    setInput("");
    await sendMessage({ text: trimmed });
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void ask(input);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape" && busy) {
      event.preventDefault();
      void stop();
    }
  }

  return (
    <section id="ask-ai" aria-labelledby="ask-heading" className="scroll-mt-8">
      <h2
        id="ask-heading"
        className="font-heading text-4xl font-medium tracking-[0.035em] text-foreground sm:text-5xl"
      >
        {copy.title}
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/85">
        {copy.lead}
      </p>

      <div className="ask-terminal mt-8 overflow-hidden rounded-sm border border-[color:var(--term-border)] bg-[color:var(--term-bg)] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-3 border-b border-[color:var(--term-border)] bg-[color:var(--term-chrome)] px-3 py-2.5">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#e95420]" />
            <span className="size-2.5 rounded-full bg-[#e5a50a]" />
            <span className="size-2.5 rounded-full bg-[#33d17a]" />
          </div>
          <p className="min-w-0 flex-1 truncate text-center font-mono text-[11px] tracking-[0.04em] text-[color:var(--term-muted)]">
            {copy.host}:{copy.path}
          </p>
          <span className="w-10" aria-hidden />
        </div>

        <div
          ref={scrollRef}
          className="h-[min(28rem,62vh)] overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed text-[color:var(--term-fg)] sm:px-5"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="space-y-1 text-[color:var(--term-muted)]">
            {copy.boot.map((line) => (
              <p key={line}>{line}</p>
            ))}
            {!enabled ? <p className="text-[#ff6b6b]">{copy.disabled}</p> : null}
          </div>

          {enabled && messages.length === 0 ? (
            <div className="mt-5 space-y-2">
              <p className="text-[color:var(--term-muted)]">{copy.suggestionsLabel}</p>
              {copy.suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="block max-w-full truncate text-left text-[color:var(--term-accent)] transition-colors hover:text-[color:var(--term-fg)]"
                  onClick={() => void ask(suggestion)}
                  disabled={locked}
                >
                  <span className="text-[color:var(--term-muted)]">$ </span>
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}

          <div className="mt-5 space-y-4">
            {messages.map((message) => {
              const text = messageText(message);
              if (!text && message.role === "assistant" && busy) {
                return (
                  <div key={message.id} className="flex gap-2">
                    <span className="shrink-0 text-[color:var(--term-accent)]">
                      ai&gt;
                    </span>
                    <span className="ask-terminal-cursor text-[color:var(--term-muted)]">
                      {copy.thinking}
                    </span>
                  </div>
                );
              }

              return (
                <div key={message.id} className="flex gap-2">
                  <span
                    className={
                      message.role === "user"
                        ? "shrink-0 text-[color:var(--term-prompt)]"
                        : "shrink-0 text-[color:var(--term-accent)]"
                    }
                  >
                    {message.role === "user" ? copy.prompt : "ai>"}
                  </span>
                  {message.role === "user" ? (
                    <p className="min-w-0 whitespace-pre-wrap break-words">
                      {text}
                    </p>
                  ) : (
                    <div className="ask-terminal-md min-w-0 flex-1 break-words">
                      <ReactMarkdown>{text}</ReactMarkdown>
                    </div>
                  )}
                </div>
              );
            })}

            {status === "submitted" ? (
              <div className="flex gap-2">
                <span className="shrink-0 text-[color:var(--term-accent)]">ai&gt;</span>
                <span className="ask-terminal-cursor text-[color:var(--term-muted)]">
                  {copy.thinking}
                </span>
              </div>
            ) : null}

            {errorMessage ? (
              <p className="text-[#ff6b6b]" role="alert">
                {errorMessage}
              </p>
            ) : null}
          </div>

          <form
            onSubmit={onSubmit}
            className="sticky bottom-0 mt-5 flex items-center gap-2 bg-[color:var(--term-bg)] pt-2"
          >
            <label htmlFor="ask-terminal-input" className="sr-only">
              {copy.placeholder}
            </label>
            <span className="shrink-0 text-[color:var(--term-prompt)]">
              {copy.prompt}
            </span>
            <input
              ref={inputRef}
              id="ask-terminal-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={onKeyDown}
              placeholder={enabled ? copy.placeholder : copy.disabled}
              disabled={locked}
              autoComplete="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent text-[color:var(--term-fg)] outline-none placeholder:text-[color:var(--term-muted)] disabled:opacity-60"
            />
            {busy ? (
              <button
                type="button"
                onClick={() => void stop()}
                className="shrink-0 text-[11px] tracking-[0.08em] text-[color:var(--term-muted)] uppercase hover:text-[color:var(--term-fg)]"
              >
                esc
              </button>
            ) : (
              <button
                type="submit"
                disabled={!enabled || !input.trim()}
                className="shrink-0 text-[11px] tracking-[0.08em] text-[color:var(--term-accent)] uppercase disabled:opacity-40"
              >
                {copy.send}
              </button>
            )}
          </form>
          <p className="mt-2 text-[11px] text-[color:var(--term-muted)]">
            {enabled ? copy.hint : copy.disabled}
          </p>
        </div>
      </div>
    </section>
  );
}
