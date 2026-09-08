import Link from "next/link";
import Logo from "@/components/ui/Logo";
import Newsletter from "@/components/conversion/Newsletter";
import Icon, { WhatsAppIcon } from "@/components/ui/Icon";
import {
  EMAIL_INSTITUCIONAL,
  HORARIOS,
  INSTITUCIONAL_WHATSAPP_DISPLAY,
  TELEFONO_INSTITUCIONAL,
  DIRECCION_INSTITUCIONAL,
} from "@/lib/constants";
import { waLinkGeneral } from "@/lib/utils";

const NAV = [
  { label: "Inicio", href: "/" },
  { label: "Propiedades", href: "/propiedades" },
  { label: "Agentes", href: "/agentes" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
  { label: "Vender mi propiedad", href: "/vender" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white">
      <div className="mx-auto w-full max-w-[1240px] px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo onDark showTagline />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Te acompañamos en cada paso: buscamos, mostramos, asesoramos y resolvemos. Sin vueltas.
            </p>
            <div className="mt-5 flex gap-3">
              <a href="#" aria-label="Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-accent-400 hover:text-brand-900">
                <Icon name="message" size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-accent-400 hover:text-brand-900">
                <Icon name="linkedin" size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-accent-300">Navegación</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/70 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-accent-300">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <Icon name="map-pin" size={16} className="mt-0.5 shrink-0 text-accent-300" />
                {DIRECCION_INSTITUCIONAL}
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="phone" size={16} className="shrink-0 text-accent-300" />
                <a href={`tel:${TELEFONO_INSTITUCIONAL.replace(/\s/g, "")}`} className="hover:text-white">
                  {TELEFONO_INSTITUCIONAL}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="mail" size={16} className="shrink-0 text-accent-300" />
                <a href={`mailto:${EMAIL_INSTITUCIONAL}`} className="hover:text-white">
                  {EMAIL_INSTITUCIONAL}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="clock" size={16} className="shrink-0 text-accent-300" />
                {HORARIOS}
              </li>
            </ul>
            <a
              href={waLinkGeneral()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-whatsapp-strong"
            >
              <WhatsAppIcon size={18} />
              {INSTITUCIONAL_WHATSAPP_DISPLAY}
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-accent-300">Newsletter</h3>
            <p className="mt-4 text-sm text-white/70">Recibí las nuevas propiedades antes que nadie.</p>
            <div className="mt-4">
              <Newsletter onDark />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} MORADA — Encontrá tu morada. Mockup demo.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacidad</a>
            <a href="#" className="hover:text-white">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
