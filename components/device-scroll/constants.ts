export const DEVICE_SCROLL = {
  /** Max tablet width in px (52rem) */
  maxWidth: 52 * 16,
  /** Landscape tablet ratio (height / width) */
  aspect: 10 / 16,
  /** Portrait tablet ratio on narrow viewports (height / width) */
  aspectPortrait: 16 / 10,
  /** Below this width the intro device is portrait */
  portraitBelow: 768,
  /** Bezel inset around the screen */
  bezelPadding: 16,
  bezelRadius: 28,
  screenRadius: 14,
  /**
   * Scroll track length. Keep modest so enter finishes without a long empty stretch.
   */
  trackHeightClass: "h-[240vh]",
  perspective: 1200,
  /** No post-enter content pan */
  contentTravel: 0,
  spring: {
    stiffness: 100,
    damping: 30,
    mass: 0.25,
    restDelta: 0.001,
  },
  /**
   * Scroll progress keyframes (0–1).
   * Enter completes earlier than before for a tighter feel.
   */
  timeline: {
    tiltMid: 0.08,
    upright: 0.18,
    enterStart: 0.18,
    entered: 0.72,
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
  const portrait = viewWidth < DEVICE_SCROLL.portraitBelow;
  const aspect = portrait
    ? DEVICE_SCROLL.aspectPortrait
    : DEVICE_SCROLL.aspect;

  let tabletWidth = Math.min(
    viewWidth * (portrait ? 0.72 : 0.88),
    portrait ? 360 : DEVICE_SCROLL.maxWidth,
  );
  let tabletHeight = tabletWidth * aspect;

  const maxHeight = viewHeight * (portrait ? 0.7 : 0.85);
  if (tabletHeight > maxHeight) {
    tabletHeight = maxHeight;
    tabletWidth = tabletHeight / aspect;
  }

  return {
    tabletWidth,
    tabletHeight,
    fullWidth: viewWidth + DEVICE_SCROLL.bezelPadding * 2,
    fullHeight: viewHeight + DEVICE_SCROLL.bezelPadding * 2,
  };
}
