import { cn } from "@/lib/utils";

export function SectionHeading({
  id,
  titulo,
  texto,
  className,
}: {
  id: string;
  titulo: string;
  texto?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2 id={id} className="font-serif text-3xl leading-tight font-semibold text-ink sm:text-[2.5rem]">
        {titulo}
      </h2>
      {texto && <p className="mt-4 text-lg leading-relaxed text-ink-soft">{texto}</p>}
    </div>
  );
}
