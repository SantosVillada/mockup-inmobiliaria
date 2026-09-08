# Arquitectura de backend — mockup-inmobiliaria

> Cómo se conecta **Next.js (App Router)** con **Supabase (Postgres)** y dónde vive cada consulta (Server Components, Server Actions, Route Handlers). Define el **flujo de datos** del sitio público y del futuro panel de administración.

---

## 1. Stack y modelo

| Capa | Tecnología |
|---|---|
| Frontend / SSR | **Next.js 16** (App Router, React 19, TypeScript, Tailwind v4) |
| Backend / DB | **Supabase** (Postgres + Auth + Storage + RLS) |
| Client / Server en Next | `@supabase/supabase-js` + `@supabase/ssr` |
| Deploy sugerido | **Vercel** (Next) + **Supabase** (backend) |

La app ya vive en `web/` (DFE-01). El backend no requiere un servidor aparte: **Next.js** es el servidor y **Supabase** la infraestructura de datos/auth.

---

## 2. Clientes de Supabase (dónde van)

Se crearon tres clientes en `web/lib/supabase/`:

| Archivo | Cliente | Uso | Clave |
|---|---|---|---|
| `client.ts` | `createBrowserClient` (`@supabase/ssr`) | Componentes **cliente** (eventos, auth en el navegador) | `anon` |
| `server.ts` | `createServerClient` (`@supabase/ssr`) | **Server Components / Server Actions / Route Handlers** (mantiene sesión vía cookies) | `anon` |
| `admin.ts` | `createClient` (`@supabase/supabase-js`) | Operaciones de **admin / tareas de servidor** que eluden RLS | `service_role` |
| `middleware.ts` | helper `updateSession` | Refresco de sesión / protección de rutas (se activa con `web/middleware.ts`) | `anon` |

> **Regla de seguridad:** `admin.ts` y `SUPABASE_SERVICE_ROLE_KEY` **nunca** se importan desde un componente cliente. El `anon` key (NEXT_PUBLIC_*) sí es seguro en el navegador.

---

## 3. Dónde va cada query

Principio: **lecturas en Server Components (RSC), mutaciones en Server Actions / Route Handlers**. Nunca exponer `service_role` al navegador.

### 3.1 Lecturas (catálogo público)

- **Server Components** (`app/*/page.tsx`): usan `createClient()` de `server.ts` para `getPropiedades`, `getAgenteBySlug`, etc.
- Se puede usar `cache()` de React para deduplicar, y `generateStaticParams` para las rutas de detalle.
- Para listados con filtros por URL params (`P-02`), la query se arma en el servidor leyendo `searchParams`.

### 3.2 Mutaciones (formularios → leads)

- **Opción A — Route Handler** `POST /api/leads` (ya creada en `web/app/api/leads/route.ts`): el cliente hace `fetch` con los datos del formulario. Simple, desacoplado, ideal para **escritura pública/anónima**.
- **Opción B — Server Action** (`"use server"`): para mutaciones autenticadas (ej. admin crea propiedad, asesor actualiza lead). Tiene acceso al cliente con sesión.
- **Recomendación:** usar el **Route Handler** para los formularios públicos de leads (no requieren login) y **Server Actions** para el panel admin.

### 3.3 Autenticación

- `login`/`signup`/`magic link` via **Supabase Auth** (cliente `client.ts` en el browser).
- Verificación de sesión en server components con `server.ts` (`auth.getUser()`).
- Protección de rutas `/admin/*` con `web/middleware.ts` + `updateSession`.

---

## 4. Flujo de datos

### 4.1 Lectura de propiedades (público)

```
Usuario → página /propiedades
   → Server Component lee searchParams
   → createClient() (server) → supabase.from('propiedades').select(...)
   → RLS: select usando (true) → devuelve datos
   → props → componente (TarjetaPropiedad, Filtros, etc.)
```

### 4.2 Captura de lead (público, sin login)

```
FormularioContacto (client)
   → valida (ya lo hace)
   → fetch POST /api/leads  { nombre, telefono, tipo:'contacto', origen:'detalle', ... }
   → Route Handler valida → crearLead() → insert en leads
   → RLS: leads_insert_anon with check (true) → INSERT OK
   → responde { ok, id } → el form muestra estado "success"
```

### 4.3 Panel admin (futuro, autenticado)

```
/admin (middleware valida sesión + rol)
   → Server Component / Server Action
   → server.ts (session) o admin.ts (service_role para tareas privilegiadas)
   → RLS restringe según rol (is_asesor / is_admin)
```

---

## 5. Estructura de carpetas (backend en Next)

```
web/
├── app/
│   ├── api/leads/route.ts          # POST público de leads (creado)
│   ├── admin/                      # panel de gestión (futuro, protegido)
│   ├── login/  signup/  reset/     # auth (futuro)
│   └── ...páginas públicas actuales
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # browser client (creado)
│   │   ├── server.ts               # server client (creado)
│   │   ├── admin.ts                # service role client (creado)
│   │   └── middleware.ts           # updateSession helper (creado)
│   ├── queries/
│   │   ├── propiedades.ts          # queries server (creado)
│   │   ├── agentes.ts              # queries server (creado)
│   │   └── leads.ts                # crearLead (creado)
│   ├── types/
│   │   ├── types.ts                # tipos del dominio (existente)
│   │   └── roles.ts                # tipos/permisos de rol (creado)
│   └── data/                       # datos demo (a reemplazar por queries)
└── .env.example                    # variables de entorno (creado)
```

---

## 6. Buenas prácticas a respetar

1. **RLS es la última línea de defensa** — nunca confiar solo en el código de Next.
2. **`service_role` solo en servidor** y solo para operaciones que RLS no cubre (p. ej. tareas admin globales). Preferir RLS sobre service_role siempre que se pueda.
3. **Validar en el cliente Y en el servidor** (el Route Handler `/api/leads` ya valida).
4. **No exponer claves** — solo `NEXT_PUBLIC_*` llega al navegador.
5. **Separar lectura (RSC) de mutación (Server Action / Route Handler)** para mantener el bundle cliente liviano.

---

## 7. Decisiones de arquitectura (resumen)

| ID | Decisión |
|---|---|
| **DBK-01** | Next.js App Router como servidor + Supabase como backend (sin servidor propio). |
| **DBK-02** | Clientes Supabase: `client.ts` (browser), `server.ts` (server), `admin.ts` (service role), `middleware.ts` (auth). |
| **DBK-08** | Lecturas en RSC; mutaciones públicas vía Route Handler `POST /api/leads`; mutaciones admin vía Server Actions. |

---

*Relacionado: `docs/backend/esquema-sql.md`, `docs/backend/auth-roles.md`, `docs/backend/migracion-mockup.md`, `docs/backend/estructura.md`.*
