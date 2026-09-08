import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FavoritosGrid from "@/components/propiedades/FavoritosGrid";

export const metadata: Metadata = {
  title: "Favoritos",
  description: "Tus propiedades guardadas en MORADA. Volvé a verlas y consultá por WhatsApp.",
};

export default function FavoritosPage() {
  return (
    <>
      <section className="bg-neutral-50 py-12 md:py-16">
        <Container>
          <SectionHeading
            eyebrow="Guardados"
            title="Tus propiedades favoritas"
            subtitle="Volvé a ver lo que te gustó y consultá por WhatsApp cuando quieras."
          />
          <FavoritosGrid />
        </Container>
      </section>
    </>
  );
}
