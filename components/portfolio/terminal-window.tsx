import type { ReactNode, Ref } from "react";

/** Ubuntu-style terminal chrome. Body content is supplied by the caller. */
export function TerminalWindow({
  title,
  bodyRef,
  onBodyClick,
  children,
}: {
  title: string;
  bodyRef?: Ref<HTMLDivElement>;
  onBodyClick?: () => void;
  children: ReactNode;
}) {
  return (
    <div className="ask-terminal mt-8 overflow-hidden rounded-sm border border-[color:var(--term-border)] bg-[color:var(--term-bg)] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-3 border-b border-[color:var(--term-border)] bg-[color:var(--term-chrome)] px-3 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#e95420]" />
          <span className="size-2.5 rounded-full bg-[#e5a50a]" />
          <span className="size-2.5 rounded-full bg-[#33d17a]" />
        </div>
        <p className="min-w-0 flex-1 truncate text-center font-mono text-[11px] tracking-[0.04em] text-[color:var(--term-muted)]">
          {title}
        </p>
        <span className="w-10" aria-hidden />
      </div>
      <div
        ref={bodyRef}
        className="h-[min(28rem,62vh)] overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed text-[color:var(--term-fg)] sm:px-5"
        onClick={onBodyClick}
      >
        {children}
      </div>
    </div>
  );
}
