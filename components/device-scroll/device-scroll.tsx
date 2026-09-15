"use client";

import { useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { DEVICE_SCROLL } from "@/components/device-scroll/constants";
import { DeviceFrame } from "@/components/device-scroll/device-frame";
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

  return (
    <div
      ref={containerRef}
      className={`relative ${DEVICE_SCROLL.trackHeightClass} ${className ?? ""}`}
    >
      <div className="sticky top-0 flex h-svh w-full items-center justify-center overflow-hidden bg-background">
        <motion.div
          style={{
            opacity: titleOpacity,
            y: titleY,
            visibility: titleVisibility,
          }}
          className="pointer-events-none absolute inset-x-0 top-[8%] z-30 mx-auto max-w-5xl px-6 text-center md:top-[10%]"
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
  );
}
