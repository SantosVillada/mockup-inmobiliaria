# Backend / Arquitectura futura — mockup-inmobiliaria

> Define la arquitectura para convertir el mockup en una **inmobiliaria funcional** con **Next.js + Supabase**. Cubre conexión, esquema SQL, RLS, autenticación, integraciones y el plan para migrar el mockup.
> Agente **07 — Backend / Arquitectura futura**. Decisiones: `DBK-*` en `historial-prompts/decisiones.md`.

---

## Documentos

| Documento | Contenido |
|---|---|
| **[README.md](./README.md)** | Este índice y resumen. |
| **[arquitectura.md](./arquitectura.md)** | Conexión Next.js (App Router) ↔ Supabase; dónde van las queries (RSC / Server Actions / Route Handlers); flujo de datos. |
| **[esquema-sql.md](./esquema-sql.md)** | SQL completo ejecutable: `roles`, `agentes`, `propiedades`, `usuarios`, `clientes`, `leads`, vista `consultas`, `config`, índices, RLS, triggers, Storage. |
| **[auth-roles.md](./auth-roles.md)** | Supabase Auth (email/password + magic link), roles (`admin`/`asesor`/`cliente`), permisos, RLS por rol, protección de rutas/admin. |
| **[integraciones.md](./integraciones.md)** | WhatsApp, Storage (imágenes), Email, mapa/geolocalización, notificaciones y opcionales (pagos, CRM, chat). |
| **[migracion-mockup.md](./migracion-mockup.md)** | Pasos concretos para reemplazar `lib/data/*` por queries y los formularios por inserción de `leads`; puntos de integración exactos. |
| **[estructura.md](./estructura.md)** | Carpetas, archivos, variables de entorno, `.env.example`, plan por fases y qué ya está creado en `web/`. |

---

## Resumen

- **Stack:** Next.js 16 (App Router) como servidor + **Supabase** (Postgres + Auth + Storage + RLS) como backend.
- **Clientes Supabase:** `client.ts` (browser), `server.ts` (server, cookies), `admin.ts` (service role), `middleware.ts` (auth).
- **Modelo de datos:** consolida `propiedades`, `agentes`, `leads` (definidos por Agentes 04/05/06) y agrega `roles`, `usuarios`, `clientes` y la vista `consultas`.
- **Seguridad:** RLS con catálogo de lectura pública, `leads` insert anónimo + lectura asesor/admin, CRUD admin.
- **Autenticación:** Supabase Auth + roles (`admin`, `asesor`, `cliente`) + middleware de protección de rutas.
- **Migración:** `lib/queries/*` reemplazan `lib/data/*`; los formularios se conectan a `POST /api/leads`.
- **En `web/` ya se creó** el código preparatorio (clientes, queries, `roles.ts`, `app/api/leads/route.ts`, `.env.example`) **sin romper el build** (`npm run build` y `lint` OK).

---

## Decisiones clave (`DBK-*`)

| ID | Decisión |
|---|---|
| **DBK-01** | Next.js App Router como servidor + Supabase como backend. |
| **DBK-02** | Supabase Auth (email/password + magic link); clientes `client`/`server`/`admin`/`middleware`. |
| **DBK-03** | 3 roles (`admin`, `asesor`, `cliente`) en `roles` + `usuarios.rol`; permisos en JSONB. |
| **DBK-04** | `leads` es la fuente única de captación; `consultas` es una vista derivada. |
| **DBK-05** | `clientes` como extensión opcional de perfil de cliente registrado. |
| **DBK-06** | RLS: catálogo lectura pública; `leads` insert anónimo + lectura asesor/admin; CRUD admin. |
| **DBK-07** | Número institucional de WhatsApp centralizado en env (DMK-13), con fallback demo. |
| **DBK-08** | Lecturas en RSC; mutaciones públicas vía `POST /api/leads`; mutaciones admin vía Server Actions. |
| **DBK-09** | Supabase Storage con buckets `propiedades` y `agentes` para imágenes. |

---

## Próximo paso

Sigue **QA — Agente 08** (FASE 4 del roadmap global): revisar el mockup y la preparación de backend, probar el build/lint, y validar los puntos de integración documentados antes de crear el proyecto Supabase real.

---

*Relacionado: `historial-prompts/07-backend.md`, `historial-prompts/decisiones.md`.*
