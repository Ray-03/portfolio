"use client";

import type { ReactNode } from "react";
import { DeviceScroll } from "@/components/device-scroll";
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
  return (
    <DeviceScroll
      titleComponent={
        <>
          <p className="text-sm font-medium tracking-wide text-muted-foreground md:text-base">
            {title}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground md:text-[5.5rem] md:leading-none">
            {name}
          </h1>
        </>
      }
    >
      {children}
    </DeviceScroll>
  );
}
