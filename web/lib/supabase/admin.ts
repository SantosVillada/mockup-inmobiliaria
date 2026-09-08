import { createClient } from "@supabase/supabase-js";

/**
 * Cliente de Supabase con la clave de SERVICE ROLE.
 *
 * ADVERTENCIA: este cliente elude las políticas RLS. Debe usarse EXCLUSIVAMENTE
 * en el servidor (Server Actions / Route Handlers / tareas de admin) y NUNCA
 * importarse desde un componente cliente. No exponer la clave en el navegador.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    }
  );
}
