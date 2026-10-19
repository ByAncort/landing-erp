import { Logo } from "@/components/logo";
import { AnioActual } from "@/components/ui/anio-actual";
import type { NavItem } from "@/components/site-header";
import { site } from "@/content/site";

export function SiteFooter({ nav }: { nav: NavItem[] }) {
  const legal = [site.legal.razonSocial, site.legal.rut && `RUT ${site.legal.rut}`, site.legal.direccion].filter(Boolean);
  const contacto = [
    site.contacto.email && { texto: site.contacto.email, href: `mailto:${site.contacto.email}` },
    site.contacto.telefono && { texto: site.contacto.telefono, href: `tel:${site.contacto.telefono.replace(/\s/g, "")}` },
  ].filter(Boolean) as { texto: string; href: string }[];

  return (
    <footer className="bg-ink text-canvas/70">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Logo tono="oscuro" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            {site.nombre} es un producto de {site.empresa}, empresa chilena de servicios tecnológicos: transformación digital,
            integraciones, analítica e IA agéntica.
          </p>
        </div>

        <nav aria-label="Pie de página">
          <p className="text-sm font-medium text-canvas">Producto</p>
          <ul className="mt-3 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-canvas">
                  {item.texto}
                </a>
              </li>
            ))}
            <li>
              <a href={site.ctaUrl} className="hover:text-canvas">
                {site.ctaTexto}
              </a>
            </li>
          </ul>
        </nav>

        {(contacto.length > 0 || site.redes.length > 0) && (
          <div>
            <p className="text-sm font-medium text-canvas">Contacto</p>
            <ul className="mt-3 space-y-2 text-sm">
              {contacto.map((c) => (
                <li key={c.href}>
                  <a href={c.href} className="hover:text-canvas">
                    {c.texto}
                  </a>
                </li>
              ))}
              {site.redes.map((r) => (
                <li key={r.url}>
                  <a href={r.url} target="_blank" rel="noopener" className="hover:text-canvas">
                    {r.nombre}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-canvas/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs sm:flex-row sm:justify-between sm:px-6">
          <p>
            © <AnioActual /> {site.empresa}. Hecho en Chile.
          </p>
          {legal.length > 0 && <p>{legal.join(" · ")}</p>}
        </div>
      </div>
    </footer>
  );
}
