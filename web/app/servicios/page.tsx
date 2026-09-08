import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import TarjetaServicio from "@/components/servicios/TarjetaServicio";
import { servicios } from "@/lib/data/servicios";
import { waLinkGeneral } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Tasación, compra, venta, alquiler y asesoramiento inmobiliario. Todo lo que necesitás para mover tu propiedad, en un solo lugar.",
};

export default function ServiciosPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <img
          src="https://picsum.photos/seed/morada-servicios/1600/700"
          alt="Asesoramiento inmobiliario premium"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/70 via-brand-900/60 to-brand-900/80" />
        <Container className="relative py-16 md:py-24">
          <span className="text-sm font-medium text-accent-300">Más que un listado</span>
          <h1 className="mt-3 max-w-2xl font-display font-semibold tracking-tight text-[clamp(2rem,5vw,3.5rem)] leading-[1.05]">
            Te acompañamos en cada paso.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
            Tasación, compra, venta, alquiler y asesoramiento. Todo lo que necesitás para mover tu propiedad, en un
            solo lugar.
          </p>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Servicios"
            title="Qué hacemos por vos"
            subtitle="Servicios pensados para que comprar, vender o alquilar sea simple."
          />
          <ul className="border-t border-neutral-200">
            {servicios.map((servicio) => (
              <TarjetaServicio key={servicio.id} servicio={servicio} />
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <div className="overflow-hidden rounded-2xl bg-brand-800 p-8 text-white md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-tight">
                  ¿Necesitás asesoramiento?
                </h2>
                <p className="mt-3 max-w-md text-white/75">
                  Contanos qué buscás y un asesor te responde por WhatsApp, sin vueltas.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href={waLinkGeneral()} external variant="accent" size="lg">
                  <Icon name="message" size={18} />
                  Consultá por WhatsApp
                </Button>
                <Button href="/contacto" variant="secondary" size="lg" className="border-white/60 text-white hover:bg-white/10">
                  Contacto
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
