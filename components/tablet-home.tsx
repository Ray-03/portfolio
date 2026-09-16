"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FolderGit2 } from "lucide-react";
import { PortfolioPage } from "@/components/portfolio-page";
import { useDeviceScroll } from "@/components/device-scroll/device-scroll-context";
import { useI18n } from "@/components/i18n/i18n-provider";
import { MacOSDock } from "@/components/ui/mac-os-dock";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import {
  getTabletDockApps,
  openEmailComposer,
  tabletAppActions,
  type TabletAppId,
} from "@/lib/tablet-apps";

function isTabletAppId(id: string): id is TabletAppId {
  return id in tabletAppActions;
}

export function TabletHome() {
  const { dict } = useI18n();
  const { ensureEntered } = useDeviceScroll();
  const [openApps, setOpenApps] = useState<string[]>([]);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const enteringRef = useRef(false);
  const dockApps = useMemo(() => getTabletDockApps(dict), [dict]);

  const goHome = useCallback(() => {
    setPortfolioOpen(false);
    setOpenApps((prev) => prev.filter((id) => id !== "portfolio"));
  }, []);

  const openPortfolio = useCallback(async () => {
    if (enteringRef.current) return;
    enteringRef.current = true;
    try {
      setOpenApps((prev) =>
        prev.includes("portfolio") ? prev : [...prev, "portfolio"],
      );
      await ensureEntered();
      setPortfolioOpen(true);
    } finally {
      enteringRef.current = false;
    }
  }, [ensureEntered]);

  const handleAppClick = useCallback(
    async (appId: string) => {
      if (!isTabletAppId(appId) || enteringRef.current) return;
      const action = tabletAppActions[appId];

      if (action.type === "page") {
        await openPortfolio();
        return;
      }

      setOpenApps((prev) =>
        prev.includes(appId) ? prev : [...prev, appId],
      );

      enteringRef.current = true;
      try {
        await ensureEntered();

        if (action.type === "email") {
          openEmailComposer(action.href);
          return;
        }

        if (action.type === "external") {
          window.open(action.href, "_blank", "noopener,noreferrer");
          return;
        }

        const target = document.querySelector(action.href);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      } finally {
        enteringRef.current = false;
      }
    },
    [ensureEntered, openPortfolio],
  );

  return (
    <div className="relative flex h-full min-h-svh w-full flex-col overflow-clip">
      <div aria-hidden className="tablet-wallpaper absolute inset-0" />
      <div aria-hidden className="tablet-wallpaper-veil absolute inset-0" />

      <motion.div
        animate={
          portfolioOpen
            ? { scale: 0.94, opacity: 0.55, x: -18 }
            : { scale: 1, opacity: 1, x: 0 }
        }
        transition={{ type: "spring", stiffness: 420, damping: 38, mass: 0.8 }}
        className="relative z-10 flex flex-1 flex-col px-8 pb-32 pt-14 sm:px-10 md:px-12 md:pb-36 md:pt-16"
        style={{ transformOrigin: "left center" }}
      >
        <div className="mx-auto w-full max-w-lg md:mx-0">
          <div className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-[28%] bg-primary text-lg font-semibold text-primary-foreground shadow-lg md:size-16 md:text-xl">
              {siteConfig.initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground/80">
                {dict.about.role}
              </p>
              <h2 className="truncate text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                {siteConfig.name}
              </h2>
            </div>
          </div>

          <p className="mt-6 text-base font-medium leading-relaxed text-foreground">
            {dict.about.lead}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground/75">
            {dict.about.body}
          </p>

          <button
            type="button"
            onClick={openPortfolio}
            className="group mt-8 flex w-full max-w-sm items-center gap-4 rounded-2xl border border-border/70 bg-card/80 p-3 text-left shadow-sm outline-none transition hover:border-primary/40 hover:bg-card focus-visible:ring-2 focus-visible:ring-primary/70 md:max-w-xs"
          >
            <span className="flex size-14 shrink-0 items-center justify-center rounded-[22%] bg-background text-foreground shadow-md ring-1 ring-border/60 transition duration-200 group-hover:scale-105 group-hover:ring-primary/50 group-active:scale-95">
              <FolderGit2 className="size-7" strokeWidth={1.75} />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-foreground">
                {dict.apps.portfolio}
              </span>
              <span className="mt-0.5 block truncate text-xs text-foreground/70">
                {dict.portfolio.lead}
              </span>
            </span>
          </button>
        </div>
      </motion.div>

      <PortfolioPage open={portfolioOpen} onBack={goHome} />

      <div className="pointer-events-none absolute inset-x-0 bottom-12 z-40 flex justify-center px-6 md:hidden">
        <nav
          aria-label={dict.apps.contact}
          className="pointer-events-auto flex flex-row items-end justify-center gap-5 rounded-[1.35rem] border border-white/15 bg-[rgba(45,45,45,0.75)] px-5 py-2.5 shadow-lg backdrop-blur-md"
        >
          {dockApps.map((app) => {
            const isOpen = openApps.includes(app.id);
            return (
              <button
                key={app.id}
                type="button"
                title={app.name}
                onClick={() => handleAppClick(app.id)}
                className="relative flex size-11 shrink-0 items-center justify-center"
              >
                <span className="flex size-11 items-center justify-center overflow-hidden rounded-[22%] bg-gradient-to-br from-white/90 to-white/70 text-neutral-800 shadow-sm dark:from-neutral-200 dark:to-neutral-400">
                  <span className="flex size-[58%] items-center justify-center [&_svg]:size-full">
                    {app.icon}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-white/70 transition-opacity",
                    isOpen ? "opacity-100" : "opacity-0",
                  )}
                />
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-12 z-40 hidden justify-center px-6 md:bottom-14 md:flex">
        <div className="pointer-events-auto">
          <MacOSDock
            apps={dockApps}
            openApps={openApps}
            onAppClick={handleAppClick}
          />
        </div>
      </div>
    </div>
  );
}
