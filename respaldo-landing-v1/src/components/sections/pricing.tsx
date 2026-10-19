import { ModulePicker } from "@/components/sections/module-picker";
import { SectionHeading } from "@/components/ui/section-heading";
import { modulosContratables, precios } from "@/content/site";

export function Pricing() {
  return (
    <section id="precios" aria-labelledby="precios-titulo" className="py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <SectionHeading id="precios-titulo" titulo={precios.titulo} texto={precios.texto} />
        <ModulePicker
          modulos={modulosContratables.map(({ id, nombre, beneficio }) => ({ id, nombre, beneficio }))}
          cta={precios.cta}
        />
      </div>
    </section>
  );
}
