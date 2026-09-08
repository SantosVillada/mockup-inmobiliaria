import Link from "next/link";
import type { Agente } from "@/lib/types";
import { WhatsAppIcon } from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { cn, getAgenteNombreCompleto, getCargoLabel, getEspecialidadLabel, getIdiomaLabel, waLinkAgente } from "@/lib/utils";

interface Props {
  agente: Agente;
  variante?: "estandar" | "destacada" | "compacta";
  className?: string;
}

export default function TarjetaAgente({ agente, variante = "estandar", className }: Props) {
  const href = `/agentes/${agente.slug}`;
  const nombre = getAgenteNombreCompleto(agente);

  if (variante === "compacta") {
    return (
      <div className={cn("flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-3", className)}>
        <img src={agente.foto} alt={`Retrato de ${nombre}, ${getCargoLabel(agente.cargo)}`} width={56} height={56} loading="lazy" className="h-14 w-14 rounded-full object-cover" />
        <div className="min-w-0 flex-1">
          <Link href={href} className="truncate text-sm font-semibold text-brand-900 hover:text-brand-600">
            {nombre}
          </Link>
          <p className="truncate text-xs text-neutral-500">{getCargoLabel(agente.cargo)}</p>
        </div>
        <a
          href={waLinkAgente(agente)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Consultar por WhatsApp a ${agente.nombre}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white hover:bg-[#1da851]"
        >
          <WhatsAppIcon size={18} />
        </a>
      </div>
    );
  }

  const esDestacada = variante === "destacada";

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md",
        className
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={agente.foto}
          alt={`Retrato de ${nombre}, ${getCargoLabel(agente.cargo)}`}
          width={600}
          height={800}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {esDestacada && agente.anios_experiencia > 0 && (
          <span className="absolute bottom-3 left-3 rounded-full bg-brand-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {agente.anios_experiencia} años de experiencia
          </span>
        )}
      </div>
      <div className={cn("p-4", esDestacada && "p-5")}>
        <Link href={href} className="block">
          <h3 className="font-display text-lg font-semibold leading-snug text-brand-900 hover:text-brand-600">
            {nombre}
          </h3>
          <p className="mt-0.5 text-sm text-neutral-500">{getCargoLabel(agente.cargo)}</p>
        </Link>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {agente.especialidades.slice(0, esDestacada ? 3 : 2).map((esp) => (
            <span key={esp} className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-600">
              {getEspecialidadLabel(esp)}
            </span>
          ))}
          {agente.idiomas.length > 1 && (
            <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
              {agente.idiomas.map(getIdiomaLabel).join(" · ")}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <a
            href={waLinkAgente(agente)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Consultar por WhatsApp a ${agente.nombre}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1da851]"
          >
            <WhatsAppIcon size={16} />
            WhatsApp
          </a>
          <Button href={href} variant="secondary" size="sm">
            Ver perfil
          </Button>
        </div>
      </div>
    </article>
  );
}
