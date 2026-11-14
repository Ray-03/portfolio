"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PhoneFrame } from "@/components/portfolio/phone-frame";

type PhoneScrollProps = {
  aboutTitle: string;
  lead: string;
  name: string;
};

/**
 * Reference reel: phone stays upright (top stays top), leaned on Z,
 * spins 360° on Y (back → side → front → side → back). Slight pitch on X.
 */
export function PhoneScroll({ aboutTitle, lead, name }: PhoneScrollProps) {
  const trackRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [180, 540]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [18, 12, 18]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [28, 0, 18]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [12, -8, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.82, 1.05, 0.82]);
  const popZ = useTransform(scrollYProgress, [0.36, 0.5, 0.64], [0, 170, 0]);
  const popScale = useTransform(scrollYProgress, [0.36, 0.5, 0.64], [0.92, 1.28, 0.92]);
  const popOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);

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

          <div className="flex justify-center [perspective:1200px] md:justify-end">
            <div
              style={{
                transform: "rotateZ(-22deg)",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                style={{
                  rotateY,
                  rotateX,
                  x,
                  y,
                  scale,
                  transformStyle: "preserve-3d",
                }}
              >
                <PhoneFrame
                  src="/portrait.png"
                  alt={name}
                  popZ={popZ}
                  popScale={popScale}
                  popOpacity={popOpacity}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
