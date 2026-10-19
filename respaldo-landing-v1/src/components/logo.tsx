import { cn } from "@/lib/utils";

/** Marca provisoria: cuatro módulos, uno activo. [pendiente] logo definitivo. */
export function LogoMark({ className, tono = "claro" }: { className?: string; tono?: "claro" | "oscuro" }) {
  const base = tono === "claro" ? "#17191c" : "#f7f6f2";
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-5", className)}>
      <rect x="2" y="2" width="9" height="9" rx="1.5" fill={base} />
      <rect x="13" y="2" width="9" height="9" rx="1.5" fill="#1f4e79" />
      <rect x="2" y="13" width="9" height="9" rx="1.5" fill={base} />
      <rect x="13" y="13" width="9" height="9" rx="1.5" fill={base} opacity="0.3" />
    </svg>
  );
}

export function Logo({ className, tono = "claro" }: { className?: string; tono?: "claro" | "oscuro" }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark tono={tono} />
      <span className={cn("text-[17px] font-semibold", tono === "claro" ? "text-ink" : "text-canvas")}>
        Necronet <span className={tono === "claro" ? "font-normal text-ink-mute" : "font-normal text-canvas/60"}>ERP</span>
      </span>
    </span>
  );
}
