"use client";

import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useDeviceScroll } from "@/components/device-scroll/device-scroll-context";
import { useI18n } from "@/components/i18n/i18n-provider";
import { MacOSDock } from "@/components/ui/mac-os-dock";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import {
  getTabletDockApps,
  openEmailComposer,
  tabletAppActions,
  tabletHomeTiles,
  type TabletAppId,
} from "@/lib/tablet-apps";

function isTabletAppId(id: string): id is TabletAppId {
  return id in tabletAppActions;
}

export function TabletHome() {
  const { dict } = useI18n();
  const { homeHeaderOpacity } = useDeviceScroll();
  const [openApps, setOpenApps] = useState<string[]>([]);
  const dockApps = useMemo(() => getTabletDockApps(dict), [dict]);

  const handleAppClick = useCallback((appId: string) => {
    if (!isTabletAppId(appId)) return;
    const action = tabletAppActions[appId];

    setOpenApps((prev) =>
      prev.includes(appId) ? prev : [...prev, appId],
    );

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
  }, []);

  return (
    <div className="relative flex h-full min-h-svh w-full flex-col overflow-clip">
      <div aria-hidden className="tablet-wallpaper absolute inset-0" />
      <div aria-hidden className="tablet-wallpaper-veil absolute inset-0" />

      <div className="relative z-10 flex flex-1 flex-col px-5 pb-28 pt-10 sm:px-8 md:px-10 md:pb-28 md:pt-14">
        <motion.header
          style={{ opacity: homeHeaderOpacity }}
          className="mb-8 text-left text-foreground md:mb-10"
        >
          <p className="text-sm font-medium tracking-wide text-muted-foreground">
            {siteConfig.title}
          </p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">
            {siteConfig.name}
          </h2>
        </motion.header>

        <div className="mx-auto flex w-full max-w-xs justify-center gap-8 sm:max-w-sm sm:gap-10 md:mx-0 md:justify-start">
          {tabletHomeTiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <button
                key={tile.id}
                type="button"
                onClick={() => handleAppClick(tile.id)}
                className="group flex flex-col items-center gap-2 text-foreground"
              >
                <span className="flex size-16 items-center justify-center rounded-[22%] bg-card text-foreground shadow-lg ring-1 ring-border/60 transition group-hover:scale-105 group-active:scale-95 md:size-14">
                  <Icon className="size-8 md:size-7" strokeWidth={1.75} />
                </span>
                <span className="max-w-[5.5rem] truncate text-center text-[11px] font-medium">
                  {dict.apps[tile.labelKey]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-20 flex justify-center px-4 md:hidden">
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

      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 hidden justify-center px-4 md:bottom-6 md:flex">
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
