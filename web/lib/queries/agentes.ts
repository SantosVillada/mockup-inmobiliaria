import { createClient } from "@/lib/supabase/server";
import type { Agente } from "@/lib/types";

/**
 * Queries de `agentes` hacia Supabase.
 *
 * Reemplazan (en la FASE de migración) a los helpers de `lib/data/agentes.ts`.
 * Son funciones de servidor: se usan en Server Components / Server Actions.
 */

export async function getAgentesActivos(): Promise<Agente[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("agentes")
    .select("*")
    .eq("activo", true)
    .order("orden", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as Agente[];
}

export async function getAgenteBySlug(slug: string): Promise<Agente | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("agentes")
    .select("*")
    .eq("slug", slug)
    .eq("activo", true)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as Agente) ?? null;
}

export async function getAgenteById(id: string): Promise<Agente | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("agentes")
    .select("*")
    .eq("id", id)
    .eq("activo", true)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as Agente) ?? null;
}
