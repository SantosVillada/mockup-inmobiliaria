import { createClient } from "@/lib/supabase/server";
import type { Propiedad } from "@/lib/types";

/**
 * Queries de `propiedades` hacia Supabase.
 *
 * Reemplazan (en la FASE de migración) a los helpers de `lib/data/propiedades.ts`.
 * Son funciones de servidor: se usan en Server Components / Server Actions.
 */

export interface FiltrosPropiedades {
  q?: string;
  operacion?: string;
  tipo?: string;
  zona?: string;
  precioMin?: number;
  precioMax?: number;
  agenteId?: string;
  destacado?: boolean;
}

export async function getPropiedades(
  filtros?: FiltrosPropiedades
): Promise<Propiedad[]> {
  const supabase = await createClient();
  let query = supabase
    .from("propiedades")
    .select("*")
    .eq("disponible", true)
    .order("publicado_en", { ascending: false });

  if (filtros?.q) {
    query = query.or(
      `titulo.ilike.%${filtros.q}%,descripcion.ilike.%${filtros.q}%,zona.ilike.%${filtros.q}%`
    );
  }
  if (filtros?.operacion) query = query.eq("operacion", filtros.operacion);
  if (filtros?.tipo) query = query.in("tipo", filtros.tipo.split(","));
  if (filtros?.zona) query = query.in("zona", filtros.zona.split(","));
  if (filtros?.precioMin !== undefined) query = query.gte("precio", filtros.precioMin);
  if (filtros?.precioMax !== undefined) query = query.lte("precio", filtros.precioMax);
  if (filtros?.agenteId) query = query.eq("agente_id", filtros.agenteId);
  if (filtros?.destacado !== undefined) query = query.eq("destacado", filtros.destacado);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as Propiedad[];
}

export async function getPropiedadBySlug(slug: string): Promise<Propiedad | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("propiedades")
    .select("*")
    .eq("slug", slug)
    .eq("disponible", true)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as Propiedad) ?? null;
}

export async function getPropiedadesDestacadas(): Promise<Propiedad[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("propiedades")
    .select("*")
    .eq("destacado", true)
    .eq("disponible", true)
    .order("publicado_en", { ascending: false })
    .limit(8);
  if (error) throw new Error(error.message);
  return (data ?? []) as Propiedad[];
}

export async function getPropiedadesPorAgente(agenteId: string): Promise<Propiedad[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("propiedades")
    .select("*")
    .eq("agente_id", agenteId)
    .eq("disponible", true)
    .order("publicado_en", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Propiedad[];
}
