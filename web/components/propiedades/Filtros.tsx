"use client";

import { useState, type ReactNode } from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { OPERACIONES, TIPOS, ZONAS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface FiltrosState {
  q: string;
  operacion: string;
  tipos: string[];
  zonas: string[];
  precio_min: string;
  precio_max: string;
  ambientes_min: string;
  dormitorios_min: string;
  m2_min: string;
  m2_max: string;
  orden: string;
}

export const FILTROS_VACIO: FiltrosState = {
  q: "",
  operacion: "",
  tipos: [],
  zonas: [],
  precio_min: "",
  precio_max: "",
  ambientes_min: "",
  dormitorios_min: "",
  m2_min: "",
  m2_max: "",
  orden: "",
};

export function filtrosFromParams(params: Record<string, string | undefined>): FiltrosState {
  return {
    q: params.q ?? "",
    operacion: params.operacion ?? "",
    tipos: params.tipo ? params.tipo.split(",").filter(Boolean) : [],
    zonas: params.zona ? params.zona.split(",").filter(Boolean) : [],
    precio_min: params.precio_min ?? "",
    precio_max: params.precio_max ?? "",
    ambientes_min: params.ambientes_min ?? "",
    dormitorios_min: params.dormitorios_min ?? "",
    m2_min: params.m2_min ?? "",
    m2_max: params.m2_max ?? "",
    orden: params.orden ?? "",
  };
}

interface Props {
  initial: FiltrosState;
  onApply: (filtros: FiltrosState) => void;
  onLimpiar: () => void;
}

export default function Filtros({ initial, onApply, onLimpiar }: Props) {
  const [f, setF] = useState<FiltrosState>(initial);

  function toggleTipo(tipo: string) {
    setF((prev) => ({
      ...prev,
      tipos: prev.tipos.includes(tipo) ? prev.tipos.filter((t) => t !== tipo) : [...prev.tipos, tipo],
    }));
  }
  function toggleZona(zona: string) {
    setF((prev) => ({
      ...prev,
      zonas: prev.zonas.includes(zona) ? prev.zonas.filter((z) => z !== zona) : [...prev.zonas, zona],
    }));
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="filtro-q" className="mb-1.5 block text-sm font-medium text-neutral-700">
          Buscar
        </label>
        <div className="relative">
          <Icon name="search" size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            id="filtro-q"
            type="text"
            value={f.q}
            onChange={(e) => setF({ ...f, q: e.target.value })}
            placeholder="Zona, barrio, referencia…"
            className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-800 outline-none transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
          />
        </div>
      </div>

      <Section titulo="Operación">
        <div className="flex gap-2">
          {OPERACIONES.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => setF({ ...f, operacion: f.operacion === o.value ? "" : o.value })}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                f.operacion === o.value
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-neutral-200 text-neutral-600 hover:border-brand-300"
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </Section>

      <Section titulo="Tipo">
        <div className="flex flex-wrap gap-2">
          {TIPOS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => toggleTipo(t.value)}
              aria-pressed={f.tipos.includes(t.value)}
              className={cn(
                "rounded-full border px-3.5 py-2 text-sm font-medium transition",
                f.tipos.includes(t.value)
                  ? "border-brand-600 bg-brand-50 text-brand-600"
                  : "border-neutral-200 text-neutral-600 hover:border-brand-300"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Section>

      <Section titulo="Zona">
        <div className="flex flex-wrap gap-2">
          {ZONAS.map((z) => (
            <button
              key={z.slug}
              type="button"
              onClick={() => toggleZona(z.slug)}
              aria-pressed={f.zonas.includes(z.slug)}
              className={cn(
                "rounded-full border px-3.5 py-2 text-sm font-medium transition",
                f.zonas.includes(z.slug)
                  ? "border-brand-600 bg-brand-50 text-brand-600"
                  : "border-neutral-200 text-neutral-600 hover:border-brand-300"
              )}
            >
              {z.label}
            </button>
          ))}
        </div>
      </Section>

      <Section titulo="Precio (ARS)">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            value={f.precio_min}
            onChange={(e) => setF({ ...f, precio_min: e.target.value })}
            placeholder="Mínimo"
            aria-label="Precio mínimo"
            className="rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm outline-none focus-visible:outline-2 focus-visible:outline-accent-400"
          />
          <input
            type="number"
            value={f.precio_max}
            onChange={(e) => setF({ ...f, precio_max: e.target.value })}
            placeholder="Máximo"
            aria-label="Precio máximo"
            className="rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm outline-none focus-visible:outline-2 focus-visible:outline-accent-400"
          />
        </div>
      </Section>

      <Section titulo="Ambientes / Dormitorios">
        <div className="grid grid-cols-2 gap-2">
          <select
            value={f.ambientes_min}
            onChange={(e) => setF({ ...f, ambientes_min: e.target.value })}
            aria-label="Ambientes mínimos"
            className="rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm outline-none focus-visible:outline-2 focus-visible:outline-accent-400"
          >
            <option value="">Ambientes</option>
            {["1", "2", "3", "4", "5", "6"].map((n) => (
              <option key={n} value={n}>{n}+</option>
            ))}
          </select>
          <select
            value={f.dormitorios_min}
            onChange={(e) => setF({ ...f, dormitorios_min: e.target.value })}
            aria-label="Dormitorios mínimos"
            className="rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm outline-none focus-visible:outline-2 focus-visible:outline-accent-400"
          >
            <option value="">Dormitorios</option>
            {["1", "2", "3", "4", "5"].map((n) => (
              <option key={n} value={n}>{n}+</option>
            ))}
          </select>
        </div>
      </Section>

      <Section titulo="Superficie (m²)">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            value={f.m2_min}
            onChange={(e) => setF({ ...f, m2_min: e.target.value })}
            placeholder="Mínimo"
            aria-label="Superficie mínima"
            className="rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm outline-none focus-visible:outline-2 focus-visible:outline-accent-400"
          />
          <input
            type="number"
            value={f.m2_max}
            onChange={(e) => setF({ ...f, m2_max: e.target.value })}
            placeholder="Máximo"
            aria-label="Superficie máxima"
            className="rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm outline-none focus-visible:outline-2 focus-visible:outline-accent-400"
          />
        </div>
      </Section>

      <Section titulo="Ordenar por">
        <select
          value={f.orden}
          onChange={(e) => setF({ ...f, orden: e.target.value })}
          aria-label="Ordenamiento"
          className="w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm outline-none focus-visible:outline-2 focus-visible:outline-accent-400"
        >
          <option value="">Más recientes</option>
          <option value="precio_asc">Precio: menor a mayor</option>
          <option value="precio_desc">Precio: mayor a menor</option>
        </select>
      </Section>

      <div className="flex gap-2">
        <Button variant="primary" size="md" className="flex-1" onClick={() => onApply(f)}>
          Aplicar
        </Button>
        <Button variant="secondary" size="md" onClick={onLimpiar}>
          Limpiar
        </Button>
      </div>
    </div>
  );
}

function Section({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="mb-2 text-sm font-semibold text-neutral-700">{titulo}</h4>
      {children}
    </div>
  );
}
