import type { UIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type ChatCopy = Dictionary["chatbot"];

function messageText(message: UIMessage) {
  return message.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function ChatTranscript({
  copy,
  messages,
  busy,
  enabled,
  status,
  errorMessage,
  onSuggest,
}: {
  copy: ChatCopy;
  messages: UIMessage[];
  busy: boolean;
  enabled: boolean;
  status: string;
  errorMessage: string | null;
  onSuggest: (text: string) => void;
}) {
  return (
    <>
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
              onClick={() => onSuggest(suggestion)}
              disabled={!enabled || busy}
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
                <span className="shrink-0 text-[color:var(--term-accent)]">ai&gt;</span>
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
                <p className="min-w-0 whitespace-pre-wrap break-words">{text}</p>
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
    </>
  );
}
