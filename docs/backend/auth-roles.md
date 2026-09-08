# Autenticación y Roles — mockup-inmobiliaria

> Modelo de **usuarios**, **roles** y **permisos** + cómo se protegen las rutas/admin con **Supabase Auth** y **RLS**.

---

## 1. Supabase Auth

Se usa **Supabase Auth** (gestiona las cuentas en `auth.users`). Métodos habilitados:

| Método | Cuándo |
|---|---|
| **Email + contraseña** | Login de asesores / admin / clientes registrados. |
| **Magic link** | Login sin contraseña por e-mail (alta conversión para clientes). |
| (opcional) Google | Puede agregarse para clientes; no es prioritario. |

### 1.1 Perfil `usuarios`

Supabase Auth guarda la credencial; el **perfil de negocio** vive en la tabla `public.usuarios` (1:1 con `auth.users`), con `nombre`, `apellido`, `rol`, etc. Al crear el usuario, un trigger (`handle_new_user`) inserta el perfil automáticamente (ver `esquema-sql.md` §7.2).

### 1.2 Flujos en la app

- **Login / Registro:** componentes cliente usan `client.ts` (`createBrowserClient`) → `supabase.auth.signInWithPassword()` / `signUp()` / `signInWithOtp()`.
- **Verificar sesión en servidor:** `server.ts` → `await supabase.auth.getUser()`.
- **Logout:** `supabase.auth.signOut()` + `router.refresh()`.

---

## 2. Roles

Se definen **3 roles** en la tabla `roles` (lookup) y la columna `usuarios.rol`:

| Rol (`rol`) | Label | Alcance |
|---|---|---|
| `admin` | Administrador | Gestión total (propiedades, agentes, leads, clientes, usuarios). |
| `asesor` | Asesor inmobiliario | Gestiona propiedades y leads; ve cartera de clientes. |
| `cliente` | Cliente | Acceso público + perfil propio + consultas. |

Los **permisos** por rol se guardan como JSONB en `roles.permisos` (ver `esquema-sql.md` §2.1). El frontend los replica en `web/lib/types/roles.ts` (`ROLES_PERMISOS`) para mostrar/ocultar UI según rol.

---

## 3. Matriz de permisos

| Permiso | admin | asesor | cliente |
|---|:---:|:---:|:---:|
| Ver propiedades / agentes | ✅ | ✅ | ✅ |
| Crear/editar propiedad | ✅ | ✅ | ❌ |
| Eliminar propiedad | ✅ | ❌ | ❌ |
| Gestionar agentes | ✅ | ❌ | ❌ |
| Ver leads | ✅ | ✅ | ❌ |
| Editar estado de lead | ✅ | ✅ | ❌ |
| Ver/editar clientes | ✅ | ✅ | ❌ |
| Gestionar usuarios | ✅ | ❌ | ❌ |

> La **UI** usa `ROLES_PERMISOS` para ocultar acciones; la **RLS** es la que realmente impide el acceso indebido. Nunca confiar solo en la UI.

---

## 4. RLS por rol

Se implementan helpers en Postgres (ver `esquema-sql.md` §6.1):

- `current_rol()` → rol del usuario logueado.
- `is_admin()` → rol = `admin`.
- `is_asesor()` → rol ∈ `admin`, `asesor`.

**Políticas clave:**

| Tabla | Lectura | Escritura |
|---|---|---|
| `propiedades`, `agentes`, `zonas`, `amenities`, `config`, `roles` | **pública** | admin |
| `leads` | **admin/asesor** | **anónima (insert)**; update/delete admin/asesor |
| `usuarios`, `clientes` | **propietario o admin** | propietario o admin |

---

## 5. Protección de rutas / admin

### 5.1 Middleware

Se activa con `web/middleware.ts` que llama a `updateSession()` (helper en `web/lib/supabase/middleware.ts`):

```ts
// web/middleware.ts (crear al habilitar auth)
import { updateSession } from "@/lib/supabase/middleware";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

- Refresca la sesión en cada request.
- Si no hay usuario y la ruta no es pública → redirige a `/login`.
- Rutas públicas por defecto: `/`, `/propiedades*`, `/agentes*`, `/contacto`, `/nosotros`, `/vender`, `/login`, `/api*`.

### 5.2 Rutas de admin

- Grupo de rutas `app/admin/` con un **layout** que verifica sesión + rol `admin` (o `asesor` según sección).
- El layout llama a `server.ts` → `auth.getUser()` → lee `usuarios.rol`. Si no es admin → `redirect("/login")` o `redirect("/")`.

### 5.3 Server Actions protegidas

Toda Server Action de mutación verifica el rol antes de ejecutar, p. ej.:

```ts
"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function crearPropiedad(...) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: perfil } = await supabase.from("usuarios").select("rol").eq("id", user.id).single();
  if (perfil?.rol !== "admin" && perfil?.rol !== "asesor") throw new Error("Sin permisos.");
  // ... insert
}
```

---

## 6. Puntos de integración en el frontend

- **Login / Registro / Reset:** `app/login`, `app/signup`, `app/reset-password` (nuevos, con `client.ts`).
- **Panel admin:** `app/admin/*` (nuevos, protegidos por layout + middleware).
- **Header / Footer:** mostrar sesión (`user`) y enlace a `/admin` solo si el rol lo permite.
- **Formularios:** el lead anónimo sigue via `/api/leads`; si el usuario está logueado, se envía `usuario_id`.

---

## 7. Decisiones (resumen)

| ID | Decisión |
|---|---|
| **DBK-02** | Supabase Auth (email/password + magic link) como fuente de identidad. |
| **DBK-03** | 3 roles (`admin`, `asesor`, `cliente`) en `roles` + `usuarios.rol`; permisos en JSONB. |
| **DBK-06** | RLS: catálogo de lectura pública; `leads` insert anónimo + lectura asesor/admin; CRUD admin. |

---

*Relacionado: `docs/backend/esquema-sql.md`, `docs/backend/arquitectura.md`, `web/lib/supabase/middleware.ts`, `web/lib/types/roles.ts`.*
