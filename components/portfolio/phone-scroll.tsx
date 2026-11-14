"use client";

import dynamic from "next/dynamic";
import { useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const PhoneCanvas = dynamic(
  () =>
    import("@/components/portfolio/phone-canvas").then((m) => m.PhoneCanvas),
  { ssr: false },
);

type PhoneScrollProps = {
  aboutTitle: string;
  lead: string;
  name: string;
};

function PhonePlaceholder() {
  return (
    <div
      aria-hidden
      className="h-[28rem] w-[20rem] rounded-[2rem] border border-[color:var(--gold)]/40 bg-[var(--espresso)] sm:h-[32rem] sm:w-[24rem]"
      style={{ transform: "rotateZ(-22deg)" }}
    />
  );
}

/**
 * Reference reel: phone stays upright (top stays top), leaned on Z,
 * spins 360° on Y (back → side → front → side → back). Slight pitch on X.
 * 3D GLB loads lazily once the section nears the viewport.
 */
export function PhoneScroll({ aboutTitle, lead, name }: PhoneScrollProps) {
  const trackRef = useRef<HTMLElement>(null);
  const [mountCanvas, setMountCanvas] = useState(false);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setMountCanvas(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={trackRef}
      className="relative h-[240vh]"
      aria-labelledby="about-heading"
    >
      <div className="sticky top-16 flex min-h-[calc(100svh-5rem)] items-center">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-14 lg:gap-20">
          <div className="max-w-md">
            <h2
              id="about-heading"
              className="font-heading text-4xl font-medium tracking-[0.035em] text-foreground sm:text-5xl"
            >
              {aboutTitle}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85">
              {lead}
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            {mountCanvas ? (
              <PhoneCanvas
                progress={scrollYProgress}
                portraitSrc="/portrait.png"
                alt={name}
              />
            ) : (
              <PhonePlaceholder />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
