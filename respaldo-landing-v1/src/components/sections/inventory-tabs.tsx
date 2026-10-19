"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Panel = { id: string; nombre: string; contenido: React.ReactNode };

export function InventoryTabs({ paneles }: { paneles: Panel[] }) {
  const [activo, setActivo] = useState(0);
  const base = useId();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const mover = (indice: number) => {
    const siguiente = (indice + paneles.length) % paneles.length;
    setActivo(siguiente);
    tabsRef.current[siguiente]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Vistas del módulo de inventario"
        className="flex gap-6 border-b border-line"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") mover(activo + 1);
          if (e.key === "ArrowLeft") mover(activo - 1);
        }}
      >
        {paneles.map((p, i) => (
          <button
            key={p.id}
            ref={(el) => {
              tabsRef.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${base}-tab-${p.id}`}
            aria-selected={activo === i}
            aria-controls={`${base}-panel-${p.id}`}
            tabIndex={activo === i ? 0 : -1}
            onClick={() => setActivo(i)}
            className={cn(
              "-mb-px border-b-2 pb-2.5 text-sm font-medium transition-colors duration-150",
              activo === i ? "border-ink text-ink" : "border-transparent text-ink-mute hover:text-ink",
            )}
          >
            {p.nombre}
          </button>
        ))}
      </div>

      <div className="mt-5 grid">
        {paneles.map((p, i) => (
          <div
            key={p.id}
            role="tabpanel"
            id={`${base}-panel-${p.id}`}
            aria-labelledby={`${base}-tab-${p.id}`}
            aria-hidden={activo !== i}
            inert={activo !== i}
            className={cn(
              "col-start-1 row-start-1 transition-opacity duration-200 motion-reduce:transition-none",
              activo === i ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            {p.contenido}
          </div>
        ))}
      </div>
    </div>
  );
}
