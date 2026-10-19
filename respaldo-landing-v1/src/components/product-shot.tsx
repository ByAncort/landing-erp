import Image from "next/image";
import { LogoMark } from "@/components/logo";
import { cn } from "@/lib/utils";

/**
 * Marco de captura del producto.
 * Con `src` muestra la captura real (la spec pide que sean protagonistas).
 * Sin `src` dibuja una vista esquemática con las etiquetas reales del ERP y sin cifras.
 */

export type Vista = "tablero" | "movimientos" | "transferencias" | "alertas";

const menu = ["Inicio", "Ventas", "Compras", "Inventario", "Contabilidad"];
const activo: Record<Vista, string> = {
  tablero: "Inicio",
  movimientos: "Inventario",
  transferencias: "Inventario",
  alertas: "Inventario",
};

export function ProductShot({
  vista,
  src,
  alt,
  prioridad = false,
  className,
}: {
  vista: Vista;
  src?: string | null;
  alt: string;
  prioridad?: boolean;
  className?: string;
}) {
  return (
    <figure className={cn("overflow-hidden rounded-lg border border-line-strong bg-surface", className)}>
      <div className="@container relative aspect-[4/3] sm:aspect-[16/10]">
        {src ? (
          <Image src={src} alt={alt} fill priority={prioridad} sizes="(min-width: 1024px) 1100px, 100vw" className="object-cover object-top" />
        ) : (
          <div role="img" aria-label={alt} className="absolute inset-0 flex flex-col">
            <div className="flex h-10 shrink-0 items-center gap-5 border-b border-line px-4">
              <LogoMark className="size-4" />
              <ul className="flex gap-4 overflow-hidden text-[11px] text-ink-mute @lg:text-xs">
                {menu.map((m) => (
                  <li key={m} className={cn("whitespace-nowrap", m === activo[vista] && "font-medium text-ink")}>
                    {m}
                  </li>
                ))}
              </ul>
              <span className="ml-auto size-5 shrink-0 rounded-full bg-line" />
            </div>
            <div className="min-h-0 flex-1">
              {vista === "tablero" && <Tablero />}
              {vista === "movimientos" && <Movimientos />}
              {vista === "transferencias" && <Transferencias />}
              {vista === "alertas" && <Alertas />}
            </div>
          </div>
        )}
      </div>
    </figure>
  );
}

/* -------------------------------------------------------------------------- */

function Barra({ w, className }: { w: string; className?: string }) {
  return <span className={cn("block h-2 rounded-sm bg-line", className)} style={{ width: w }} />;
}

function Etiqueta({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("block text-[10px] text-ink-mute @lg:text-[11px]", className)}>{children}</span>;
}

function Titulo({ children }: { children: React.ReactNode }) {
  return <span className="text-xs font-semibold text-ink @lg:text-sm">{children}</span>;
}

const indicadores = ["Ventas", "Compras", "Resultado", "Por cobrar", "Por pagar", "Valor del inventario"];
const meses = [
  [40, 30],
  [52, 41],
  [47, 44],
  [60, 38],
  [56, 49],
  [68, 45],
  [64, 52],
  [75, 50],
];

function Tablero() {
  return (
    <div className="flex h-full flex-col gap-3 p-3 @lg:p-5">
      <div className="flex items-center justify-between">
        <Titulo>Tablero general</Titulo>
        <span className="text-[10px] text-ink-mute @lg:text-[11px]">Período: 1 de enero a hoy</span>
      </div>

      <div className="grid grid-cols-3 border-y border-line @lg:grid-cols-6">
        {indicadores.map((k, i) => (
          <div key={k} className={cn("border-line px-2 py-2.5 @lg:py-3", i % 3 !== 0 && "border-l", i >= 3 && "hidden @lg:block @lg:border-l")}>
            <Etiqueta className="truncate">{k}</Etiqueta>
            <span className="mt-1.5 block h-2.5 w-3/4 rounded-sm bg-ink/75" />
          </div>
        ))}
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 @lg:grid-cols-[1.6fr_1fr]">
        <div className="flex min-h-0 flex-col">
          <div className="flex items-center justify-between">
            <Etiqueta>Ventas y compras por mes</Etiqueta>
            <span className="flex gap-3 text-[10px] text-ink-mute">
              <span className="flex items-center gap-1">
                <span className="size-2 bg-ink/80" /> Ventas
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 bg-line-strong" /> Compras
              </span>
            </span>
          </div>
          <div className="mt-2 flex min-h-0 flex-1 items-end gap-[3%] border-b border-line">
            {meses.map(([v, c], i) => (
              <div key={i} className="flex h-full flex-1 items-end gap-[2px]">
                <span className="flex-1 bg-ink/80" style={{ height: `${v}%` }} />
                <span className="flex-1 bg-line-strong" style={{ height: `${c}%` }} />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden min-h-0 flex-col gap-4 @lg:flex">
          <div>
            <Etiqueta>Cotizaciones por estado</Etiqueta>
            <div className="mt-2 space-y-1.5">
              {[
                ["Borrador", 30],
                ["Enviada", 62],
                ["Aceptada", 44],
                ["Convertida", 80],
              ].map(([estado, w]) => (
                <div key={estado} className="grid grid-cols-[4.5rem_1fr] items-center gap-2">
                  <span className="text-[11px] text-ink-soft">{estado}</span>
                  <span className="h-2 bg-accent/70" style={{ width: `${w}%` }} />
                </div>
              ))}
            </div>
          </div>
          <div className="min-h-0 flex-1 border-t border-line pt-3">
            <Etiqueta>Productos bajo el mínimo</Etiqueta>
            <div className="mt-2 space-y-2">
              {["70%", "55%", "62%"].map((w, i) => (
                <div key={i} className="flex items-center justify-between gap-3">
                  <Barra w={w} />
                  <span className="text-[10px] font-medium text-amber-800">Bajo mínimo</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const movimientos = [
  { tipo: "Recepción", motivo: "Orden de compra" },
  { tipo: "Despacho", motivo: "Factura de venta" },
  { tipo: "Merma", motivo: "Vencido" },
  { tipo: "Transferencia", motivo: "Sin ubicar a Estante A" },
  { tipo: "Ajuste", motivo: "Conteo físico" },
  { tipo: "Despacho", motivo: "Factura de venta" },
];

function Movimientos() {
  return (
    <div className="flex h-full flex-col gap-3 p-3 @lg:p-5">
      <Titulo>Movimientos de stock</Titulo>
      <div className="min-h-0 flex-1 overflow-hidden border-t border-line">
        <div className="grid grid-cols-[1fr_1fr_1.2fr] gap-3 border-b border-line py-2 @lg:grid-cols-[0.8fr_1fr_1.4fr_0.6fr_1.4fr]">
          <Etiqueta>Fecha</Etiqueta>
          <Etiqueta>Tipo</Etiqueta>
          <Etiqueta>Producto</Etiqueta>
          <Etiqueta className="hidden @lg:block">Cantidad</Etiqueta>
          <Etiqueta className="hidden @lg:block">Motivo</Etiqueta>
        </div>
        {movimientos.map((m, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_1fr_1.2fr] items-center gap-3 border-b border-line py-2 @lg:grid-cols-[0.8fr_1fr_1.4fr_0.6fr_1.4fr] @lg:py-2.5"
          >
            <Barra w="70%" />
            <span className="text-[11px] font-medium text-ink @lg:text-xs">{m.tipo}</span>
            <Barra w={`${55 + ((i * 17) % 40)}%`} />
            <span className="hidden h-2 w-8 rounded-sm bg-ink/60 @lg:block" />
            <span className="hidden truncate text-[11px] text-ink-soft @lg:block">{m.motivo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const ubicaciones = [
  { nombre: "Disponible", w: 72 },
  { nombre: "Estante A", w: 48 },
  { nombre: "Cuarentena", w: 14 },
  { nombre: "Sin ubicar", w: 26 },
];

function Transferencias() {
  return (
    <div className="grid h-full grid-cols-1 gap-4 p-3 @lg:grid-cols-[1fr_1.1fr] @lg:gap-6 @lg:p-5">
      <div className="flex flex-col gap-3">
        <Titulo>Bodega Central</Titulo>
        <Etiqueta>Sub-inventarios</Etiqueta>
        <div className="space-y-2.5">
          {ubicaciones.map((u) => (
            <div key={u.nombre} className="grid grid-cols-[5rem_1fr] items-center gap-2">
              <span className="text-[11px] text-ink-soft @lg:text-xs">{u.nombre}</span>
              <span className="h-2 bg-line">
                <span className={cn("block h-full", u.nombre === "Sin ubicar" ? "bg-amber-600/70" : "bg-ink/70")} style={{ width: `${u.w}%` }} />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden flex-col gap-2.5 border-l border-line pl-6 @lg:flex">
        <Titulo>Nueva transferencia</Titulo>
        {[
          ["Producto", null],
          ["Desde", "Sin ubicar"],
          ["Hacia", "Estante A"],
          ["Cantidad", null],
          ["Motivo", "Ubicación tras recepción"],
        ].map(([campo, valor]) => (
          <div key={campo} className="grid grid-cols-[4.5rem_1fr] items-center gap-2">
            <Etiqueta>{campo}</Etiqueta>
            <span className="flex h-6 items-center rounded-sm border border-line px-2 text-[11px] text-ink">
              {valor ?? <Barra w="60%" />}
            </span>
          </div>
        ))}
        <span className="mt-1 h-6 w-24 self-end rounded-sm bg-ink" />
      </div>
    </div>
  );
}

function Alertas() {
  const filas = [
    { nivel: 14, bajo: true },
    { nivel: 22, bajo: true },
    { nivel: 26, bajo: true },
    { nivel: 58, bajo: false },
    { nivel: 76, bajo: false },
  ];
  return (
    <div className="flex h-full flex-col gap-3 p-3 @lg:p-5">
      <Titulo>Stock y mínimo por producto</Titulo>
      <div className="flex min-h-0 flex-1 flex-col justify-between border-t border-line pt-3">
        {filas.map((f, i) => (
          <div key={i} className="grid grid-cols-[1fr_1.4fr] items-center gap-3 @lg:grid-cols-[1fr_1.6fr_5.5rem]">
            <Barra w={`${55 + ((i * 13) % 35)}%`} />
            <span className="relative h-2 bg-line">
              <span className={cn("block h-full", f.bajo ? "bg-amber-600/80" : "bg-ink/60")} style={{ width: `${f.nivel}%` }} />
              <span aria-hidden="true" className="absolute -top-1 -bottom-1 left-[30%] w-px bg-ink" />
            </span>
            <span className={cn("hidden text-[11px] font-medium @lg:block", f.bajo ? "text-amber-800" : "text-ink-mute")}>
              {f.bajo ? "Bajo mínimo" : "Sobre mínimo"}
            </span>
          </div>
        ))}
        <span className="flex items-center gap-1.5 border-t border-line pt-2 text-[10px] text-ink-mute @lg:text-[11px]">
          <span aria-hidden="true" className="h-3 w-px bg-ink" /> Stock mínimo del producto
        </span>
      </div>
    </div>
  );
}
