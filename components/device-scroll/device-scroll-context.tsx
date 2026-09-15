"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { MotionValue } from "framer-motion";

export type DeviceScrollContextValue = {
  progress: MotionValue<number>;
  homeHeaderOpacity: MotionValue<number>;
};

const DeviceScrollContext = createContext<DeviceScrollContextValue | null>(
  null,
);

export function DeviceScrollProvider({
  value,
  children,
}: {
  value: DeviceScrollContextValue;
  children: ReactNode;
}) {
  return (
    <DeviceScrollContext.Provider value={value}>
      {children}
    </DeviceScrollContext.Provider>
  );
}

export function useDeviceScroll() {
  const ctx = useContext(DeviceScrollContext);
  if (!ctx) {
    throw new Error("useDeviceScroll must be used within DeviceScroll");
  }
  return ctx;
}
