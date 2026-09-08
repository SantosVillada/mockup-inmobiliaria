import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <Icon name="home" size={48} className="mx-auto text-neutral-300" />
      <h1 className="mt-4 font-display text-3xl font-semibold text-brand-900">Página no encontrada</h1>
      <p className="mt-2 text-neutral-600">La página que buscás no existe o cambió de lugar.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button href="/" variant="primary" size="md">
          Volver al inicio
        </Button>
        <Button href="/propiedades" variant="secondary" size="md">
          Ver propiedades
        </Button>
      </div>
      <Link href="/" className="mt-4 block text-sm text-brand-600 hover:underline">
        MORADA — Encontrá tu morada.
      </Link>
    </Container>
  );
}
