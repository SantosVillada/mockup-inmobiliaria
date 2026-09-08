import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Stat from "@/components/ui/Stat";
import TarjetaPropiedad from "@/components/propiedades/TarjetaPropiedad";
import FormularioContacto from "@/components/conversion/FormularioContacto";
import ContactoBarra from "@/components/conversion/ContactoBarra";
import { getAgenteBySlug } from "@/lib/data/agentes";
import { getPropiedadesPorAgente } from "@/lib/data/propiedades";
import {
  getAgenteNombreCompleto,
  getCargoLabel,
  getEspecialidadLabel,
  getIdiomaLabel,
  getZonaLabel,
  waLinkAgente,
} from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const agente = getAgenteBySlug(slug);
  if (!agente) return { title: "Agente no encontrado" };
  return {
    title: `${getAgenteNombreCompleto(agente)} — ${getCargoLabel(agente.cargo)}`,
    description: agente.bio.slice(0, 160),
  };
}

export default async function PerfilAgentePage({ params }: PageProps) {
  const { slug } = await params;
  const agente = getAgenteBySlug(slug);
  if (!agente) notFound();

  const nombre = getAgenteNombreCompleto(agente);
  const propiedades = getPropiedadesPorAgente(agente.id);
  const stats = [
    { value: `${agente.anios_experiencia}`, label: "años de experiencia" },
    { value: agente.estadisticas?.operaciones_cerradas ? `+${agente.estadisticas.operaciones_cerradas}` : "—", label: "operaciones cerradas" },
    { value: agente.estadisticas?.propiedades_vendidas ? `+${agente.estadisticas.propiedades_vendidas}` : "—", label: "propiedades vendidas" },
    { value: agente.estadisticas?.satisfaccion ? `${agente.estadisticas.satisfaccion}%` : "—", label: "clientes satisfechos" },
  ];

  return (
    <>
      <Container className="py-6 md:py-10">
        <Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Agentes", href: "/agentes" }, { label: nombre }]} />

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div>
            {/* Header */}
            <div className="flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-6 md:flex-row md:p-8">
              <img
                src={agente.foto}
                alt={`Retrato de ${nombre}, ${getCargoLabel(agente.cargo)}`}
                width={160}
                height={200}
                className="h-40 w-32 shrink-0 rounded-2xl object-cover md:h-48 md:w-40"
              />
              <div>
                <h1 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight text-brand-900">
                  {nombre}
                </h1>
                <p className="mt-1 text-neutral-500">{getCargoLabel(agente.cargo)}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {agente.especialidades.map((esp) => (
                    <span key={esp} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600">
                      {getEspecialidadLabel(esp)}
                    </span>
                  ))}
                </div>
                {agente.idiomas.length > 1 && (
                  <p className="mt-3 text-xs text-neutral-500">
                    Idiomas: {agente.idiomas.map(getIdiomaLabel).join(" · ")}
                  </p>
                )}
                {agente.zona_cobertura.length > 0 && (
                  <p className="mt-1 text-xs text-neutral-500">
                    Zonas: {agente.zona_cobertura.map(getZonaLabel).join(" · ")}
                  </p>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-neutral-200 bg-white p-6 sm:grid-cols-4">
              {stats.map((s) => (
                <Stat key={s.label} value={s.value} label={s.label} className="text-center" />
              ))}
            </div>

            {/* Bio */}
            <section className="mt-8">
              <h2 className="font-display text-xl font-semibold text-brand-900">Sobre {agente.nombre}</h2>
              <p className="mt-3 leading-relaxed text-neutral-600">{agente.bio}</p>
            </section>

            {/* Propiedades */}
            <section className="mt-10">
              <h2 className="font-display text-xl font-semibold text-brand-900">Propiedades de {agente.nombre}</h2>
              {propiedades.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-8 text-center">
                  <p className="text-neutral-600">
                    Este asesor aún no tiene propiedades publicadas. Igual podés consultarle por WhatsApp.
                  </p>
                  <a
                    href={waLinkAgente(agente)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1da851]"
                  >
                    Consultá por WhatsApp
                  </a>
                </div>
              ) : (
                <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {propiedades.slice(0, 6).map((prop) => (
                    <TarjetaPropiedad key={prop.id} propiedad={prop} />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Columna sticky */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="mb-4 font-display text-lg font-semibold text-brand-900">¿Hablamos?</h3>
                <ContactoBarra whatsappHref={waLinkAgente(agente)} agenteNombre={agente.nombre} label="Contactar" />
              </div>
              <div id="contacto" className="rounded-2xl border border-neutral-200 bg-white p-5">
                <h3 className="mb-4 font-display text-lg font-semibold text-brand-900">Dejanos tu consulta</h3>
                <FormularioContacto
                  asunto={`Consulta para ${nombre}.`}
                  placeholderMensaje="Contanos qué buscás…"
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
