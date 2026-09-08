"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { OPERACIONES, ZONAS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function MiniBuscador({ onDark = false }: { onDark?: boolean }) {
  const router = useRouter();
  const [zona, setZona] = useState("");
  const [operacion, setOperacion] = useState("");
  const [precioMax, setPrecioMax] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (zona) params.set("zona", zona);
    if (operacion) params.set("operacion", operacion);
    if (precioMax) params.set("precio_max", precioMax);
    router.push(`/propiedades?${params.toString()}`);
  }

  const base = cn(
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400",
    onDark ? "border-white/20" : "border-neutral-200"
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-2xl bg-white p-4 shadow-md md:grid-cols-[1fr_1fr_1fr_auto] md:items-center md:p-5"
    >
      <div className="relative">
        <Icon name="map-pin" size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
        <select value={zona} onChange={(e) => setZona(e.target.value)} aria-label="Zona" className={cn(base, "pl-10")}>
          <option value="">Zona / Ciudad</option>
          {ZONAS.map((z) => (
            <option key={z.slug} value={z.slug}>{z.label}</option>
          ))}
        </select>
      </div>
      <select value={operacion} onChange={(e) => setOperacion(e.target.value)} aria-label="Operación" className={base}>
        <option value="">Venta o alquiler</option>
        {OPERACIONES.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <input
        type="number"
        value={precioMax}
        onChange={(e) => setPrecioMax(e.target.value)}
        placeholder="Precio máximo"
        aria-label="Precio máximo"
        className={base}
      />
      <Button type="submit" variant="primary" size="md" className="md:ml-1">
        <Icon name="search" size={18} />
        Buscar
      </Button>
    </form>
  );
}
