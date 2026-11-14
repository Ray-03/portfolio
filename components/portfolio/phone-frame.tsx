"use client";

import { motion, type MotionValue } from "framer-motion";

const face =
  "absolute inset-0 rounded-[2.1rem] border shadow-[0_28px_50px_rgba(0,0,0,0.45)]";

type PhoneFrameProps = {
  src: string;
  alt: string;
  popZ: MotionValue<number>;
  popScale: MotionValue<number>;
  popOpacity: MotionValue<number>;
};

/** Leaned by the parent. Spins on Y — back face is rotateY(180). */
export function PhoneFrame({
  src,
  alt,
  popZ,
  popScale,
  popOpacity,
}: PhoneFrameProps) {
  return (
    <div
      className="relative h-[22rem] w-[11.25rem] sm:h-[24rem] sm:w-[12.25rem]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className={`${face} overflow-hidden border-[color:var(--gold)] bg-[var(--espresso)]`}
        style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
      >
        <div className="absolute inset-[0.45rem] overflow-hidden rounded-[1.7rem] bg-[#1a1612]">
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-contain object-bottom"
          />
        </div>
        <div className="absolute top-3 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
      </div>

      <div
        className={`${face} border-[color:var(--gold)] bg-[#3a2e22]`}
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
        }}
      >
        <div className="absolute top-8 left-7 h-16 w-16 rounded-2xl border border-[color:var(--gold)] bg-[#120f0d]">
          <div className="absolute top-3 left-3 size-5 rounded-full bg-[#2a241c] ring-1 ring-[color:var(--gold)]" />
          <div className="absolute right-3 bottom-3 size-2.5 rounded-full bg-[#d4af37]" />
        </div>
        <p className="absolute inset-x-6 bottom-12 text-center font-mono text-[10px] tracking-[0.22em] text-[color:var(--gold)] uppercase">
          Richard
        </p>
      </div>

      <motion.img
        src={src}
        alt=""
        aria-hidden
        style={{
          z: popZ,
          scale: popScale,
          opacity: popOpacity,
          transformStyle: "preserve-3d",
        }}
        className="pointer-events-none absolute top-[1.7rem] right-[0.7rem] bottom-[0.7rem] left-[0.7rem] object-contain object-bottom"
      />
    </div>
  );
}
