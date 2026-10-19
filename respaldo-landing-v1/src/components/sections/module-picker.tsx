"use client";

import { useModulos } from "@/components/modulos-context";
import { CtaLink } from "@/components/ui/cta-link";
import type { ModuloId } from "@/content/site";
import { cn } from "@/lib/utils";

export function ModulePicker({
  modulos,
  cta,
}: {
  modulos: { id: ModuloId; nombre: string; beneficio: string }[];
  cta: string;
}) {
  const { seleccion, alternar } = useModulos();
  const cantidad = seleccion.size;

  return (
    <div>
      <fieldset>
        <legend className="text-sm font-semibold text-ink">¿Qué módulos te interesan?</legend>
        <div className="mt-3 divide-y divide-line border-y border-line">
          {modulos.map((m) => {
            const marcado = seleccion.has(m.id);
            return (
              <label key={m.id} className="flex cursor-pointer items-start gap-3 py-3.5">
                <input
                  type="checkbox"
                  checked={marcado}
                  onChange={() => alternar(m.id)}
                  className="mt-0.5 size-4 shrink-0 accent-accent"
                />
                <span>
                  <span className={cn("block font-medium", marcado ? "text-accent" : "text-ink")}>{m.nombre}</span>
                  <span className="block text-sm text-ink-mute">{m.beneficio}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-mute" aria-live="polite">
          {cantidad === 0
            ? "Marca al menos un módulo."
            : `${cantidad} ${cantidad === 1 ? "módulo marcado" : "módulos marcados"}. Quedan seleccionados en el formulario.`}
        </p>
        <CtaLink href="#demo" className="shrink-0">
          {cta}
        </CtaLink>
      </div>
    </div>
  );
}
