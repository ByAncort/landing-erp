import { PendingBadge } from "@/components/ui/pending-badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { chile, visibles } from "@/content/site";

export function Chile() {
  const items = visibles(chile.items);

  return (
    <section id="impuestos" aria-labelledby="impuestos-titulo" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="impuestos-titulo" titulo={chile.titulo} texto={chile.texto} className="max-w-3xl" />

        <dl className="mt-12 grid grid-cols-1 border-t border-ink md:grid-cols-2 md:gap-x-12">
          {items.map((item) => (
            <div key={item.titulo} className="grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="font-semibold text-ink">
                {item.titulo}
                <PendingBadge motivo={item.pendiente} className="mt-1 block w-fit" />
              </dt>
              <dd className="leading-relaxed text-ink-soft">{item.texto}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
