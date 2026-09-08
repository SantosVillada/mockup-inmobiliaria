import type { Agente, Propiedad } from "@/lib/types";
import { WhatsAppIcon } from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import Stat from "@/components/ui/Stat";
import Icon from "@/components/ui/Icon";
import {
  cn,
  getAgenteNombreCompleto,
  getCargoLabel,
  getEspecialidadLabel,
  getIdiomaLabel,
  getZonaLabel,
  waLinkAgente,
  waLinkPropiedad,
} from "@/lib/utils";

interface Props {
  agente: Agente;
  propiedad?: Propiedad;
  contexto?: "perfil" | "sidebar";
  showCtas?: boolean;
  className?: string;
}

export default function PerfilAgente({ agente, propiedad, contexto = "perfil", showCtas = true, className }: Props) {
  const nombre = getAgenteNombreCompleto(agente);
  const wa = propiedad ? waLinkPropiedad(agente, propiedad) : waLinkAgente(agente);
  const esSidebar = contexto === "sidebar";

  const stats = [
    { value: `${agente.anios_experiencia}`, label: "años de experiencia" },
    { value: agente.estadisticas?.operaciones_cerradas ? `+${agente.estadisticas.operaciones_cerradas}` : "—", label: "operaciones" },
    { value: agente.estadisticas?.propiedades_vendidas ? `+${agente.estadisticas.propiedades_vendidas}` : "—", label: "vendidas" },
    { value: agente.estadisticas?.satisfaccion ? `${agente.estadisticas.satisfaccion}%` : "—", label: "satisfacción" },
  ];

  return (
    <div className={cn("rounded-2xl border border-neutral-200 bg-white", esSidebar ? "p-5" : "p-6", className)}>
      <div className="flex flex-col items-center text-center">
        <img
          src={agente.foto}
          alt={`Retrato de ${nombre}, ${getCargoLabel(agente.cargo)}`}
          width={esSidebar ? 112 : 160}
          height={esSidebar ? 112 : 160}
          className={cn("rounded-2xl object-cover", esSidebar ? "h-28 w-28" : "h-40 w-40")}
        />
        <h3 className="mt-4 font-display text-xl font-semibold text-brand-900">{nombre}</h3>
        <p className="mt-1 text-sm text-neutral-500">{getCargoLabel(agente.cargo)}</p>

        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
          {agente.especialidades.slice(0, 3).map((esp) => (
            <span key={esp} className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-600">
              {getEspecialidadLabel(esp)}
            </span>
          ))}
        </div>
        {agente.idiomas.length > 1 && (
          <p className="mt-2 text-xs text-neutral-500">
            {agente.idiomas.map(getIdiomaLabel).join(" · ")}
          </p>
        )}
        {agente.zona_cobertura.length > 0 && (
          <p className="mt-1 text-xs text-neutral-500">
            {agente.zona_cobertura.map(getZonaLabel).join(" · ")}
          </p>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-2.5">
        {showCtas ? (
          <>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Consultar por WhatsApp a ${agente.nombre}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-whatsapp-strong"
            >
              <WhatsAppIcon size={18} />
              Consultá por WhatsApp
            </a>
            <Button href="#contacto" variant="secondary" size="md" className="w-full">
              <Icon name="mail" size={16} />
              Contactar
            </Button>
          </>
        ) : (
          <Button href={`/agentes/${agente.slug}`} variant="secondary" size="md" className="w-full">
            <Icon name="arrow-right" size={16} />
            Ver perfil completo
          </Button>
        )}
      </div>

      {!esSidebar && (
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-neutral-100 pt-6 sm:grid-cols-4">
          {stats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} className="text-center" />
          ))}
        </div>
      )}
    </div>
  );
}
