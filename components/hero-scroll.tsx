"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { DeviceScroll } from "@/components/device-scroll";
import { siteConfig } from "@/lib/site";

type HeroScrollProps = {
  children: ReactNode;
  name?: string;
  title?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function HeroScroll({
  children,
  name = siteConfig.name,
  title = siteConfig.title,
  imageSrc = siteConfig.heroImage,
  imageAlt = siteConfig.heroImageAlt,
}: HeroScrollProps) {
  return (
    <DeviceScroll
      titleComponent={
        <>
          <p className="text-sm font-medium tracking-wide text-muted-foreground md:text-base">
            {title}
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-foreground md:text-[5.5rem] md:leading-none">
            {name}
          </h1>
        </>
      }
    >
      <div className="relative min-h-full">
        <div className="relative h-64 w-full overflow-hidden md:h-80">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            draggable={false}
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>
        <div className="relative z-10 -mt-10 px-4 pb-10 md:px-8">{children}</div>
      </div>
    </DeviceScroll>
  );
}
