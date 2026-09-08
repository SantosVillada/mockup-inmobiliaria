"use client";

import { useSyncExternalStore } from "react";
import Button from "@/components/ui/Button";
import TarjetaPropiedad from "@/components/propiedades/TarjetaPropiedad";
import { propiedades } from "@/lib/data/propiedades";
import { getFavoritos, favoritosServerSnapshot, FAVORITOS_EVENT } from "@/lib/favoritos";

function subscribe(callback: () => void) {
  window.addEventListener(FAVORITOS_EVENT, callback);
  return () => window.removeEventListener(FAVORITOS_EVENT, callback);
}

export default function FavoritosGrid() {
  const slugs = useSyncExternalStore(subscribe, getFavoritos, favoritosServerSnapshot);
  const favoritas = propiedades.filter((p) => slugs.includes(p.slug));

  if (favoritas.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center md:p-14">
        <p className="font-display text-xl font-semibold text-brand-900">Todavía no guardaste propiedades</p>
        <p className="mx-auto mt-3 max-w-md text-neutral-600">
          Tocá el corazón en cualquier propiedad para tenerla a mano y volver a verla cuando quieras.
        </p>
        <div className="mt-6 flex justify-center">
          <Button href="/propiedades" variant="primary">
            Explorar propiedades
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {favoritas.map((prop) => (
        <TarjetaPropiedad key={prop.id} propiedad={prop} variante="estandar" />
      ))}
    </div>
  );
}
