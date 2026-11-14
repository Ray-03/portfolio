import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `404 | ${siteConfig.name}`,
  robots: { index: false, follow: false },
};

/** Any path under /[lang]/… that isn’t the home page. */
export default function UnmatchedLangRoute() {
  notFound();
}
