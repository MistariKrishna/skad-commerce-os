import { ImageResponse } from "next/og";

export const alt = "SKAD CommerceOS: you bring the idea, we build the brand, the store and the sales.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b1a3b",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", width: 20, height: 20, borderRadius: 999, background: "#2ba6f0" }} />
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: 2 }}>SKAD CommerceOS</div>
        </div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.08, maxWidth: 980 }}>
          You bring the idea. We build the brand, the store and the sales.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, color: "#7cc4f5" }}>
          <div style={{ display: "flex", width: 56, height: 4, borderRadius: 4, background: "#1e5eeb" }} />
          Build, launch and grow, with one team
        </div>
      </div>
    ),
    { ...size }
  );
}