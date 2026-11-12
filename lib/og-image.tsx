// Social preview image (shown when a link is shared on WhatsApp, Facebook,
// LinkedIn…). One branded layout, reused by every opengraph-image route.

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { business } from "@/config/business";

export const ogSize = { width: 1200, height: 630 };

const logo = readFile(join(process.cwd(), "public/images/logo/logowhite-trimmed.png")).then(
  (data) => `data:image/png;base64,${data.toString("base64")}`,
);

export async function renderOgImage({ title, subtitle }: { title: string; subtitle: string }) {
  const logoSrc = await logo;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0f4557",
          color: "#ffffff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
        <img src={logoSrc} width={186} height={120} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", width: 72, height: 6, borderRadius: 3, background: "#8ccb80" }} />
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 980 }}>{title}</div>
          <div style={{ display: "flex", fontSize: 30, color: "rgba(255,255,255,0.8)" }}>
            {subtitle} · {business.area}
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
