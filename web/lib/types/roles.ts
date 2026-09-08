/**
 * Tipos y permisos de usuarios/roles del backend (futuro).
 *
 * Estos tipos mapean la tabla `perfiles` / `roles` de Supabase y sirven para
 * validar permisos en Server Actions / Route Handlers y en la UI de admin.
 * Ver `docs/backend/auth-roles.md` para el modelo completo.
 */

export type RolUsuario = "admin" | "asesor" | "cliente";

export interface PerfilUsuario {
  id: string;
  user_id: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  whatsapp?: string;
  rol: RolUsuario;
  agente_id?: string | null;
  activo: boolean;
  creado_en: string;
}

export const ROLES_LABEL: Record<RolUsuario, string> = {
  admin: "Administrador",
  asesor: "Asesor inmobiliario",
  cliente: "Cliente",
};

export const ROLES_PERMISOS: Record<RolUsuario, string[]> = {
  admin: [
    "propiedades:leer",
    "propiedades:crear",
    "propiedades:editar",
    "propiedades:eliminar",
    "agentes:leer",
    "agentes:crear",
    "agentes:editar",
    "agentes:eliminar",
    "leads:leer",
    "leads:editar",
    "leads:eliminar",
    "clientes:leer",
    "clientes:editar",
    "usuarios:gestionar",
  ],
  asesor: [
    "propiedades:leer",
    "propiedades:crear",
    "propiedades:editar",
    "agentes:leer",
    "agentes:editar",
    "leads:leer",
    "leads:editar",
    "clientes:leer",
    "clientes:editar",
  ],
  cliente: ["propiedades:leer", "agentes:leer"],
};

export function tienePermiso(rol: RolUsuario, permiso: string): boolean {
  return ROLES_PERMISOS[rol]?.includes(permiso) ?? false;
}
