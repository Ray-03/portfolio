"use client";

import type { ReactNode } from "react";
import { motion, type MotionValue } from "framer-motion";
import { DEVICE_SCROLL } from "@/components/device-scroll/constants";

type DeviceFrameProps = {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  y: MotionValue<number>;
  width: MotionValue<number>;
  height: MotionValue<number>;
  frameRadius: MotionValue<number>;
  screenRadius: MotionValue<number>;
  shadowOpacity: MotionValue<number>;
  contentY: MotionValue<number>;
  children: ReactNode;
};

export function DeviceFrame({
  rotate,
  scale,
  y,
  width,
  height,
  frameRadius,
  screenRadius,
  shadowOpacity,
  contentY,
  children,
}: DeviceFrameProps) {
  const inset = DEVICE_SCROLL.bezelPadding;

  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      style={{ perspective: DEVICE_SCROLL.perspective }}
    >
      <motion.div
        style={{
          rotateX: rotate,
          scale,
          y,
          width,
          height,
          borderRadius: frameRadius,
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        }}
        className="relative origin-center will-change-transform"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] border-2 border-[#6C6C6C] bg-[#222222]"
        />
        <motion.div
          aria-hidden
          style={{ opacity: shadowOpacity }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[0_0_#0000004d,0_9px_20px_#0000004a,0_37px_37px_#00000042,0_84px_50px_#00000026,0_149px_60px_#0000000a,0_233px_65px_#00000003]"
        />

        <motion.div
          style={{
            borderRadius: screenRadius,
            top: inset,
            right: inset,
            bottom: inset,
            left: inset,
          }}
          className="absolute z-10 overflow-hidden bg-background"
        >
          <motion.div style={{ y: contentY }} className="will-change-transform">
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
