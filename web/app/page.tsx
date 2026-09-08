import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Stat from "@/components/ui/Stat";
import Icon from "@/components/ui/Icon";
import MiniBuscador from "@/components/propiedades/MiniBuscador";
import TarjetaPropiedad from "@/components/propiedades/TarjetaPropiedad";
import TarjetaAgente from "@/components/agentes/TarjetaAgente";
import CarruselTestimonios from "@/components/conversion/CarruselTestimonios";
import Newsletter from "@/components/conversion/Newsletter";
import { getPropiedadesDestacadas } from "@/lib/data/propiedades";
import { getAgentesDestacados } from "@/lib/data/agentes";
import { waLinkGeneral } from "@/lib/utils";

const BENEFICIOS = [
  { icono: "map-pin", titulo: "Las mejores zonas", texto: "Curamos propiedades en los barrios más buscados de la ciudad y el norte." },
  { icono: "users", titulo: "Asesores reales", texto: "Cada propiedad tiene un asesor que la conoce de memoria. Tratás con personas, no con una web." },
  { icono: "message", titulo: "WhatsApp directo", texto: "Consultá al toque, con mensaje pre-cargado. Sin formularios eternos." },
  { icono: "shield-check", titulo: "Sin vueltas", texto: "Te acompañamos hasta la firma. Transparencia en precios, operación y gestión." },
];

const TILES = [
  { label: "Casas en venta", icono: "home", href: "/propiedades?operacion=venta&tipo=casa", sub: "En toda la ciudad" },
  { label: "Departamentos en venta", icono: "building-2", href: "/propiedades?operacion=venta&tipo=departamento", sub: "De 1 a 5 ambientes" },
  { label: "Alquiler", icono: "key", href: "/propiedades?operacion=alquiler", sub: "Casas y deptos" },
  { label: "PHs", icono: "door-open", href: "/propiedades?tipo=ph", sub: "Con encanto rioplatense" },
  { label: "Locales comerciales", icono: "store", href: "/propiedades?tipo=local", sub: "Para tu negocio" },
  { label: "Terrenos", icono: "map", href: "/propiedades?tipo=terreno", sub: "Para construir" },
  { label: "Palermo", icono: "map-pin", href: "/propiedades?zona=palermo", sub: "Soho y Plaza Serrano" },
  { label: "Zona Norte", icono: "map-pin", href: "/propiedades?zona=vicente-lopez", sub: "Vicente López y GBA" },
];

export default function HomePage() {
  const destacadas = getPropiedadesDestacadas();
  const agentes = getAgentesDestacados();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <img
          src="https://picsum.photos/seed/morada-hero/1600/900"
          alt="Propiedades premium"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/70 via-brand-900/60 to-brand-900/80" />
        <Container className="relative py-16 md:py-24">
          <div className="max-w-2xl">
            <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-accent-300">
              Inmobiliaria premium
            </span>
            <h1 className="mt-3 font-display font-semibold tracking-tight text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05]">
              Encontrá tu morada.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              Casas, departamentos y locales en las mejores zonas. Te acompañamos de punta a punta, sin vueltas.
            </p>
          </div>
          <div className="mt-8">
            <MiniBuscador onDark />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/propiedades" variant="accent" size="lg">
              Ver propiedades
            </Button>
            <Button href="/vender" variant="secondary" size="lg" className="border-white/60 text-white hover:bg-white/10">
              Vender mi propiedad
            </Button>
          </div>
        </Container>
      </section>

      {/* Destacadas */}
      <section className="py-14 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Destacadas"
            title="Propiedades que te van a gustar"
            subtitle="Una selección curada de casas, departamentos y PHs en las mejores zonas."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destacadas.map((prop) => (
              <TarjetaPropiedad key={prop.id} propiedad={prop} variante="estandar" />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button href="/propiedades" variant="secondary">
              Ver todas las propiedades
            </Button>
          </div>
        </Container>
      </section>

      {/* Búsqueda por zona / tipo */}
      <section className="bg-brand-50 py-14 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Explorar"
            title="Buscá por zona o tipo"
            subtitle="Accesos rápidos para encontrar lo que querés, con los filtros ya aplicados."
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {TILES.map((tile) => (
              <Link
                key={tile.label}
                href={tile.href}
                className="group flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <Icon name={tile.icono} size={26} className="text-brand-600" />
                <span>
                  <span className="block font-display font-semibold text-brand-900">{tile.label}</span>
                  <span className="mt-0.5 block text-sm text-neutral-500">{tile.sub}</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Por qué elegirnos */}
      <section className="py-14 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Por qué MORADA"
            title="Asesores reales. Sin vueltas."
            subtitle="Cuatro razones por las que elegirnos para comprar, alquilar o vender."
          />
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

      {/* Estadísticas */}
      <section className="bg-brand-900 py-14 text-white md:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <Stat value="+1.200" label="propiedades vendidas" onDark />
            <Stat value="15" label="años de experiencia" onDark />
            <Stat value="98%" label="clientes satisfechos" onDark />
            <Stat value="+$5.000M" label="en operaciones" onDark />
          </div>
        </Container>
      </section>

      {/* Testimonios */}
      <section className="py-14 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Testimonios"
            title="Lo que dicen nuestros clientes"
            subtitle="Historias reales de compra, venta y alquiler con MORADA."
            align="center"
          />
          <CarruselTestimonios />
        </Container>
      </section>

      {/* Agentes destacados */}
      <section className="bg-neutral-100 py-14 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Equipo"
            title="Conocé a tus asesores"
            subtitle="Cada propiedad tiene un agente real que la conoce de memoria. Elegí con quién hablar."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {agentes.map((agente) => (
              <TarjetaAgente key={agente.id} agente={agente} variante="estandar" />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button href="/agentes" variant="secondary">
              Conocer agentes
            </Button>
          </div>
        </Container>
      </section>

      {/* CTA final + newsletter */}
      <section className="py-14 md:py-20">
        <Container>
          <div className="overflow-hidden rounded-3xl bg-brand-800 p-8 text-white md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-tight">
                  Encontrá tu morada, hoy.
                </h2>
                <p className="mt-3 max-w-md text-white/75">
                  Recibí las nuevas propiedades antes que nadie, o hablá directo con un asesor por WhatsApp.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href={waLinkGeneral()} external variant="accent" size="lg">
                    <Icon name="message" size={18} />
                    Consultá por WhatsApp
                  </Button>
                  <Button href="/contacto" variant="secondary" size="lg" className="border-white/60 text-white hover:bg-white/10">
                    Contacto
                  </Button>
                </div>
              </div>
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <h3 className="font-display text-lg font-semibold">Newsletter</h3>
                <p className="mt-1 mb-4 text-sm text-white/70">Nuevas propiedades, antes que nadie.</p>
                <Newsletter onDark />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
