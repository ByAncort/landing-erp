import { ConnectedFlow } from "@/components/sections/connected-flow";
import { SectionHeading } from "@/components/ui/section-heading";
import { conectado } from "@/content/site";

export function Connected() {
  return (
    <section id="conectado" aria-labelledby="conectado-titulo" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="conectado-titulo" titulo={conectado.titulo} texto={conectado.texto} />

        <div className="mt-12 rounded-lg border border-line bg-surface px-5 py-7 sm:px-8">
          <ConnectedFlow pasos={conectado.pasos} />
        </div>

        <table className="mt-10 block w-full border-collapse border-t border-ink text-left md:table md:border-t-0">
          <caption className="sr-only">Efecto de cada acción en inventario, contabilidad e impuestos</caption>
          <thead className="hidden md:table-header-group">
            <tr className="border-b border-ink text-sm">
              <th scope="col" className="py-3 pr-6 font-semibold text-ink md:w-[34%]">
                Cuando…
              </th>
              <th scope="col" className="py-3 font-semibold text-ink">
                El sistema
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {conectado.efectos.map((e) => (
              <tr key={e.accion} className="block border-b border-line py-4 align-top md:table-row md:py-0">
                <th scope="row" className="block pr-6 font-medium text-ink md:table-cell md:py-4">
                  {e.accion}
                </th>
                <td className="mt-1 block leading-relaxed text-ink-soft md:table-cell md:py-4">{e.resultado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
