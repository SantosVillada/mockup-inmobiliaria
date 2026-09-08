"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import ModalVisita from "@/components/conversion/ModalVisita";
import { WhatsAppIcon } from "@/components/ui/Icon";
import Icon from "@/components/ui/Icon";
import type { Agente, Propiedad } from "@/lib/types";
import { formatPrecio, waLinkPropiedad } from "@/lib/utils";

export default function DetalleContacto({ propiedad, agente }: { propiedad: Propiedad; agente: Agente }) {
  const [modalOpen, setModalOpen] = useState(false);
  const wa = waLinkPropiedad(agente, propiedad);

  return (
    <>
      {/* CTAs desktop (columna) */}
      <div className="hidden lg:flex flex-col gap-2.5">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Consultar por WhatsApp a ${agente.nombre}`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-white transition hover:bg-whatsapp-strong"
        >
          <WhatsAppIcon size={18} />
          Consultá por WhatsApp
        </a>
        <Button variant="secondary" size="md" href="#contacto" className="w-full">
          <Icon name="mail" size={16} />
          Contactar
        </Button>
        <Button variant="tertiary" size="md" className="w-full" onClick={() => setModalOpen(true)}>
          <Icon name="calendar" size={16} />
          Agendar visita
        </Button>
      </div>

      {/* Barra sticky mobile */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-3">
          <div>
            <p className="font-display text-base font-semibold text-brand-600">
              {formatPrecio(propiedad.precio, propiedad.moneda, propiedad.operacion)}
            </p>
            <p className="text-xs text-neutral-500">
              {propiedad.operacion === "venta" ? "en venta" : "por mes"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(true)}>
              Visita
            </Button>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Consultar por WhatsApp a ${agente.nombre}`}
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-whatsapp-strong"
            >
              <WhatsAppIcon size={16} />
              Contactar
            </a>
          </div>
        </div>
      </div>

      <ModalVisita open={modalOpen} onClose={() => setModalOpen(false)} propiedad={propiedad} agente={agente} />
    </>
  );
}
