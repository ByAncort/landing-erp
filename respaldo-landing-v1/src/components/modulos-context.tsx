"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ModuloId } from "@/content/site";

/** Módulos elegidos en "Precios", compartidos con el formulario de demo. */
type Ctx = {
  seleccion: ReadonlySet<ModuloId>;
  alternar: (id: ModuloId) => void;
};

const ModulosContext = createContext<Ctx | null>(null);

export function ModulosProvider({ children }: { children: React.ReactNode }) {
  const [seleccion, setSeleccion] = useState<ReadonlySet<ModuloId>>(() => new Set());

  const alternar = useCallback((id: ModuloId) => {
    setSeleccion((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ seleccion, alternar }), [seleccion, alternar]);
  return <ModulosContext value={value}>{children}</ModulosContext>;
}

export function useModulos() {
  const ctx = useContext(ModulosContext);
  if (!ctx) throw new Error("useModulos debe usarse dentro de <ModulosProvider>");
  return ctx;
}
