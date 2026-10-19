import { preconnect } from "react-dom";
import SculptureHero from "@/components/ui/liquid-sculpture-hero";
import { ProductShot } from "@/components/product-shot";
import { hero, site } from "@/content/site";

const serif = "var(--font-source-serif), Georgia, serif";
const sans = "var(--font-plex-sans), system-ui, sans-serif";

export function Hero() {
  // la escultura es el elemento más grande del primer pantallazo: abrir la conexión a su CDN cuanto antes
  if (/^https?:\/\//.test(hero.escultura.src)) {
    preconnect(new URL(hero.escultura.src).origin, { crossOrigin: "anonymous" });
  }

  return (
    <>
      <SculptureHero
        id="inicio"
        src={hero.escultura.src}
        mobileSrc={hero.escultura.mobileSrc}
        imageAlt={hero.escultura.alt}
        showNav={false}
        themeToggle={false}
        loadFonts={false}
        showCredit={false}
        eyebrow=""
        headline={hero.tituloLineas}
        headlineAccent=""
        body={hero.subtitulo}
        primaryCta={{ label: site.ctaTexto, href: site.ctaUrl }}
        secondaryCta={{ label: hero.secundario.texto, href: hero.secundario.href }}
        hint={hero.escultura.pista}
        hintTouch={hero.escultura.pistaTactil}
        backdropText={hero.escultura.fondo}
        // mismo tono que el fondo plano de la imagen: en reposo se ve la imagen tal cual, sin recuadro
        background={hero.escultura.fondoImagen}
        imageBackground={hero.escultura.fondoImagen}
        textColor="#17191c"
        headingFont={serif}
        accentFont={serif}
        bodyFont={sans}
        height="calc(100svh - 4rem)"
        style={{ minHeight: 560 }}
      />

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
        <dl className="grid grid-cols-1 border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
          {hero.datos.map((d) => (
            <div key={d.titulo} className="border-b border-line py-4 sm:pr-6 lg:border-b-0">
              <dt className="text-sm font-semibold text-ink">{d.titulo}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-ink-soft">{d.texto}</dd>
            </div>
          ))}
        </dl>

        <ProductShot
          vista="tablero"
          src={site.capturas.tablero}
          className="mt-12 sm:mt-16"
          alt="Tablero general de Necronet ERP con ventas, compras, resultado, saldos por cobrar y por pagar y valor del inventario"
        />
      </div>
    </>
  );
}
