import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export default function AgenteNotFound() {
  return (
    <Container className="py-20 text-center">
      <Icon name="user" size={48} className="mx-auto text-neutral-300" />
      <h1 className="mt-4 font-display text-2xl font-semibold text-brand-900">Agente no encontrado</h1>
      <p className="mt-2 text-neutral-600">El agente que buscás no existe o ya no está activo.</p>
      <Button href="/agentes" variant="primary" size="md" className="mt-6">
        Ver todos los agentes
      </Button>
    </Container>
  );
}
