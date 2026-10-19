import { ModulosProvider } from "@/components/modulos-context";
import { AiAgents } from "@/components/sections/ai-agents";
import { Chile } from "@/components/sections/chile";
import { Connected } from "@/components/sections/connected";
import { Demo } from "@/components/sections/demo";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Implementation } from "@/components/sections/implementation";
import { Inventory } from "@/components/sections/inventory";
import { Modules } from "@/components/sections/modules";
import { Pricing } from "@/components/sections/pricing";
import { Problem } from "@/components/sections/problem";
import { Trust } from "@/components/sections/trust";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader, type NavItem } from "@/components/site-header";
import { ia, visibles } from "@/content/site";
import { datosEstructuradosFaq } from "@/lib/seo";
import { jsonLd } from "@/lib/utils";

export default function Home() {
  const nav: NavItem[] = [
    { href: "#modulos", texto: "Módulos" },
    { href: "#inventario", texto: "Inventario" },
    { href: "#impuestos", texto: "Impuestos" },
    ...(visibles(ia.items).length > 0 ? [{ href: "#ia", texto: "IA" }] : []),
    { href: "#precios", texto: "Precios" },
    { href: "#preguntas", texto: "Preguntas" },
  ];

  return (
    <ModulosProvider>
      <SiteHeader nav={nav} />
      <main id="contenido">
        <Hero />
        <Problem />
        <Modules />
        <Inventory />
        <Connected />
        <AiAgents />
        <Chile />
        <Implementation />
        <Pricing />
        <Trust />
        <Faq />
        <Demo />
      </main>
      <SiteFooter nav={nav} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(datosEstructuradosFaq())} />
    </ModulosProvider>
  );
}
