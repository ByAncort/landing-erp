import { DemoForm } from "@/components/sections/demo-form";
import { demo, modulosContratables, site } from "@/content/site";

export function Demo() {
  const agendaExterna = /^https?:\/\//.test(site.ctaUrl);

  return (
    <section id="demo" aria-labelledby="demo-titulo" className="border-t border-line bg-surface py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <h2 id="demo-titulo" className="font-serif text-3xl leading-tight font-semibold text-ink sm:text-[2.5rem]">
            {demo.titulo}
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">{demo.texto}</p>
          {agendaExterna && (
            <p className="mt-6 text-ink-soft">
              ¿Prefieres elegir el horario?{" "}
              <a href={site.ctaUrl} target="_blank" rel="noopener" className="font-medium text-accent underline underline-offset-4">
                Agenda directamente
              </a>
              .
            </p>
          )}
        </div>

        <DemoForm
          modulos={modulosContratables.map(({ id, nombre }) => ({ id, nombre }))}
          rangos={demo.rangosEmpleados}
          aviso={demo.aviso}
        />
      </div>
    </section>
  );
}
