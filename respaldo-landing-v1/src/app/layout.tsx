import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import { site } from "@/content/site";
import { datosEstructuradosSitio } from "@/lib/seo";
import { jsonLd } from "@/lib/utils";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  display: "swap",
});

// Solo se usa en títulos: un archivo estático de 600 pesa bastante menos que el variable.
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.titulo,
    template: `%s | ${site.nombre}`,
  },
  description: site.seo.descripcion,
  applicationName: site.nombre,
  authors: [{ name: site.empresa, url: site.url }],
  creator: site.empresa,
  publisher: site.empresa,
  category: "business",
  alternates: {
    canonical: "/",
    languages: { "es-CL": "/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.nombre,
    title: site.seo.ogTitulo,
    description: site.seo.ogDescripcion,
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.ogTitulo,
    description: site.seo.ogDescripcion,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={site.idioma} className={`${plexSans.variable} ${sourceSerif.variable} ${plexMono.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#contenido"
          className="sr-only z-[60] rounded-md bg-ink px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Saltar al contenido
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(datosEstructuradosSitio())} />
      </body>
    </html>
  );
}
