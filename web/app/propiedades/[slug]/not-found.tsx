import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export default function PropiedadNotFound() {
  return (
    <Container className="py-20 text-center">
      <Icon name="search" size={48} className="mx-auto text-neutral-300" />
      <h1 className="mt-4 font-display text-2xl font-semibold text-brand-900">Propiedad no encontrada</h1>
      <p className="mt-2 text-neutral-600">La propiedad que buscás no existe o ya no está disponible.</p>
      <Button href="/propiedades" variant="primary" size="md" className="mt-6">
        Volver a propiedades
      </Button>
    </Container>
  );
}
