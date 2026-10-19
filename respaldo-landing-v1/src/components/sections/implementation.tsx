import { CtaLink } from "@/components/ui/cta-link";
import { PendingBadge } from "@/components/ui/pending-badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { implementacion, MOSTRAR_PENDIENTES } from "@/content/site";

export function Implementation() {
  return (
    <section id="implementacion" aria-labelledby="implementacion-titulo" className="border-y border-line bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="implementacion-titulo" titulo={implementacion.titulo} texto={implementacion.texto} />
        {implementacion.plazoEstimado ? (
          <p className="mt-3 text-ink-soft">
            Plazo estimado: <span className="font-medium text-ink">{implementacion.plazoEstimado}</span>
          </p>
        ) : (
          MOSTRAR_PENDIENTES && <PendingBadge motivo="Definir plazo estimado de implementación" className="mt-3" />
        )}

        <ol className="mt-12 grid grid-cols-1 border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
          {implementacion.pasos.map((p, i) => (
            <li key={p.titulo} className="border-b border-line py-6 sm:pr-8 lg:border-b-0">
              <span className="font-mono text-sm text-ink-mute">{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold text-ink">{p.titulo}</h3>
              <p className="mt-1.5 leading-relaxed text-ink-soft">{p.texto}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <CtaLink />
        </div>
      </div>
    </section>
  );
}
