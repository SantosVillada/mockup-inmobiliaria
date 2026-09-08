import Icon from "@/components/ui/Icon";
import type { Servicio } from "@/lib/data/servicios";
import { waLink } from "@/lib/utils";
import { INSTITUCIONAL_WHATSAPP } from "@/lib/constants";

export default function TarjetaServicio({ servicio }: { servicio: Servicio }) {
  return (
    <li className="grid gap-5 border-b border-neutral-200 py-8 sm:grid-cols-[auto_1fr_auto] sm:items-start">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <Icon name={servicio.icono} size={24} />
      </div>
      <div>
        <h3 className="font-display text-xl font-semibold text-brand-900">{servicio.titulo}</h3>
        <p className="mt-2 max-w-xl leading-relaxed text-neutral-600">{servicio.descripcion}</p>
      </div>
      <a
        href={waLink(INSTITUCIONAL_WHATSAPP, servicio.whatsappMensaje)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
      >
        Consultar
        <Icon name="arrow-right" size={16} />
      </a>
    </li>
  );
}
