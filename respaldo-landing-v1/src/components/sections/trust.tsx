import { PendingBadge } from "@/components/ui/pending-badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { confianza, visibles } from "@/content/site";

export function Trust() {
  const items = visibles(confianza.items);

  return (
    <section id="seguridad" aria-labelledby="seguridad-titulo" className="border-y border-line bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="seguridad-titulo" titulo={confianza.titulo} />
        <ul className="mt-12 grid grid-cols-1 gap-x-12 border-t border-ink md:grid-cols-2">
          {items.map((item) => (
            <li key={item.titulo} className="border-b border-line py-5">
              <h3 className="font-semibold text-ink">
                {item.titulo} <PendingBadge motivo={item.pendiente} className="ml-1 align-middle" />
              </h3>
              <p className="mt-1 leading-relaxed text-ink-soft">{item.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
