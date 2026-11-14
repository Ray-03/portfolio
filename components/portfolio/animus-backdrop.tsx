"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

function networkOptions(light: boolean): ISourceOptions {
  const ink = light ? "#120F0D" : "#F4ECD8";
  const line = light ? "#8C7853" : "#D4AF37";

  return {
    fullScreen: { enable: false },
    fpsLimit: 60,
    detectRetina: true,
    pauseOnBlur: true,
    motion: {
      disable: false,
      reduce: { factor: 1, value: false },
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: { enable: true, mode: "grab" },
      },
      modes: {
        grab: {
          distance: 200,
          links: { opacity: 0.22, color: line },
        },
      },
    },
    particles: {
      number: {
        value: 140,
        density: { enable: true, width: 900, height: 900 },
      },
      color: { value: ink },
      opacity: { value: light ? 0.16 : 0.12 },
      size: { value: { min: 1, max: 1.6 } },
      links: {
        enable: true,
        distance: 190,
        color: line,
        opacity: light ? 0.14 : 0.1,
        width: 0.5,
      },
      move: {
        enable: true,
        speed: 0.0875,
        direction: "none",
        outModes: { default: "bounce" },
      },
    },
  };
}

function ArchiveNetwork() {
  const { resolvedTheme } = useTheme();
  const light = resolvedTheme === "light";
  const options = useMemo(() => networkOptions(light), [light]);

  return (
    <Particles
      id="archive-network"
      className="absolute inset-0 h-full w-full"
      options={options}
    />
  );
}

export function AnimusBackdrop() {
  return (
    <ParticlesProvider init={async (engine) => loadSlim(engine)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="animus-vignette absolute inset-0" />
        <ArchiveNetwork />
      </div>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-30">
        <div className="animus-grain absolute inset-0" />
        <div className="animus-scanlines absolute inset-0" />
      </div>
    </ParticlesProvider>
  );
}
