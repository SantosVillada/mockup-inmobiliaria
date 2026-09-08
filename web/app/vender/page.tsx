import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Stat from "@/components/ui/Stat";
import Icon, { WhatsAppIcon } from "@/components/ui/Icon";
import TarjetaPropiedad from "@/components/propiedades/TarjetaPropiedad";
import FormularioVender from "@/components/conversion/FormularioVender";
import Accordion from "@/components/ui/Accordion";
import { getPropiedadesDestacadas } from "@/lib/data/propiedades";
import { waLink, waMensajeVender } from "@/lib/utils";
import { INSTITUCIONAL_WHATSAPP } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Vender mi propiedad",
  description:
    "Vendé o alquilá tu propiedad con MORADA. Publicamos, difundimos y te acompañamos hasta la firma. Sin vueltas.",
};

const BENEFICIOS = [
  { icono: "trending-up", titulo: "Lo publicamos y difundimos", texto: "Mostramos tu propiedad a nuestra cartera de compradores y locatarios." },
  { icono: "landmark", titulo: "Valoramos tu propiedad", texto: "Tasación seria y a precio de mercado, sin inflar ni regalar." },
  { icono: "handshake", titulo: "Negociamos por vos", texto: "Te acompañamos en cada oferta hasta cerrar la operación." },
  { icono: "shield-check", titulo: "Transparencia total", texto: "Comisión y condiciones claras desde el primer contacto." },
];

const PASOS = [
  { num: "1", titulo: "Contanos de tu propiedad", texto: "Dejá tus datos y contanos qué querés vender o alquilar." },
  { num: "2", titulo: "Tasamos y asesoramos", texto: "Un asesor evalúa tu propiedad y te define la estrategia." },
  { num: "3", titulo: "Publicamos y difundimos", texto: "La mostramos a nuestra cartera y la promocionamos." },
  { num: "4", titulo: "Cerramos la operación", texto: "Te acompañamos hasta la firma, sin vueltas." },
];

const FAQ = [
  { id: "s-faq-1", pregunta: "¿Cuánto cuesta publicar mi propiedad?", respuesta: "La evaluación es gratuita. La comisión se define de forma clara desde el primer contacto y se cobra solo al cerrar la operación." },
  { id: "s-faq-2", pregunta: "¿Cuánto tarda en venderse?", respuesta: "Depende de la zona, el precio y el tipo de propiedad. En promedio, nuestras propiedades se venden en pocos meses, pero te lo decimos con números reales en la tasación." },
  { id: "s-faq-3", pregunta: "¿Qué comisión manejan?", respuesta: "Trabajamos con comisiones de mercado, siempre transparentes y por escrito. Sin costos ocultos." },
];

export default function VenderPage() {
  const destacadas = getPropiedadesDestacadas().slice(0, 3);
  const wa = waLink(INSTITUCIONAL_WHATSAPP, waMensajeVender());

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <img src="https://picsum.photos/seed/morada-vender/1600/900" alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/75 via-brand-900/70 to-brand-900/85" />
        <Container className="relative py-16 md:py-24">
          <div className="max-w-2xl">
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-accent-300">¿Tenés una propiedad?</span>
            <h1 className="mt-3 font-display font-semibold tracking-tight text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.08]">
              Vendé o alquilá tu propiedad, sin vueltas.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              Publicamos tu propiedad, la mostramos a nuestra cartera y te acompañamos hasta la firma.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-base font-semibold text-white transition hover:bg-whatsapp-strong"
              >
                <WhatsAppIcon size={18} />
                Vendé tu propiedad
              </a>
              <Button href="#formulario" variant="secondary" size="lg" className="border-white/60 text-white hover:bg-white/10">
                Dejá tus datos
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Beneficios */}
      <section className="py-14 md:py-20">
        <Container>
          <SectionHeading eyebrow="Por qué elegirnos" title="Nos encargamos de todo" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFICIOS.map((b) => (
              <div key={b.titulo} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={b.icono} size={24} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-brand-900">{b.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{b.texto}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Cartera */}
      <section className="bg-neutral-100 py-14 md:py-20">
        <Container>
          <SectionHeading eyebrow="Cartera" title="Las propiedades que gestionamos" subtitle="Así se ve una propiedad publicada por MORADA." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destacadas.map((prop) => (
              <TarjetaPropiedad key={prop.id} propiedad={prop} />
            ))}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-14 md:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <Stat value="+1.200" label="propiedades vendidas" />
            <Stat value="15" label="años de experiencia" />
            <Stat value="98%" label="clientes satisfechos" />
            <Stat value="+$5.000M" label="en operaciones" />
          </div>
        </Container>
      </section>

      {/* Cómo funciona */}
      <section className="bg-brand-50 py-14 md:py-20">
        <Container>
          <SectionHeading eyebrow="Cómo funciona" title="4 pasos simples" />
          <div className="grid gap-6 md:grid-cols-4">
            {PASOS.map((p) => (
              <div key={p.num} className="rounded-2xl border border-neutral-200 bg-white p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-display font-semibold text-white">
                  {p.num}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-brand-900">{p.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{p.texto}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Formulario */}
      <section id="formulario" className="py-14 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Empezá hoy"
                title="Publicá tu propiedad"
                subtitle="Completá tus datos y la información de tu propiedad. Un asesor te contacta a la brevedad."
              />
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-whatsapp-strong"
              >
                <WhatsAppIcon size={18} />
                Preferís coordinar por WhatsApp?
              </a>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <FormularioVender />
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="pb-14 md:pb-20">
        <Container>
          <SectionHeading eyebrow="Preguntas frecuentes" title="Lo que te preguntás" />
          <Accordion items={FAQ} />
        </Container>
      </section>

      {/* CTA final */}
      <section className="pb-16">
        <Container>
          <div className="rounded-2xl bg-brand-800 p-8 text-center text-white md:p-12">
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold">Vendé tu propiedad hoy</h2>
            <p className="mx-auto mt-3 max-w-md text-white/75">Hablá con un asesor por WhatsApp y empezá en minutos.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-base font-semibold text-white transition hover:bg-whatsapp-strong"
              >
                <WhatsAppIcon size={18} />
                Vendé tu propiedad
              </a>
              <Button href="/propiedades" variant="secondary" size="lg" className="border-white/60 text-white hover:bg-white/10">
                Ver propiedades
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
