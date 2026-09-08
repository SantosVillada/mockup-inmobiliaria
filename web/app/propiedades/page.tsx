import { Suspense } from "react";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/layout/PageHeader";
import PropiedadesListado from "@/components/propiedades/PropiedadesListado";
import { SkeletonGrid } from "@/components/ui/Skeleton";

export const metadata: Metadata = {
  title: "Propiedades",
  description:
    "Buscá casas, departamentos, PHs, locales y terrenos en las mejores zonas de Buenos Aires. Filtros por operación, zona, precio y más.",
};

export default function PropiedadesPage() {
  return (
    <>
      <PageHeader
        title="Propiedades"
        subtitle="Encontrá tu morada: casas, departamentos, PHs, locales y terrenos. Filtrá por zona, precio y tipo."
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Propiedades" }]}
      />
      <Container className="py-8 md:py-12">
        <Suspense fallback={<SkeletonGrid />}>
          <PropiedadesListado />
        </Suspense>
      </Container>
    </>
  );
}
