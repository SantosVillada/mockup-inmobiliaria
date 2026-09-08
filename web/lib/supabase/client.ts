import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente de Supabase para componentes del lado del cliente.
 *
 * Usa la clave `anon` (NEXT_PUBLIC_*) que es segura de exponer en el navegador.
 * Requiere variables de entorno configuradas (ver `.env.example`).
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
