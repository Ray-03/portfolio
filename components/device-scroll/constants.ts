export const DEVICE_SCROLL = {
  /** Max tablet width in px (52rem) */
  maxWidth: 52 * 16,
  /** Landscape tablet ratio (height / width) */
  aspect: 10 / 16,
  /** Bezel inset around the screen */
  bezelPadding: 16,
  bezelRadius: 28,
  screenRadius: 14,
  /** Sticky scroll track height */
  trackHeightClass: "h-[320vh]",
  perspective: 1200,
  contentTravel: -480,
  spring: {
    stiffness: 120,
    damping: 28,
    mass: 0.28,
    restDelta: 0.0001,
  },
  /**
   * Scroll progress keyframes (0–1).
   * Tilt finishes early for a more sensitive recline → upright.
   */
  timeline: {
    tiltMid: 0.06,
    upright: 0.14,
    enterStart: 0.14,
    entered: 0.55,
    radiusFlattenStart: 0.45,
  },
  tilt: {
    rotate: [48, 12, 0],
    scale: [0.78, 0.92, 1],
    y: [36, 10, 0],
  },
} as const;

export type DeviceMetrics = {
  tabletWidth: number;
  tabletHeight: number;
  fullWidth: number;
  fullHeight: number;
};

export function measureDeviceMetrics(
  viewWidth = window.innerWidth,
  viewHeight = window.innerHeight,
): DeviceMetrics {
  const tabletWidth = Math.min(
    viewWidth * 0.88,
    DEVICE_SCROLL.maxWidth,
  );
  const tabletHeight = tabletWidth * DEVICE_SCROLL.aspect;

  return {
    tabletWidth,
    tabletHeight,
    // Outer frame = viewport + bezel; screen inset equals viewport exactly
    fullWidth: viewWidth + DEVICE_SCROLL.bezelPadding * 2,
    fullHeight: viewHeight + DEVICE_SCROLL.bezelPadding * 2,
  };
}
