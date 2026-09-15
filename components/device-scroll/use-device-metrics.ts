"use client";

import { useLayoutEffect, useState } from "react";
import {
  measureDeviceMetrics,
  type DeviceMetrics,
} from "@/components/device-scroll/constants";

const INITIAL_METRICS = measureDeviceMetrics(1280, 800);

export function useDeviceMetrics() {
  const [metrics, setMetrics] = useState<DeviceMetrics>(INITIAL_METRICS);

  useLayoutEffect(() => {
    const update = () => setMetrics(measureDeviceMetrics());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return metrics;
}
