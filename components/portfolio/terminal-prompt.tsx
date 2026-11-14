import type { FormEvent, KeyboardEvent, Ref } from "react";

export function TerminalPrompt({
  prompt,
  placeholder,
  hint,
  sendLabel,
  value,
  inputId,
  disabled,
  busy,
  inputRef,
  onChange,
  onSubmit,
  onStop,
  onKeyDown,
}: {
  prompt: string;
  placeholder: string;
  hint: string;
  sendLabel: string;
  value: string;
  inputId: string;
  disabled: boolean;
  busy: boolean;
  inputRef?: Ref<HTMLInputElement>;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
  onStop: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="sticky bottom-0 mt-5 flex items-center gap-2 bg-[color:var(--term-bg)] pt-2"
      >
        <label htmlFor={inputId} className="sr-only">
          {placeholder}
        </label>
        <span className="shrink-0 text-[color:var(--term-prompt)]">{prompt}</span>
        <input
          ref={inputRef}
          id={inputId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent text-[color:var(--term-fg)] outline-none placeholder:text-[color:var(--term-muted)] disabled:opacity-60"
        />
        {busy ? (
          <button
            type="button"
            onClick={onStop}
            className="shrink-0 text-[11px] tracking-[0.08em] text-[color:var(--term-muted)] uppercase hover:text-[color:var(--term-fg)]"
          >
            esc
          </button>
        ) : (
          <button
            type="submit"
            disabled={disabled || !value.trim()}
            className="shrink-0 text-[11px] tracking-[0.08em] text-[color:var(--term-accent)] uppercase disabled:opacity-40"
          >
            {sendLabel}
          </button>
        )}
      </form>
      <p className="mt-2 text-[11px] text-[color:var(--term-muted)]">{hint}</p>
    </>
  );
}
