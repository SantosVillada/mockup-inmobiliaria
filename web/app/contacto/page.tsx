import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/layout/PageHeader";
import FormularioContacto from "@/components/conversion/FormularioContacto";
import Accordion from "@/components/ui/Accordion";
import Icon, { WhatsAppIcon } from "@/components/ui/Icon";
import Mapa from "@/components/propiedades/Mapa";
import {
  EMAIL_INSTITUCIONAL,
  DIRECCION_INSTITUCIONAL,
  HORARIOS,
  INSTITUCIONAL_WHATSAPP_DISPLAY,
  TELEFONO_INSTITUCIONAL,
} from "@/lib/constants";
import { waLinkGeneral } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contactate con MORADA por WhatsApp, formulario, teléfono o e-mail. Te respondemos a la brevedad.",
};

const FAQ = [
  {
    id: "faq-1",
    pregunta: "¿Cómo puedo agendar una visita?",
    respuesta:
      "Escribinos por WhatsApp o completá el formulario con la propiedad que te interesa. Coordinamos el día y horario que te quede cómodo.",
  },
  {
    id: "faq-2",
    pregunta: "¿Las consultas tienen algún costo?",
    respuesta:
      "No. Consultar por propiedades, pedir más información o agendar una visita es totalmente gratuito.",
  },
  {
    id: "faq-3",
    pregunta: "¿Qué zonas cubren?",
    respuesta:
      "Trabajamos en las principales zonas de Buenos Aires y el norte del GBA: Palermo, Recoleta, Belgrano, Núñez, Puerto Madero, San Telmo, Caballito, Barrio Norte, Vicente López y La Plata.",
  },
  {
    id: "faq-4",
    pregunta: "¿Puedo publicar mi propiedad con ustedes?",
    respuesta:
      "Sí. Si querés vender o alquilar tu propiedad, entrá a la sección “Vender mi propiedad” y dejá tus datos. Un asesor te contacta para coordinar la publicación.",
  },
];

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        title="Contacto"
        subtitle="Escribinos por WhatsApp o dejá tu consulta. Te respondemos a la brevedad."
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]}
      />

      <Container className="py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-semibold text-brand-900">Dejanos tu consulta</h2>
            <p className="mt-2 mb-6 text-neutral-600">
              Máxima fricción cero: contanos qué buscás y te respondemos.
            </p>
            <FormularioContacto />
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="font-display text-xl font-semibold text-brand-900">Datos de contacto</h2>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Icon name="phone" size={18} className="text-brand-600" />
                  <a href={`tel:${TELEFONO_INSTITUCIONAL.replace(/\s/g, "")}`} className="text-neutral-700 hover:text-brand-600">
                    {TELEFONO_INSTITUCIONAL}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="mail" size={18} className="text-brand-600" />
                  <a href={`mailto:${EMAIL_INSTITUCIONAL}`} className="text-neutral-700 hover:text-brand-600">
                    {EMAIL_INSTITUCIONAL}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="map-pin" size={18} className="mt-0.5 text-brand-600" />
                  <span className="text-neutral-700">{DIRECCION_INSTITUCIONAL}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="clock" size={18} className="text-brand-600" />
                  <span className="text-neutral-700">{HORARIOS}</span>
                </li>
              </ul>
              <a
                href={waLinkGeneral()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1da851]"
              >
                <WhatsAppIcon size={18} />
                Consultá por WhatsApp · {INSTITUCIONAL_WHATSAPP_DISPLAY}
              </a>
            </div>

            <div>
              <h2 className="mb-3 font-display text-xl font-semibold text-brand-900">Ubicación</h2>
              <Mapa latitud={-34.5919} longitud={-58.3977} direccion={DIRECCION_INSTITUCIONAL} />
            </div>
          </div>
        </div>

        <section className="mt-14">
          <h2 className="mb-5 font-display text-2xl font-semibold text-brand-900">Preguntas frecuentes</h2>
          <Accordion items={FAQ} />
        </section>
      </Container>
    </>
  );
}
