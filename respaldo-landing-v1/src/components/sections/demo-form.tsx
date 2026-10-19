"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, LoaderCircle } from "lucide-react";
import { useModulos } from "@/components/modulos-context";
import type { ModuloId } from "@/content/site";
import { cn } from "@/lib/utils";

type Estado = { tipo: "inicial" } | { tipo: "enviando" } | { tipo: "listo" } | { tipo: "error"; mensaje: string };
type Errores = Partial<Record<string, string[]>>;

const campoBase =
  "mt-1.5 block h-11 w-full rounded-md border border-line-strong bg-surface px-3 text-[15px] text-ink placeholder:text-ink-mute/70 transition-colors duration-150 focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent aria-[invalid=true]:border-red-700";

export function DemoForm({
  modulos,
  rangos,
  aviso,
}: {
  modulos: { id: ModuloId; nombre: string }[];
  rangos: readonly string[];
  aviso: string;
}) {
  const { seleccion, alternar } = useModulos();
  const [estado, setEstado] = useState<Estado>({ tipo: "inicial" });
  const [errores, setErrores] = useState<Errores>({});
  const confirmacion = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (estado.tipo === "listo") confirmacion.current?.focus();
  }, [estado.tipo]);

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);
    setEstado({ tipo: "enviando" });
    setErrores({});

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: datos.get("nombre"),
          empresa: datos.get("empresa"),
          cargo: datos.get("cargo"),
          email: datos.get("email"),
          telefono: datos.get("telefono") ?? "",
          empleados: datos.get("empleados"),
          modulos: [...seleccion],
          sitio: datos.get("sitio") ?? "",
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errores?: Errores };
      if (res.ok && json.ok) {
        setEstado({ tipo: "listo" });
        return;
      }
      setErrores(json.errores ?? {});
      setEstado({ tipo: "error", mensaje: json.error ?? "No pudimos enviar la solicitud. Intenta de nuevo." });
    } catch {
      setEstado({ tipo: "error", mensaje: "No hay conexión. Revisa tu internet e intenta de nuevo." });
    }
  }

  if (estado.tipo === "listo") {
    return (
      <div ref={confirmacion} tabIndex={-1} role="status" className="border-t border-ink pt-6 outline-none">
        <h3 className="font-serif text-2xl font-semibold text-ink">Recibimos tu solicitud</h3>
        <p className="mt-2 max-w-md leading-relaxed text-ink-soft">
          Te vamos a escribir al correo que dejaste para coordinar la demo.
        </p>
      </div>
    );
  }

  const enviando = estado.tipo === "enviando";
  const error = (campo: string) => errores[campo]?.[0];

  return (
    <form onSubmit={enviar} className="relative border-t border-ink pt-6" aria-describedby="aviso-datos">
      <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
        <Campo id="nombre" etiqueta="Nombre" error={error("nombre")}>
          <input id="nombre" name="nombre" required minLength={2} autoComplete="name" className={campoBase} aria-invalid={!!error("nombre")} />
        </Campo>
        <Campo id="empresa" etiqueta="Empresa" error={error("empresa")}>
          <input id="empresa" name="empresa" required minLength={2} autoComplete="organization" className={campoBase} aria-invalid={!!error("empresa")} />
        </Campo>
        <Campo id="cargo" etiqueta="Cargo" error={error("cargo")}>
          <input id="cargo" name="cargo" required minLength={2} autoComplete="organization-title" className={campoBase} aria-invalid={!!error("cargo")} />
        </Campo>
        <Campo id="empleados" etiqueta="N° de empleados" error={error("empleados")}>
          <div className="relative">
            <select
              id="empleados"
              name="empleados"
              required
              defaultValue=""
              className={cn(campoBase, "appearance-none pr-10 invalid:text-ink-mute")}
              aria-invalid={!!error("empleados")}
            >
              <option value="" disabled>
                Selecciona un rango
              </option>
              {rangos.map((r) => (
                <option key={r} value={r} className="text-ink">
                  {r}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-ink-mute" />
          </div>
        </Campo>
        <Campo id="email" etiqueta="Correo de trabajo" error={error("email")}>
          <input id="email" name="email" type="email" required autoComplete="email" inputMode="email" className={campoBase} aria-invalid={!!error("email")} />
        </Campo>
        <Campo id="telefono" etiqueta="Teléfono" opcional error={error("telefono")}>
          <input id="telefono" name="telefono" type="tel" autoComplete="tel" placeholder="+56 9" className={campoBase} aria-invalid={!!error("telefono")} />
        </Campo>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium text-ink">
          Módulos de interés <span className="font-normal text-ink-mute">(opcional)</span>
        </legend>
        <div className="mt-2.5 flex flex-wrap gap-x-6 gap-y-2.5">
          {modulos.map((m) => (
            <label key={m.id} className="flex cursor-pointer items-center gap-2 text-[15px] text-ink">
              <input
                type="checkbox"
                name="modulos"
                value={m.id}
                checked={seleccion.has(m.id)}
                onChange={() => alternar(m.id)}
                className="size-4 accent-accent"
              />
              {m.nombre}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="sitio">No completar</label>
        <input id="sitio" name="sitio" tabIndex={-1} autoComplete="off" />
      </div>

      {estado.tipo === "error" && (
        <p role="alert" className="mt-6 border-l-2 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-900">
          {estado.mensaje}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <button
          type="submit"
          disabled={enviando}
          className="press inline-flex h-11 items-center justify-center gap-2 rounded-md bg-ink px-6 text-[15px] font-medium text-white hover:bg-black disabled:cursor-wait disabled:opacity-80"
        >
          {enviando && <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />}
          {enviando ? "Enviando…" : "Solicitar demo"}
        </button>
        <p id="aviso-datos" className="text-sm text-ink-mute">
          {aviso}
        </p>
      </div>
    </form>
  );
}

function Campo({
  id,
  etiqueta,
  opcional,
  error,
  children,
}: {
  id: string;
  etiqueta: string;
  opcional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {etiqueta} {opcional && <span className="font-normal text-ink-mute">(opcional)</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-red-800">{error}</p>}
    </div>
  );
}
