"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
  type MouseEvent,
} from "react";
import { cn } from "@/lib/utils";

export type DockApp = {
  id: string;
  name: string;
  /** Image URL or React node (e.g. lucide icon). Swap later freely. */
  icon: string | ReactNode;
};

type MacOSDockProps = {
  apps: DockApp[];
  onAppClick: (appId: string) => void;
  openApps?: string[];
  className?: string;
};

type DockConfig = {
  baseIconSize: number;
  maxScale: number;
  effectWidth: number;
};

/** SSR-safe defaults — never read `window` during the initial render. */
const DEFAULT_CONFIG: DockConfig = {
  baseIconSize: 56,
  maxScale: 1.6,
  effectWidth: 240,
};

function measureConfig(): DockConfig {
  const smallerDimension = Math.min(window.innerWidth, window.innerHeight);

  if (smallerDimension < 480) {
    return {
      baseIconSize: Math.round(Math.max(40, smallerDimension * 0.08)),
      maxScale: 1.4,
      effectWidth: Math.round(smallerDimension * 0.4),
    };
  }
  if (smallerDimension < 768) {
    return {
      baseIconSize: Math.round(Math.max(48, smallerDimension * 0.07)),
      maxScale: 1.5,
      effectWidth: Math.round(smallerDimension * 0.35),
    };
  }
  if (smallerDimension < 1024) {
    return {
      baseIconSize: Math.round(Math.max(56, smallerDimension * 0.06)),
      maxScale: 1.6,
      effectWidth: Math.round(smallerDimension * 0.3),
    };
  }
  return {
    baseIconSize: Math.round(
      Math.max(64, Math.min(80, smallerDimension * 0.05)),
    ),
    maxScale: 1.8,
    effectWidth: 300,
  };
}

function layoutCenters(
  count: number,
  iconSize: number,
  spacing: number,
  scales?: number[],
) {
  let x = 0;
  return Array.from({ length: count }, (_, index) => {
    const scale = scales?.[index] ?? 1;
    const width = iconSize * scale;
    const center = x + width / 2;
    x += width + spacing;
    return center;
  });
}

function DockIcon({
  icon,
  name,
  size,
}: {
  icon: string | ReactNode;
  name: string;
  size: number;
}) {
  if (typeof icon === "string") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={icon}
        alt={name}
        width={size}
        height={size}
        className="object-contain"
        draggable={false}
      />
    );
  }

  return (
    <div
      className="flex size-full items-center justify-center overflow-hidden rounded-[22%] bg-gradient-to-br from-white/90 to-white/70 text-neutral-800 shadow-sm dark:from-neutral-200 dark:to-neutral-400"
      style={{ width: size, height: size }}
    >
      <div className="flex size-[58%] items-center justify-center [&_svg]:size-full">
        {icon}
      </div>
    </div>
  );
}

export function MacOSDock({
  apps,
  onAppClick,
  openApps = [],
  className = "",
}: MacOSDockProps) {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [config, setConfig] = useState<DockConfig>(DEFAULT_CONFIG);
  const { baseIconSize, maxScale, effectWidth } = config;
  const minScale = 1;
  const baseSpacing = Math.max(4, Math.round(baseIconSize * 0.08));

  const [currentScales, setCurrentScales] = useState<number[]>(() =>
    apps.map(() => minScale),
  );
  const [currentPositions, setCurrentPositions] = useState<number[]>(() =>
    layoutCenters(
      apps.length,
      DEFAULT_CONFIG.baseIconSize,
      Math.max(4, Math.round(DEFAULT_CONFIG.baseIconSize * 0.08)),
    ),
  );

  const dockRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastMouseMoveTime = useRef(0);
  const scalesRef = useRef(currentScales);
  const positionsRef = useRef(currentPositions);

  useEffect(() => {
    scalesRef.current = currentScales;
  }, [currentScales]);

  useEffect(() => {
    positionsRef.current = currentPositions;
  }, [currentPositions]);

  // Match viewport only after mount to avoid SSR/client hydration mismatch
  useEffect(() => {
    const apply = () => setConfig(measureConfig());
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  const calculateTargetMagnification = useCallback(
    (mousePosition: number | null) => {
      if (mousePosition === null) {
        return apps.map(() => minScale);
      }

      return apps.map((_, index) => {
        const normalIconCenter =
          index * (baseIconSize + baseSpacing) + baseIconSize / 2;
        const minX = mousePosition - effectWidth / 2;
        const maxX = mousePosition + effectWidth / 2;

        if (normalIconCenter < minX || normalIconCenter > maxX) {
          return minScale;
        }

        const theta = ((normalIconCenter - minX) / effectWidth) * 2 * Math.PI;
        const cappedTheta = Math.min(Math.max(theta, 0), 2 * Math.PI);
        const scaleFactor = (1 - Math.cos(cappedTheta)) / 2;

        return minScale + scaleFactor * (maxScale - minScale);
      });
    },
    [apps, baseIconSize, baseSpacing, effectWidth, maxScale],
  );

  const calculatePositions = useCallback(
    (scales: number[]) =>
      layoutCenters(scales.length, baseIconSize, baseSpacing, scales),
    [baseIconSize, baseSpacing],
  );

  useEffect(() => {
    const nextScales = apps.map(() => minScale);
    const nextPositions = calculatePositions(nextScales);
    setCurrentScales(nextScales);
    setCurrentPositions(nextPositions);
    scalesRef.current = nextScales;
    positionsRef.current = nextPositions;
  }, [apps, calculatePositions]);

  const animateToTarget = useCallback(() => {
    const targetScales = calculateTargetMagnification(mouseX);
    const targetPositions = calculatePositions(targetScales);
    const lerpFactor = mouseX !== null ? 0.22 : 0.16;
    const prevScales = scalesRef.current;
    const prevPositions =
      positionsRef.current.length === targetPositions.length
        ? positionsRef.current
        : targetPositions;

    const nextScales = targetScales.map((target, index) => {
      const current = prevScales[index] ?? minScale;
      return current + (target - current) * lerpFactor;
    });
    const nextPositions = targetPositions.map((target, index) => {
      const current = prevPositions[index] ?? target;
      return current + (target - current) * lerpFactor;
    });

    scalesRef.current = nextScales;
    positionsRef.current = nextPositions;

    const scalesNeedUpdate = nextScales.some(
      (scale, index) => Math.abs(scale - targetScales[index]) > 0.002,
    );
    const positionsNeedUpdate = nextPositions.some(
      (pos, index) => Math.abs(pos - targetPositions[index]) > 0.1,
    );

    // Commit to React only when still moving — avoids idle re-renders
    if (scalesNeedUpdate || positionsNeedUpdate || mouseX !== null) {
      setCurrentScales(nextScales);
      setCurrentPositions(nextPositions);
      animationFrameRef.current = requestAnimationFrame(animateToTarget);
    } else {
      setCurrentScales(nextScales);
      setCurrentPositions(nextPositions);
    }
  }, [mouseX, calculateTargetMagnification, calculatePositions]);

  useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    // Only drive the magnification loop while interacting / settling
    animationFrameRef.current = requestAnimationFrame(animateToTarget);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animateToTarget]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseMoveTime.current < 16) return;
      lastMouseMoveTime.current = now;

      if (dockRef.current) {
        const rect = dockRef.current.getBoundingClientRect();
        const padX = Math.max(8, Math.round(baseIconSize * 0.12));
        setMouseX(e.clientX - rect.left - padX);
      }
    },
    [baseIconSize],
  );

  const handleMouseLeave = useCallback(() => {
    setMouseX(null);
  }, []);

  const createBounceAnimation = (element: HTMLElement, index: number) => {
    const bounceHeight =
      currentScales[index] > 1.3 ? -baseIconSize * 0.2 : -baseIconSize * 0.15;
    element.style.transition = "transform 0.2s ease-out";
    element.style.transform = `translateY(${bounceHeight}px)`;
    window.setTimeout(() => {
      element.style.transform = "translateY(0px)";
    }, 200);
  };

  const handleAppClick = (appId: string, index: number) => {
    const el = iconRefs.current[index];
    if (el) createBounceAnimation(el, index);
    onAppClick(appId);
  };

  const positions =
    currentPositions.length === apps.length
      ? currentPositions
      : layoutCenters(apps.length, baseIconSize, baseSpacing, currentScales);

  const contentWidth = Math.round(
    positions.length > 0
      ? Math.max(
          ...positions.map(
            (pos, index) =>
              pos + (baseIconSize * (currentScales[index] ?? 1)) / 2,
          ),
        )
      : apps.length * (baseIconSize + baseSpacing) - baseSpacing,
  );

  const paddingX = Math.max(8, Math.round(baseIconSize * 0.12));
  const paddingTop = Math.max(8, Math.round(baseIconSize * 0.12));
  const indicatorSize = Math.max(3, Math.min(4, Math.round(baseIconSize * 0.04)));
  const indicatorGap = Math.max(5, Math.round(baseIconSize * 0.08));
  const paddingBottom = Math.max(6, indicatorGap);
  const radius = Math.max(12, Math.round(baseIconSize * 0.4));

  return (
    <div
      ref={dockRef}
      className={cn("backdrop-blur-md", className)}
      style={{
        width: contentWidth + paddingX * 2,
        background: "rgba(45, 45, 45, 0.75)",
        borderRadius: radius,
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: `0 ${Math.max(4, Math.round(baseIconSize * 0.1))}px ${Math.max(16, Math.round(baseIconSize * 0.4))}px rgba(0, 0, 0, 0.4), 0 ${Math.max(2, Math.round(baseIconSize * 0.05))}px ${Math.max(8, Math.round(baseIconSize * 0.2))}px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.2)`,
        padding: `${paddingTop}px ${paddingX}px ${paddingBottom}px`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative"
        style={{ height: baseIconSize + indicatorGap, width: "100%" }}
      >
        {apps.map((app, index) => {
          const scale = currentScales[index] ?? 1;
          const position = positions[index] ?? 0;
          const scaledSize = Math.round(baseIconSize * scale);

          return (
            <div
              key={app.id}
              ref={(el) => {
                iconRefs.current[index] = el;
              }}
              className="absolute flex cursor-pointer flex-col items-center"
              title={app.name}
              onClick={() => handleAppClick(app.id, index)}
              style={{
                left: Math.round(position - scaledSize / 2),
                bottom: indicatorGap,
                width: scaledSize,
                height: scaledSize,
                transformOrigin: "bottom center",
                zIndex: Math.round(scale * 10),
              }}
            >
              <DockIcon icon={app.icon} name={app.name} size={scaledSize} />

              {openApps.includes(app.id) && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full bg-white/70"
                  style={{
                    bottom: -(indicatorGap / 2 + indicatorSize / 2),
                    width: indicatorSize,
                    height: indicatorSize,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MacOSDock;
