"use client";

import Button from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icon";
import Icon from "@/components/ui/Icon";

interface Props {
  whatsappHref: string;
  agenteNombre: string;
  label?: string;
}

export default function ContactoBarra({ whatsappHref, agenteNombre, label = "Contactar" }: Props) {
  return (
    <>
      <div className="hidden lg:flex flex-col gap-2.5">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Consultar por WhatsApp a ${agenteNombre}`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1da851]"
        >
          <WhatsAppIcon size={18} />
          Consultá por WhatsApp
        </a>
        <Button href="#contacto" variant="secondary" size="md" className="w-full">
          <Icon name="mail" size={16} />
          {label}
        </Button>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-[1240px] items-center justify-center gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Consultar por WhatsApp a ${agenteNombre}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1da851]"
          >
            <WhatsAppIcon size={16} />
            WhatsApp
          </a>
          <Button href="#contacto" variant="secondary" size="sm" className="flex-1">
            {label}
          </Button>
        </div>
      </div>
    </>
  );
}
