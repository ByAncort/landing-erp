"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { site } from "@/content/site";

export type NavItem = { href: string; texto: string };

export function SiteHeader({ nav }: { nav: NavItem[] }) {
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setAbierto(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [abierto]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <a href="#inicio" className="rounded-sm">
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-ink-soft transition-colors duration-150 hover:text-ink">
                  {item.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.ctaUrl}
            className="press hidden h-9 items-center rounded-md bg-ink px-4 text-sm font-medium text-white hover:bg-black sm:inline-flex"
          >
            {site.ctaTexto}
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-md text-ink lg:hidden"
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setAbierto((v) => !v)}
          >
            {abierto ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="menu-movil" hidden={!abierto} className="border-t border-line bg-canvas px-4 pb-5 sm:px-6 lg:hidden">
        <nav aria-label="Menú móvil">
          <ul className="divide-y divide-line">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setAbierto(false)} className="block py-3 text-base text-ink">
                  {item.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={site.ctaUrl}
          onClick={() => setAbierto(false)}
          className="mt-3 flex h-11 items-center justify-center rounded-md bg-ink text-[15px] font-medium text-white"
        >
          {site.ctaTexto}
        </a>
      </div>
    </header>
  );
}
