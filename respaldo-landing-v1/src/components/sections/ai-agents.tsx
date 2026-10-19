import { PendingBadge } from "@/components/ui/pending-badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { ia, visibles } from "@/content/site";

/** Solo se publica lo que funciona hoy (ver `pendiente` en content/site.ts). */
export function AiAgents() {
  const items = visibles(ia.items);
  if (items.length === 0) return null;

  return (
    <section id="ia" aria-labelledby="ia-titulo" className="border-y border-line bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="ia-titulo" titulo={ia.titulo} texto={ia.texto} />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-10">
          {items.map((item, i) => (
            <article key={item.titulo} aria-labelledby={`ia-${i}`} className="border-t border-ink pt-5">
              <h3 id={`ia-${i}`} className="text-lg font-semibold text-ink">
                {item.titulo} <PendingBadge motivo={item.pendiente} className="ml-1 align-middle" />
              </h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{item.texto}</p>
              {"campos" in item && item.campos && (
                <div className="mt-5">
                  <p className="text-sm font-medium text-ink">Lo que lee del documento</p>
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-soft">
                    {item.campos.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
