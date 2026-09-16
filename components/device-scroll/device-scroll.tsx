"use client";

import { useCallback, useMemo, useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { DEVICE_SCROLL } from "@/components/device-scroll/constants";
import { DeviceFrame } from "@/components/device-scroll/device-frame";
import { DeviceScrollProvider } from "@/components/device-scroll/device-scroll-context";
import { useDeviceMetrics } from "@/components/device-scroll/use-device-metrics";
import { useDeviceScrollMotion } from "@/components/device-scroll/use-device-scroll-motion";

export type DeviceScrollProps = {
  titleComponent: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * Scroll-driven iPad intro: recline → upright → expand to fullscreen.
 * Tunables live in `constants.ts`.
 */
export function DeviceScroll({
  titleComponent,
  children,
  className,
}: DeviceScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const metrics = useDeviceMetrics();
  const {
    progress,
    titleOpacity,
    titleY,
    titleVisibility,
    rotate,
    scale,
    y,
    width,
    height,
    frameRadius,
    screenRadius,
    shadowOpacity,
    contentY,
  } = useDeviceScrollMotion(metrics, containerRef);

  const ensureEntered = useCallback(() => {
    const entered = DEVICE_SCROLL.timeline.entered;
    const targetProgress = Math.min(1, entered + 0.06);

    return new Promise<void>((resolve) => {
      const el = containerRef.current;
      if (!el) {
        resolve();
        return;
      }

      if (progress.get() >= entered - 0.02) {
        resolve();
        return;
      }

      const maxScroll = Math.max(0, el.offsetHeight - window.innerHeight);
      const targetTop = el.offsetTop + targetProgress * maxScroll;

      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        unsubscribe();
        window.clearTimeout(timeoutId);
        resolve();
      };

      const unsubscribe = progress.on("change", (value) => {
        if (value >= entered - 0.02) finish();
      });

      window.scrollTo({ top: targetTop, behavior: "smooth" });
      const timeoutId = window.setTimeout(finish, 2000);
    });
  }, [progress]);

  const contextValue = useMemo(
    () => ({ progress, ensureEntered }),
    [progress, ensureEntered],
  );

  return (
    <DeviceScrollProvider value={contextValue}>
      <div
        ref={containerRef}
        className={`relative ${DEVICE_SCROLL.trackHeightClass} ${className ?? ""}`}
      >
        <div className="sticky top-0 flex h-svh w-full items-center justify-center overflow-clip bg-background">
          <motion.div
            style={{
              opacity: titleOpacity,
              y: titleY,
              visibility: titleVisibility,
            }}
            className="pointer-events-none absolute inset-x-0 top-5 z-30 mx-auto max-w-5xl px-6 text-center md:top-7"
            aria-hidden
          >
            {titleComponent}
          </motion.div>

          <DeviceFrame
            rotate={rotate}
            scale={scale}
            y={y}
            width={width}
            height={height}
            frameRadius={frameRadius}
            screenRadius={screenRadius}
            shadowOpacity={shadowOpacity}
            contentY={contentY}
          >
            {children}
          </DeviceFrame>
        </div>
      </div>
    </DeviceScrollProvider>
  );
}
