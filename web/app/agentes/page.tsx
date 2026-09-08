import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/layout/PageHeader";
import TarjetaAgente from "@/components/agentes/TarjetaAgente";
import { getAgentesActivos } from "@/lib/data/agentes";

export const metadata: Metadata = {
  title: "Agentes",
  description:
    "Conocé a nuestros asesores inmobiliarios: especialistas en compra, venta y alquiler de propiedades en Buenos Aires.",
};

export default function AgentesPage() {
  const agentes = getAgentesActivos();

  return (
    <>
      <PageHeader
        title="Nuestros agentes"
        subtitle="Tratás con personas, no con una web. Elegí a tu asesor y contactalo directo por WhatsApp."
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Agentes" }]}
      />
      <Container className="py-10 md:py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {agentes.map((agente) => (
            <TarjetaAgente key={agente.id} agente={agente} />
          ))}
        </div>
      </Container>
    </>
  );
}
