import { faq, modulos, site, visibles } from "@/content/site";

const orgId = `${site.url}/#organizacion`;
const websiteId = `${site.url}/#sitio`;
const softwareId = `${site.url}/#software`;

/** Datos estructurados del sitio: organización, sitio web, página y producto. */
export function datosEstructuradosSitio() {
  const sameAs = site.redes.map((r) => r.url);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: site.empresa,
        url: site.url,
        logo: `${site.url}/icon.svg`,
        description:
          "Empresa chilena de servicios tecnológicos especializada en transformación digital, integraciones, analítica e IA agéntica.",
        areaServed: { "@type": "Country", name: "Chile" },
        ...(site.legal.razonSocial ? { legalName: site.legal.razonSocial } : {}),
        ...(site.legal.rut ? { taxID: site.legal.rut } : {}),
        ...(site.contacto.email ? { email: site.contacto.email } : {}),
        ...(site.contacto.telefono ? { telephone: site.contacto.telefono } : {}),
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.nombre,
        inLanguage: site.idioma,
        publisher: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        "@id": `${site.url}/#pagina`,
        url: site.url,
        name: site.seo.titulo,
        description: site.seo.descripcion,
        inLanguage: site.idioma,
        isPartOf: { "@id": websiteId },
        about: { "@id": softwareId },
        primaryImageOfPage: `${site.url}/opengraph-image`,
      },
      {
        "@type": "SoftwareApplication",
        "@id": softwareId,
        name: site.nombre,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "ERP",
        operatingSystem: "Web",
        description: site.seo.descripcion,
        inLanguage: site.idioma,
        areaServed: { "@type": "Country", name: "Chile" },
        publisher: { "@id": orgId },
        featureList: modulos.map(
          (m) => `${m.nombre}: ${m.alcance.join(", ")}`,
        ),
      },
    ],
  };
}

/** FAQPage solo con las preguntas que efectivamente se muestran en la página. */
export function datosEstructuradosFaq() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: visibles(faq.preguntas).map((p) => ({
      "@type": "Question",
      name: p.pregunta,
      acceptedAnswer: { "@type": "Answer", text: p.respuesta },
    })),
  };
}
