import { InventoryTabs } from "@/components/sections/inventory-tabs";
import { ProductShot } from "@/components/product-shot";
import { SectionHeading } from "@/components/ui/section-heading";
import { inventario, site } from "@/content/site";

const alts = {
  movimientos: "Historial de movimientos de stock: recepciones, despachos, mermas, ajustes y transferencias con su motivo",
  transferencias: "Sub-inventarios de una bodega y formulario de transferencia desde Sin ubicar a Estante A",
  alertas: "Productos con stock bajo su mínimo",
} as const;

export function Inventory() {
  return (
    <section id="inventario" aria-labelledby="inventario-titulo" className="border-y border-line bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="inventario-titulo" titulo={inventario.titulo} texto={inventario.texto} className="max-w-3xl" />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
          <ul className="divide-y divide-line border-t border-ink">
            {inventario.capacidades.map((c) => (
              <li key={c.titulo} className="py-4">
                <h3 className="font-semibold text-ink">{c.titulo}</h3>
                <p className="mt-1 leading-relaxed text-ink-soft">{c.texto}</p>
              </li>
            ))}
          </ul>

          <InventoryTabs
            paneles={inventario.vistas.map((v) => ({
              id: v.id,
              nombre: v.nombre,
              contenido: <ProductShot vista={v.id} src={site.capturas[v.id]} alt={alts[v.id]} />,
            }))}
          />
        </div>
      </div>
    </section>
  );
}
