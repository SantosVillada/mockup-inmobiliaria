import Link from "next/link";
import type { Propiedad } from "@/lib/types";
import { BadgeOperacion, BadgeEstado } from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import { cn, formatPrecio, getZonaCiudad } from "@/lib/utils";

interface Props {
  propiedad: Propiedad;
  variante?: "estandar" | "destacada" | "mini";
  className?: string;
}

export default function TarjetaPropiedad({ propiedad, variante = "estandar", className }: Props) {
  const href = `/propiedades/${propiedad.slug}`;
  const esDestacada = variante === "destacada";
  const esMini = variante === "mini";

  if (esMini) {
    return (
      <Link
        href={href}
        className={cn(
          "group flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
          className
        )}
      >
        <img
          src={propiedad.imagenes[0]?.url}
          alt={propiedad.imagenes[0]?.alt ?? propiedad.titulo}
          width={80}
          height={80}
          loading="lazy"
          className="h-20 w-20 shrink-0 rounded-xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs text-neutral-500">{getZonaCiudad(propiedad.zona)}</p>
          <p className="truncate text-sm font-semibold text-brand-900">{propiedad.titulo}</p>
          <p className="mt-1 text-sm font-semibold text-brand-600">{formatPrecio(propiedad.precio, propiedad.moneda, propiedad.operacion)}</p>
        </div>
      </Link>
    );
  }

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md",
        esDestacada && "hover:shadow-md",
        className
      )}
    >
      <Link href={href} className="block" aria-label={`Ver detalles de ${propiedad.titulo} en ${getZonaCiudad(propiedad.zona)}`}>
        <div className={cn("relative overflow-hidden", esDestacada ? "aspect-video" : "aspect-[4/3]")}>
          <img
            src={propiedad.imagenes[0]?.url}
            alt={propiedad.imagenes[0]?.alt ?? propiedad.titulo}
            width={800}
            height={esDestacada ? 450 : 600}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 top-0 flex flex-wrap gap-2 p-3">
            <BadgeOperacion propiedad={propiedad} />
            <BadgeEstado propiedad={propiedad} />
          </div>
        </div>

        <div className={cn("p-4", esDestacada && "p-5")}>
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{getZonaCiudad(propiedad.zona)}</p>
          <h3 className="mt-1.5 font-display font-semibold leading-snug text-brand-900 line-clamp-2">
            {propiedad.titulo}
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-neutral-600">
            {propiedad.ambientes > 0 && (
              <span className="flex items-center gap-1.5">
                <Icon name="maximize" size={16} className="text-brand-500" />
                {propiedad.ambientes} amb
              </span>
            )}
            {propiedad.dormitorios > 0 && (
              <span className="flex items-center gap-1.5">
                <Icon name="bed" size={16} className="text-brand-500" />
                {propiedad.dormitorios} dorm
              </span>
            )}
            {propiedad.banos > 0 && (
              <span className="flex items-center gap-1.5">
                <Icon name="bath" size={16} className="text-brand-500" />
                {propiedad.banos} baño{propiedad.banos > 1 ? "s" : ""}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Icon name="maximize" size={16} className="text-brand-500" />
              {propiedad.superficie_total_m2} m²
            </span>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className={cn("font-display font-semibold text-brand-600", esDestacada ? "text-xl md:text-2xl" : "text-lg")}>
                {formatPrecio(propiedad.precio, propiedad.moneda, propiedad.operacion)}
              </p>
              <p className="text-xs text-neutral-500">
                {propiedad.operacion === "venta" ? "en venta" : "por mes"}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 transition-colors group-hover:text-brand-700">
              Ver detalles
              <Icon name="arrow-right" size={16} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
