import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type Variante = "primario" | "enlace";

export function CtaLink({
  href = site.ctaUrl,
  children = site.ctaTexto,
  variante = "primario",
  className,
}: {
  href?: string;
  children?: React.ReactNode;
  variante?: Variante;
  className?: string;
}) {
  const externo = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(externo ? { target: "_blank", rel: "noopener" } : {})}
      className={cn(
        variante === "primario"
          ? "press inline-flex h-11 items-center justify-center rounded-md bg-ink px-5 text-[15px] font-medium whitespace-nowrap text-white hover:bg-black"
          : "inline-flex items-center gap-1 text-[15px] font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent",
        className,
      )}
    >
      {children}
      {variante === "enlace" && <span aria-hidden="true">→</span>}
    </a>
  );
}
