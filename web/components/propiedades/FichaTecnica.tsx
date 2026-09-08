import type { Propiedad } from "@/lib/types";
import { getEstadoLabel, getTipoLabel, getZonaLabel } from "@/lib/utils";

export default function FichaTecnica({ propiedad }: { propiedad: Propiedad }) {
  const filas: { dato: string; valor: string }[] = [
    { dato: "Operación", valor: propiedad.operacion === "venta" ? "Venta" : "Alquiler" },
    { dato: "Tipo", valor: getTipoLabel(propiedad.tipo) },
    { dato: "Ambientes", valor: propiedad.ambientes > 0 ? String(propiedad.ambientes) : "—" },
    { dato: "Dormitorios", valor: propiedad.dormitorios > 0 ? String(propiedad.dormitorios) : "—" },
    { dato: "Baños", valor: propiedad.banos > 0 ? String(propiedad.banos) : "—" },
    { dato: "Superficie total", valor: `${propiedad.superficie_total_m2} m²` },
  ];

  if (propiedad.superficie_cubierta_m2 != null) {
    filas.push({ dato: "Superficie cubierta", valor: `${propiedad.superficie_cubierta_m2} m²` });
  }
  if (propiedad.antiguedad_anios != null) {
    filas.push({
      dato: "Antigüedad",
      valor: propiedad.antiguedad_anios === 0 ? "Obra nueva" : `${propiedad.antiguedad_anios} años`,
    });
  }
  filas.push({ dato: "Disponibilidad", valor: propiedad.disponible ? "Disponible" : getEstadoLabel(propiedad.estado) });
  filas.push({ dato: "Código", valor: propiedad.codigo });
  filas.push({ dato: "Zona", valor: `${getZonaLabel(propiedad.zona)}, ${propiedad.ciudad}` });

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 md:p-6">
      <h3 className="font-display text-lg font-semibold text-brand-900">Datos de la propiedad</h3>
      <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        {filas.map((fila) => (
          <div key={fila.dato} className="flex items-baseline justify-between gap-4 border-b border-neutral-100 pb-2">
            <dt className="text-sm text-neutral-500">{fila.dato}</dt>
            <dd className="text-sm font-semibold text-neutral-800">{fila.valor}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
