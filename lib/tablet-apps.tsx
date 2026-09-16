import { Mail } from "lucide-react";
import type { ReactNode } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import type { DockApp } from "@/components/ui/mac-os-dock";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import { siteConfig } from "@/lib/site";

export type TabletAppId = "portfolio" | "linkedin" | "github" | "email";

type AppLabelKey = keyof Dictionary["apps"];

export type TabletDockAppDef = {
  id: Extract<TabletAppId, "linkedin" | "github" | "email">;
  labelKey: Extract<AppLabelKey, "linkedin" | "github" | "email">;
  icon: ReactNode;
};

/** Dock = contact / social shortcuts only. */
export const tabletDockAppDefs: TabletDockAppDef[] = [
  { id: "linkedin", labelKey: "linkedin", icon: <FaLinkedin /> },
  { id: "github", labelKey: "github", icon: <FaGithub /> },
  { id: "email", labelKey: "email", icon: <Mail strokeWidth={1.75} /> },
];

export function getTabletDockApps(dict: Dictionary): DockApp[] {
  return tabletDockAppDefs.map((app) => ({
    id: app.id,
    name: dict.apps[app.labelKey],
    icon: app.icon,
  }));
}

export const tabletAppActions: Record<
  TabletAppId,
  { type: "external" | "section" | "email" | "page"; href: string }
> = {
  portfolio: { type: "page", href: "#portfolio" },
  linkedin: { type: "external", href: siteConfig.linkedin },
  github: { type: "external", href: siteConfig.github },
  email: { type: "email", href: siteConfig.email },
};

/**
 * Opens Gmail compose addressed to the site owner.
 * More reliable than mailto when no desktop mail app is configured.
 */
export function openEmailComposer(address: string) {
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(address)}`;
  window.open(gmail, "_blank", "noopener,noreferrer");
}
