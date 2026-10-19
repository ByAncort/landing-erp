import { SectionHeading } from "@/components/ui/section-heading";
import { modulos, modulosSeccion } from "@/content/site";

export function Modules() {
  return (
    <section id="modulos" aria-labelledby="modulos-titulo" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="modulos-titulo" titulo={modulosSeccion.titulo} texto={modulosSeccion.texto} />

        <div className="mt-12 border-t border-ink">
          {modulos.map((m) => (
            <article
              key={m.id}
              aria-labelledby={`modulo-${m.id}`}
              className="grid grid-cols-1 gap-3 border-b border-line py-8 md:grid-cols-[14rem_1fr] md:gap-10 lg:grid-cols-[16rem_1fr_16rem]"
            >
              <div>
                <h3 id={`modulo-${m.id}`} className="text-xl font-semibold text-ink">
                  {m.nombre}
                </h3>
                {m.incluido && <p className="mt-1 text-sm text-ink-mute">Incluido en todos los planes</p>}
              </div>
              <div>
                <p className="font-medium text-ink">{m.beneficio}</p>
                <p className="mt-2 leading-relaxed text-ink-soft">{m.detalle}</p>
                {m.id === "inventario" && (
                  <a href="#inventario" className="mt-3 inline-block text-sm font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
                    Ver el módulo de inventario
                  </a>
                )}
              </div>
              <ul aria-label={`Qué incluye ${m.nombre}`} className="text-sm leading-7 text-ink-soft md:col-start-2 lg:col-start-auto">
                {m.alcance.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
