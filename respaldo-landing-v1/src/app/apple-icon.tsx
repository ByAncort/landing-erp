import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const celda = (color: string, opacity = 1) => (
    <div style={{ width: 52, height: 52, borderRadius: 13, background: color, opacity }} />
  );
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#17191c",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", width: 116, gap: 12 }}>
          {celda("#f7f6f2")}
          {celda("#1f4e79")}
          {celda("#f7f6f2")}
          {celda("#f7f6f2", 0.35)}
        </div>
      </div>
    ),
    size,
  );
}
