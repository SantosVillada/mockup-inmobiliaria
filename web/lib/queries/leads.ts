import { createClient } from "@/lib/supabase/server";
import type { Lead } from "@/lib/types";

/**
 * Queries de `leads` hacia Supabase.
 *
 * `crearLead` es la función que conecta los formularios del mockup
 * (FormularioContacto, FormularioVender, ModalVisita, Newsletter) con la
 * persistencia real. La inserción es pública (anónima) gracias a RLS.
 */

export interface CreateLeadInput {
  nombre: string;
  telefono: string;
  whatsapp?: string;
  email?: string;
  mensaje?: string;
  tipo: Lead["tipo"];
  agente_id?: string | null;
  propiedad_id?: string | null;
  titulo_propiedad?: string;
  fecha_visita?: string;
  hora_visita?: string;
  operacion_interes?: Lead["operacion_interes"];
  tipo_propiedad?: Lead["tipo_propiedad"];
  zona_interes?: string;
  origen: string;
  canal: "whatsapp" | "formulario";
}

export async function crearLead(input: CreateLeadInput): Promise<Lead> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .insert({ ...input, estado: "nuevo" })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as Lead;
}
