import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.nombre}: inventario, ventas, compras, contabilidad e impuestos en un solo sistema, hecho en Chile`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const celda = (color: string, opacity = 1) => (
    <div style={{ width: 22, height: 22, borderRadius: 4, background: color, opacity }} />
  );

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
          background: "#f7f6f2",
          color: "#17191c",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", flexWrap: "wrap", width: 50, gap: 6 }}>
            {celda("#17191c")}
            {celda("#1f4e79")}
            {celda("#17191c")}
            {celda("#17191c", 0.3)}
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 600 }}>
            Necronet <span style={{ marginLeft: 10, color: "#62666e", fontWeight: 400 }}>ERP</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.08, maxWidth: 1000 }}>
            El ERP completo para empresas que crecieron más rápido que sus planillas.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid #17191c",
            paddingTop: 22,
            fontSize: 26,
            color: "#3d4148",
          }}
        >
          <div style={{ display: "flex" }}>Inventario · Ventas · Compras · Contabilidad · Impuestos</div>
          <div style={{ display: "flex" }}>Hecho en Chile</div>
        </div>
      </div>
    ),
    size,
  );
}
