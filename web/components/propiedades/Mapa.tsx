import { cn } from "@/lib/utils";

interface Props {
  latitud?: number | null;
  longitud?: number | null;
  direccion: string;
  className?: string;
}

export default function Mapa({ latitud, longitud, direccion, className }: Props) {
  if (latitud == null || longitud == null) {
    return (
      <div className={cn("rounded-2xl border border-neutral-200 bg-neutral-100 p-8 text-center text-sm text-neutral-500", className)}>
        <p>{direccion}</p>
        <p className="mt-1">Ubicación de referencia. Coordenadas próximas.</p>
      </div>
    );
  }

  const d = 0.006;
  const bbox = `${longitud - d},${latitud - d},${longitud + d},${latitud + d}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitud},${longitud}`;

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-neutral-200", className)}>
      <iframe
        title="Ubicación de la propiedad"
        src={src}
        className="h-72 w-full"
        loading="lazy"
      />
      <div className="bg-white p-3 text-sm text-neutral-500">{direccion}</div>
    </div>
  );
}
