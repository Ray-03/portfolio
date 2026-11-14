import type { ReactNode } from "react";
import { AnimusBackdrop } from "@/components/portfolio/animus-backdrop";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { SiteHeader } from "@/components/portfolio/site-header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-svh">
      <AnimusBackdrop />
      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-6xl flex-col px-5 sm:px-8">
        <SiteHeader />
        <main className="flex-1 pt-8 sm:pt-10">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
