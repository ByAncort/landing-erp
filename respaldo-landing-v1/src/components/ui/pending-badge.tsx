import { cn } from "@/lib/utils";

/**
 * Solo se ve en desarrollo: marca contenido que falta confirmar.
 * En producción esos ítems no se renderizan (ver `visibles` en content/site.ts).
 */
export function PendingBadge({ motivo, className }: { motivo?: string; className?: string }) {
  if (!motivo) return null;
  return (
    <span
      title={motivo}
      className={cn(
        "inline-block rounded-sm border border-dashed border-amber-600/70 bg-amber-50 px-1.5 py-px text-xs font-medium text-amber-900",
        className,
      )}
    >
      Por confirmar
    </span>
  );
}
