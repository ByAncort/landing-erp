"use client";

import { createRef, useEffect, useMemo, useRef, useState } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";

type Paso = { id: string; titulo: string };

/** Recorrido de un documento entre módulos, con el Animated Beam de 21st.dev en tono sobrio. */
export function ConnectedFlow({ pasos }: { pasos: Paso[] }) {
  const contenedor = useRef<HTMLDivElement>(null);
  const nodos = useMemo(() => pasos.map(() => createRef<HTMLSpanElement>()), [pasos]);
  const [vertical, setVertical] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const actualizar = () => setVertical(mq.matches);
    actualizar();
    mq.addEventListener("change", actualizar);
    return () => mq.removeEventListener("change", actualizar);
  }, []);

  return (
    <div ref={contenedor} className="relative">
      <ol className="relative z-10 flex flex-col gap-7 md:flex-row md:justify-between md:gap-4">
        {pasos.map((p, i) => (
          <li key={p.id} className="flex items-center gap-4 md:w-36 md:flex-col md:items-start md:gap-3">
            <span
              ref={nodos[i]}
              className="grid size-7 shrink-0 place-items-center rounded-full border border-ink bg-surface font-mono text-xs text-ink"
            >
              {i + 1}
            </span>
            <span className="text-sm font-medium text-ink">{p.titulo}</span>
          </li>
        ))}
      </ol>

      {pasos.slice(0, -1).map((p, i) => (
        <AnimatedBeam
          key={`${p.id}-${vertical ? "v" : "h"}`}
          containerRef={contenedor}
          fromRef={nodos[i]}
          toRef={nodos[i + 1]}
          vertical={vertical}
          duration={5}
          pathWidth={1}
          pathColor="#c8c5bc"
          pathOpacity={1}
          gradientStartColor="#1f4e79"
          gradientStopColor="#1f4e79"
        />
      ))}
    </div>
  );
}
