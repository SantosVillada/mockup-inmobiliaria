"use client";

import { useMemo, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { propiedades } from "@/lib/data/propiedades";
import { filtrarPropiedades, getTipoLabel, getZonaLabel } from "@/lib/utils";
import Filtros, { filtrosFromParams } from "@/components/propiedades/Filtros";
import type { FiltrosState } from "@/components/propiedades/Filtros";
import ChipsFiltros from "@/components/propiedades/ChipsFiltros";
import type { Chip } from "@/components/propiedades/ChipsFiltros";
import TarjetaPropiedad from "@/components/propiedades/TarjetaPropiedad";
import Paginacion from "@/components/propiedades/Paginacion";
import Drawer from "@/components/ui/Drawer";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const PAGE_SIZE = 9;

function filtrosToParams(f: FiltrosState): Record<string, string> {
  const p: Record<string, string> = {};
  if (f.q) p.q = f.q;
  if (f.operacion) p.operacion = f.operacion;
  if (f.tipos.length) p.tipo = f.tipos.join(",");
  if (f.zonas.length) p.zona = f.zonas.join(",");
  if (f.precio_min) p.precio_min = f.precio_min;
  if (f.precio_max) p.precio_max = f.precio_max;
  if (f.ambientes_min) p.ambientes_min = f.ambientes_min;
  if (f.dormitorios_min) p.dormitorios_min = f.dormitorios_min;
  if (f.m2_min) p.m2_min = f.m2_min;
  if (f.m2_max) p.m2_max = f.m2_max;
  if (f.orden) p.orden = f.orden;
  return p;
}

function buildChips(params: Record<string, string | string[] | undefined>): Chip[] {
  const get = (k: string) => {
    const v = params[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const chips: Chip[] = [];
  const q = get("q");
  if (q) chips.push({ key: "q", label: `"${q}"` });
  const operacion = get("operacion");
  if (operacion) chips.push({ key: "operacion", label: operacion === "venta" ? "Venta" : "Alquiler" });
  const tipo = get("tipo");
  if (tipo) tipo.split(",").forEach((t) => chips.push({ key: `tipo-${t}`, label: `Tipo: ${getTipoLabel(t as never)}` }));
  const zona = get("zona");
  if (zona) zona.split(",").forEach((z) => chips.push({ key: `zona-${z}`, label: `Zona: ${getZonaLabel(z)}` }));
  if (get("precio_min")) chips.push({ key: "precio_min", label: `Precio desde $${Number(get("precio_min")).toLocaleString("es-AR")}` });
  if (get("precio_max")) chips.push({ key: "precio_max", label: `Precio hasta $${Number(get("precio_max")).toLocaleString("es-AR")}` });
  if (get("ambientes_min")) chips.push({ key: "ambientes_min", label: `${get("ambientes_min")}+ ambientes` });
  if (get("dormitorios_min")) chips.push({ key: "dormitorios_min", label: `${get("dormitorios_min")}+ dormitorios` });
  if (get("m2_min")) chips.push({ key: "m2_min", label: `${get("m2_min")} m² min` });
  if (get("m2_max")) chips.push({ key: "m2_max", label: `${get("m2_max")} m² max` });
  return chips;
}

export default function PropiedadesListado() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const params = useMemo(() => {
    const out: Record<string, string | undefined> = {};
    searchParams.forEach((value, key) => {
      out[key] = value;
    });
    return out;
  }, [searchParams]);

  const filtros = useMemo(() => filtrosFromParams(params), [params]);
  const resultados = useMemo(() => filtrarPropiedades(propiedades, params), [params]);
  const page = Math.max(1, Number(params.page) || 1);
  const totalPages = Math.max(1, Math.ceil(resultados.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const slice = resultados.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const from = resultados.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const to = Math.min(safePage * PAGE_SIZE, resultados.length);
  const chips = useMemo(() => buildChips(params), [params]);

  function apply(f: FiltrosState) {
    const p = filtrosToParams(f);
    const qs = new URLSearchParams(p).toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
    setDrawerOpen(false);
  }

  function limpiar() {
    router.replace(pathname);
    setDrawerOpen(false);
  }

  function removeChip(key: string) {
    const next: Record<string, string | undefined> = { ...params };
    delete next.page;
    if (key.startsWith("tipo-")) {
      const tipoKey = key.slice(5);
      const list = (next.tipo ?? "").split(",").filter(Boolean).filter((t) => t !== tipoKey);
      if (list.length) next.tipo = list.join(",");
      else delete next.tipo;
    } else if (key.startsWith("zona-")) {
      const zonaKey = key.slice(5);
      const list = (next.zona ?? "").split(",").filter(Boolean).filter((z) => z !== zonaKey);
      if (list.length) next.zona = list.join(",");
      else delete next.zona;
    } else {
      delete next[key];
    }
    const qs = new URLSearchParams(next as Record<string, string>).toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  }

  function changePage(p: number) {
    const next: Record<string, string> = { ...(params as Record<string, string>) };
    if (p <= 1) delete next.page;
    else next.page = String(p);
    const qs = new URLSearchParams(next).toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: true });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
      {/* Sidebar desktop */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-5">
          <h2 className="mb-4 font-display text-lg font-semibold text-brand-900">Filtros</h2>
          <Filtros key={searchParams.toString()} initial={filtros} onApply={apply} onLimpiar={limpiar} />
        </div>
      </aside>

      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-lg font-semibold text-brand-900">
            {resultados.length} {resultados.length === 1 ? "propiedad" : "propiedades"}
          </h2>
          <Button
            variant="secondary"
            size="sm"
            className="lg:hidden"
            onClick={() => setDrawerOpen(true)}
          >
            <Icon name="search" size={16} />
            Filtros
          </Button>
        </div>

        {chips.length > 0 && (
          <div className="mb-5">
            <ChipsFiltros chips={chips} onRemove={removeChip} onLimpiar={limpiar} />
          </div>
        )}

        {slice.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center">
            <Icon name="search" size={40} className="mx-auto text-neutral-300" />
            <h3 className="mt-4 font-display text-lg font-semibold text-brand-900">
              No encontramos propiedades con esos filtros
            </h3>
            <p className="mt-2 text-sm text-neutral-600">Probá ampliando la búsqueda o limpiando los filtros.</p>
            <Button variant="primary" size="md" className="mt-5" onClick={limpiar}>
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {slice.map((prop) => (
                <TarjetaPropiedad key={prop.id} propiedad={prop} />
              ))}
            </div>
            <Paginacion
              page={safePage}
              totalPages={totalPages}
              totalItems={resultados.length}
              from={from}
              to={to}
              onPageChange={changePage}
            />
          </>
        )}
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Filtros">
        <Filtros key={searchParams.toString()} initial={filtros} onApply={apply} onLimpiar={limpiar} />
      </Drawer>
    </div>
  );
}
