"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { useI18n } from "@/components/i18n/i18n-provider";
import { ChatTranscript } from "@/components/portfolio/chat-transcript";
import { TerminalPrompt } from "@/components/portfolio/terminal-prompt";
import { TerminalWindow } from "@/components/portfolio/terminal-window";

function chatErrorMessage(
  enabled: boolean,
  error: Error | undefined,
  copy: {
    disabled: string;
    rateLimit: string;
    budget: string;
    rejected: string;
    error: string;
  },
) {
  if (!enabled) return copy.disabled;
  if (!error) return null;
  if (error.message === "RATE_LIMIT") return copy.rateLimit;
  if (error.message === "BUDGET") return copy.budget;
  if (error.message === "DISABLED") return copy.disabled;
  if (error.message === "REJECTED") return copy.rejected;
  return copy.error;
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
            const budget = response.headers.get("X-Chat-Budget");
            throw new Error(budget === "exhausted" ? "BUDGET" : "RATE_LIMIT");
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

  const errorMessage = chatErrorMessage(enabled, error, copy);
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

      <TerminalWindow
        title={`${copy.host}:${copy.path}`}
        bodyRef={scrollRef}
        onBodyClick={() => inputRef.current?.focus()}
      >
        <ChatTranscript
          copy={copy}
          messages={messages}
          busy={busy}
          enabled={enabled}
          status={status}
          errorMessage={errorMessage}
          onSuggest={(text) => void ask(text)}
        />
        <TerminalPrompt
          prompt={copy.prompt}
          placeholder={enabled ? copy.placeholder : copy.disabled}
          hint={enabled ? copy.hint : copy.disabled}
          sendLabel={copy.send}
          value={input}
          inputId="ask-terminal-input"
          disabled={locked}
          busy={busy}
          inputRef={inputRef}
          onChange={setInput}
          onSubmit={onSubmit}
          onStop={() => void stop()}
          onKeyDown={onKeyDown}
        />
      </TerminalWindow>
    </section>
  );
}
