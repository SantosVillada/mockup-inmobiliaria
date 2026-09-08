import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Galeria from "@/components/propiedades/Galeria";
import FichaTecnica from "@/components/propiedades/FichaTecnica";
import Mapa from "@/components/propiedades/Mapa";
import DetalleContacto from "@/components/propiedades/DetalleContacto";
import TarjetaPropiedad from "@/components/propiedades/TarjetaPropiedad";
import PerfilAgente from "@/components/agentes/PerfilAgente";
import FormularioContacto from "@/components/conversion/FormularioContacto";
import { BadgeOperacion, BadgeEstado } from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import { propiedades, getPropiedadBySlug, getPropiedadesSimilares } from "@/lib/data/propiedades";
import { getAgenteById } from "@/lib/data/agentes";
import { AMENITIES } from "@/lib/constants";
import { formatPrecio, getAmenityLabel, getZonaCiudad } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return propiedades.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const propiedad = getPropiedadBySlug(slug);
  if (!propiedad) return { title: "Propiedad no encontrada" };
  return { title: propiedad.titulo, description: propiedad.descripcion.slice(0, 160) };
}

export default async function DetallePropiedadPage({ params }: PageProps) {
  const { slug } = await params;
  const propiedad = getPropiedadBySlug(slug);
  if (!propiedad) notFound();

  const agente = getAgenteById(propiedad.agente_id);
  const similares = getPropiedadesSimilares(propiedad);

  return (
    <>
      <Container className="py-6 md:py-10">
        <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Propiedades", href: "/propiedades" }, { label: propiedad.titulo }]} />

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Columna principal */}
          <div>
            <Galeria imagenes={propiedad.imagenes} titulo={propiedad.titulo} />

            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                <BadgeOperacion propiedad={propiedad} />
                <BadgeEstado propiedad={propiedad} />
              </div>
              <h1 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight text-brand-900">
                {propiedad.titulo}
              </h1>
              <p className="mt-2 flex items-center gap-1.5 text-neutral-500">
                <Icon name="map-pin" size={16} />
                {getZonaCiudad(propiedad.zona)}
              </p>
              <div className="mt-5 flex items-baseline gap-3">
                <p className="font-display text-2xl font-semibold text-brand-600 md:text-3xl">
                  {formatPrecio(propiedad.precio, propiedad.moneda, propiedad.operacion)}
                </p>
                <span className="text-sm text-neutral-500">
                  {propiedad.operacion === "venta" ? "en venta" : "por mes"}
                </span>
              </div>
            </div>

            <section className="mt-8">
              <FichaTecnica propiedad={propiedad} />
            </section>

            <section className="mt-8">
              <h2 className="font-display text-xl font-semibold text-brand-900">Descripción</h2>
              <p className="mt-3 leading-relaxed text-neutral-600">{propiedad.descripcion}</p>
            </section>

            {propiedad.caracteristicas.length > 0 && (
              <section className="mt-8">
                <h2 className="font-display text-xl font-semibold text-brand-900">Características</h2>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {propiedad.caracteristicas.map((clave) => (
                    <div key={clave} className="flex items-center gap-2.5 rounded-xl border border-neutral-200 bg-white p-3">
                      <Icon name={AMENITIES[clave]?.icon ?? "check"} size={18} className="shrink-0 text-brand-600" />
                      <span className="text-sm text-neutral-700">{getAmenityLabel(clave)}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-8">
              <h2 className="font-display text-xl font-semibold text-brand-900">Ubicación</h2>
              <Mapa latitud={propiedad.latitud} longitud={propiedad.longitud} direccion={propiedad.direccion} className="mt-4" />
            </section>

            {similares.length > 0 && (
              <section className="mt-10">
                <SectionHeading title="Propiedades similares" />
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {similares.map((sim) => (
                    <TarjetaPropiedad key={sim.id} propiedad={sim} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Columna sticky (desktop) */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="flex flex-col gap-6">
              {agente && (
                <PerfilAgente agente={agente} propiedad={propiedad} contexto="sidebar" showCtas={false} />
              )}
              <DetalleContacto propiedad={propiedad} agente={agente!} />
              <div id="contacto" className="rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="mb-4 font-display text-lg font-semibold text-brand-900">Dejanos tu consulta</h3>
                <FormularioContacto
                  asunto={`Consulta sobre la propiedad: ${propiedad.titulo}.`}
                  placeholderMensaje="Contanos qué necesitás saber…"
                  compacto
                />
              </div>
            </div>
          </aside>
        </div>
      </Container>
      <div className="pb-20 lg:pb-0" />
    </>
  );
}
