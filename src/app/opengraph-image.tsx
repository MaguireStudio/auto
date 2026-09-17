import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const runtime = "nodejs";
export const alt = `${site.name} — electricians in ${site.address.city}, ${site.address.state}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated share card for links posted to Facebook, Instagram, and texts.
 * Without this, a shared link renders as a bare URL with no image.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#101319",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              background: "#f5a623",
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Inline SVG rather than an emoji: Satori ships no emoji font,
                so ⚡ renders as an empty box. */}
            <svg width="34" height="34" viewBox="0 0 32 32">
              <path d="M18.5 4 9 18h6l-1.5 10L23 13.5h-6L18.5 4Z" fill="#101319" />
            </svg>
          </div>
          <div
            style={{ display: "flex", color: "#fff", fontSize: 34, fontWeight: 800, letterSpacing: -0.5 }}
          >
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#fff",
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Electricians in
          </div>
          <div
            style={{
              display: "flex",
              color: "#fbbf24",
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {`${site.address.city}, Kentucky`}
          </div>
          <div style={{ display: "flex", color: "#aeb5c4", fontSize: 28, marginTop: 24 }}>
            {"Residential · Commercial · Agricultural"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #353b4a",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", color: "#fff", fontSize: 32, fontWeight: 700 }}>
            {site.phone}
          </div>
          <div style={{ display: "flex", color: "#808ba2", fontSize: 24 }}>
            {"Serving Calloway, Marshall & Graves counties"}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
