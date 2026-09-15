"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { DEVICE_SCROLL } from "@/components/device-scroll/constants";

const HeroScroll = dynamic(
  () =>
    import("@/components/hero-scroll").then((mod) => ({
      default: mod.HeroScroll,
    })),
  {
    loading: () => (
      <div
        className={`relative w-full bg-background ${DEVICE_SCROLL.trackHeightClass}`}
        aria-hidden
      >
        <div className="sticky top-0 h-svh" />
      </div>
    ),
  },
);

type HomeHeroProps = {
  children: ReactNode;
};

/** Isolates framer-motion / device-scroll into an async client chunk. */
export function HomeHero({ children }: HomeHeroProps) {
  return <HeroScroll>{children}</HeroScroll>;
}
