import { SectionHeading } from "@/components/ui/section-heading";
import { problema } from "@/content/site";

export function Problem() {
  return (
    <section aria-labelledby="problema-titulo" className="border-t border-line bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="problema-titulo" titulo={problema.titulo} />

        <ul className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
          {problema.dolores.map((d) => (
            <li key={d.titulo} className="md:px-8 md:first:pl-0 md:last:pr-0">
              <h3 className="text-lg font-semibold text-ink">{d.titulo}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{d.texto}</p>
            </li>
          ))}
        </ul>

        <p className="mt-14 max-w-3xl font-serif text-xl leading-relaxed text-ink sm:text-2xl">{problema.cierre}</p>
      </div>
    </section>
  );
}
