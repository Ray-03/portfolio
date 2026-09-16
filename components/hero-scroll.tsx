"use client";

import type { ReactNode } from "react";
import { DeviceScroll } from "@/components/device-scroll";
import { useI18n } from "@/components/i18n/i18n-provider";
import { siteConfig } from "@/lib/site";

type HeroScrollProps = {
  children: ReactNode;
  name?: string;
  title?: string;
};

export function HeroScroll({
  children,
  name = siteConfig.name,
  title = siteConfig.title,
}: HeroScrollProps) {
  const { dict } = useI18n();

  return (
    <DeviceScroll
      titleComponent={
        <>
          <p className="text-sm font-medium tracking-wide text-foreground/80 md:text-base">
            {title}
          </p>
          <h1 className="mt-1.5 text-4xl font-semibold tracking-tight text-foreground md:mt-2 md:text-[4.75rem] md:leading-none">
            {name}
          </h1>
          <p className="mx-auto mt-2.5 max-w-lg text-sm leading-snug text-foreground/75 md:mt-3 md:max-w-xl md:text-[0.95rem]">
            {dict.hero.tagline}
          </p>
        </>
      }
    >
      {children}
    </DeviceScroll>
  );
}
