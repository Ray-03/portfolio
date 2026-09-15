"use client";

import { type RefObject } from "react";
import {
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  DEVICE_SCROLL,
  type DeviceMetrics,
} from "@/components/device-scroll/constants";

export type DeviceScrollMotion = {
  progress: MotionValue<number>;
  titleOpacity: MotionValue<number>;
  titleY: MotionValue<number>;
  titleVisibility: MotionValue<"hidden" | "visible">;
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  y: MotionValue<number>;
  width: MotionValue<number>;
  height: MotionValue<number>;
  frameRadius: MotionValue<number>;
  screenRadius: MotionValue<number>;
  shadowOpacity: MotionValue<number>;
  contentY: MotionValue<number>;
};

export function useDeviceScrollMotion(
  metrics: DeviceMetrics,
  containerRef: RefObject<HTMLDivElement | null>,
): DeviceScrollMotion {
  const { tiltMid, upright, enterStart, entered, radiusFlattenStart } =
    DEVICE_SCROLL.timeline;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, DEVICE_SCROLL.spring);

  const titleOpacity = useTransform(
    progress,
    [0, tiltMid + 0.02, upright],
    [1, 0.7, 0],
  );
  const titleY = useTransform(progress, [tiltMid, upright], [0, -56]);
  const titleVisibility = useTransform(titleOpacity, (value) =>
    value <= 0.01 ? "hidden" : "visible",
  );

  const rotate = useTransform(progress, [0, tiltMid, upright], [
    ...DEVICE_SCROLL.tilt.rotate,
  ] as number[]);
  const scale = useTransform(progress, [0, tiltMid, upright], [
    ...DEVICE_SCROLL.tilt.scale,
  ] as number[]);
  const y = useTransform(progress, [0, tiltMid, upright], [
    ...DEVICE_SCROLL.tilt.y,
  ] as number[]);

  const width = useTransform(
    progress,
    [0, enterStart, entered, 1],
    [
      metrics.tabletWidth,
      metrics.tabletWidth,
      metrics.fullWidth,
      metrics.fullWidth,
    ],
  );
  const height = useTransform(
    progress,
    [0, enterStart, entered, 1],
    [
      metrics.tabletHeight,
      metrics.tabletHeight,
      metrics.fullHeight,
      metrics.fullHeight,
    ],
  );

  const shadowOpacity = useTransform(
    progress,
    [entered - 0.2, entered],
    [1, 0],
  );
  const frameRadius = useTransform(
    progress,
    [0, upright, radiusFlattenStart, entered],
    [
      DEVICE_SCROLL.bezelRadius,
      DEVICE_SCROLL.bezelRadius,
      DEVICE_SCROLL.bezelRadius,
      0,
    ],
  );
  const screenRadius = useTransform(
    progress,
    [0, upright, radiusFlattenStart, entered],
    [
      DEVICE_SCROLL.screenRadius,
      DEVICE_SCROLL.screenRadius,
      DEVICE_SCROLL.screenRadius,
      0,
    ],
  );
  const contentY = useTransform(
    progress,
    [entered, 1],
    [0, DEVICE_SCROLL.contentTravel],
  );

  return {
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
  };
}
