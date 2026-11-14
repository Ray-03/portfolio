import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0f1419",
          color: "#f4f6f8",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#9aa3ad",
          }}
        >
          {siteConfig.title}
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "#c5ccd3",
            maxWidth: 900,
          }}
        >
          React · Next.js · TypeScript · SEO · Indonesia
        </div>
      </div>
    ),
    size,
  );
}
