import { PendingBadge } from "@/components/ui/pending-badge";
import { faq, visibles } from "@/content/site";

/** <details> nativo: accesible sin JS y con las respuestas en el HTML para los buscadores. */
export function Faq() {
  const preguntas = visibles(faq.preguntas);

  return (
    <section id="preguntas" aria-labelledby="preguntas-titulo" className="py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <h2 id="preguntas-titulo" className="font-serif text-3xl leading-tight font-semibold text-ink sm:text-[2.5rem]">
            {faq.titulo}
          </h2>
          <p className="mt-4 text-ink-soft">
            ¿No está tu pregunta?{" "}
            <a href="#demo" className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
              Escríbenos
            </a>
            .
          </p>
        </div>

        <div className="border-t border-ink">
          {preguntas.map((p) => (
            <details key={p.pregunta} className="faq group border-b border-line">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-4 text-left">
                <h3 className="font-semibold text-ink">{p.pregunta}</h3>
                <span aria-hidden="true" className="font-mono text-lg leading-none text-ink-mute group-open:hidden">
                  +
                </span>
                <span aria-hidden="true" className="hidden font-mono text-lg leading-none text-ink-mute group-open:inline">
                  −
                </span>
              </summary>
              <div className="pr-10 pb-5">
                <p className="leading-relaxed text-ink-soft">{p.respuesta}</p>
                <PendingBadge motivo={p.pendiente} className="mt-2" />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
