import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/layout/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Stat from "@/components/ui/Stat";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import TarjetaAgente from "@/components/agentes/TarjetaAgente";
import { getAgentesActivos } from "@/lib/data/agentes";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conocé a MORADA: una inmobiliaria premium que acompaña la compra, venta y alquiler de propiedades en Buenos Aires.",
};

const VALORES = [
  { icono: "shield-check", titulo: "Transparencia", texto: "Precio y operación siempre visibles. Sin letra chica." },
  { icono: "users", titulo: "Acompañamiento", texto: "Un asesor real por propiedad. Te acompañamos hasta la firma." },
  { icono: "sparkles", titulo: "Calidad", texto: "Imágenes y presentación premium. Nada de fotos borrosas." },
  { icono: "message", titulo: "Eficiencia", texto: "WhatsApp directo, formularios mínimos, respuesta rápida." },
  { icono: "heart", titulo: "Cercanía", texto: "Hablamos como personas, no como corporativo." },
];

export default function NosotrosPage() {
  const agentes = getAgentesActivos();

  return (
    <>
      <PageHeader
        title="Nosotros"
        subtitle="Una inmobiliaria seria, cercana y de alto nivel. Te hacemos sentir que encontraste a los que resuelven tu tema."
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Nosotros" }]}
      />

      <Container className="py-10 md:py-14">
        <section className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeading eyebrow="Misión" title="Que encontrar tu morada sea simple" />
            <p className="leading-relaxed text-neutral-600">
              Buscamos, mostramos, asesoramos y resolvemos. Nuestro objetivo es que compres, alquiles o vendas
              con tranquilidad, sabiendo exactamente qué está pasando en cada paso. No somos la inmobiliaria más
              barata: somos la que más te facilita y la que más te acompaña.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/propiedades" variant="primary">
                Ver propiedades
              </Button>
              <Button href="/contacto" variant="secondary">
                Contactá con nosotros
              </Button>
            </div>
          </div>
          <img
            src="https://picsum.photos/seed/morada-nosotros/800/600"
            alt="Equipo de MORADA"
            width={800}
            height={600}
            className="rounded-2xl object-cover shadow-sm"
          />
        </section>

        <section className="mt-16">
          <SectionHeading
            eyebrow="Valores"
            title="Lo que nos guía"
            subtitle="Cinco principios que aplicamos en cada operación."
            align="center"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALORES.map((v) => (
              <div key={v.titulo} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={v.icono} size={24} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-brand-900">{v.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{v.texto}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-2xl bg-brand-900 p-8 text-white md:p-12">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <Stat value="+1.200" label="propiedades vendidas" onDark />
            <Stat value="15" label="años de experiencia" onDark />
            <Stat value="98%" label="clientes satisfechos" onDark />
            <Stat value="+$5.000M" label="en operaciones" onDark />
          </div>
        </section>

        <section className="mt-16">
          <SectionHeading
            eyebrow="Equipo"
            title="Las personas detrás de MORADA"
            subtitle="Conocé a los asesores que te van a acompañar."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {agentes.map((agente) => (
              <TarjetaAgente key={agente.id} agente={agente} />
            ))}
          </div>
        </section>

        <section className="mt-16 text-center">
          <SectionHeading
            eyebrow="Empezá hoy"
            title="Encontrá tu morada"
            subtitle="Explorá las propiedades disponibles o contactanos por WhatsApp."
            align="center"
          />
          <Button href="/propiedades" variant="primary" size="lg">
            Ver propiedades
          </Button>
        </section>
      </Container>
    </>
  );
}
