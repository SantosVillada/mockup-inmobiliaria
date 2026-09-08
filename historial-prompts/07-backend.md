# AGENTE 07 — BACKEND / ARQUITECTURA FUTURA

Registro del Agente de Backend / Arquitectura futura.

> **Regla de finalización (obligatoria):** Antes de cerrar, preguntá al usuario:
> 1. ¿Push de los últimos cambios a GitHub? (Sí / No)
> 2. ¿A la rama `main` o a una nueva rama? (indicar nombre si es nueva)

## Prompt / Instrucción
Definir y documentar la **arquitectura de backend futura** preparada para **Supabase** (u otro backend) y **preparar el código del frontend para conectarse** (sin un proyecto Supabase real, dejando el código listo y documentado). Entregables: arquitectura general, esquema SQL (tablas `propiedades`, `agentes`, `leads` + agregar `usuarios`/`roles`, `clientes`, `consultas`, relaciones, índices, RLS), autenticación y roles, integraciones futuras (WhatsApp, storage, email, mapa, opcionales), migración del mockup (puntos de integración exactos), variables de entorno (`.env.example`), estructura de carpetas, plan por fases y decisiones `DBK-NN`.

## Fecha
2026-09-08

## Objetivo
Que el mockup pueda convertirse en una inmobiliaria funcional con backend, base de datos, administración de propiedades, agentes, consultas y clientes, usando Next.js + Supabase. Dejar el código y la documentación listos para la migración, sin romper el build.

## Resultado
- Se leyó la documentación previa (director, agentes 03-06, decisiones) y el código del frontend (tipos, constantes, utils, datos demo, formularios, páginas).
- **Arquitectura definida** (Next.js App Router como servidor + Supabase como backend) en `docs/backend/arquitectura.md`.
- **Esquema SQL completo** (roles, agentes, propiedades, usuarios, clientes, leads, vista consultas, config, índices, RLS, triggers, Storage) en `docs/backend/esquema-sql.md`.
- **Auth y roles** (Supabase Auth, roles admin/asesor/cliente, permisos, RLS por rol, protección de rutas/admin) en `docs/backend/auth-roles.md`.
- **Integraciones** (WhatsApp, storage, email, mapa, notificaciones, opcionales) en `docs/backend/integraciones.md`.
- **Plan de migración** con puntos de integración exactos en `docs/backend/migracion-mockup.md`.
- **Estructura y env** (carpetas, `.env.example`, plan por fases) en `docs/backend/estructura.md`.
- **Código preparatorio creado en `web/`** (sin romper build): `lib/supabase/{client,server,admin,middleware}.ts`, `lib/queries/{propiedades,agentes,leads}.ts`, `lib/types/roles.ts`, `app/api/leads/route.ts`, `.env.example`.
- **Ajustes:** `lib/constants.ts` (WhatsApp por env), `lib/utils.ts`, `FormularioVender.tsx`, `vender/page.tsx` (usan la constante), `web/.gitignore` (`!.env.example`), `package.json` (agregados `@supabase/supabase-js` + `@supabase/ssr`).
- **Verificado:** `npm run build` y `npm run lint` pasan. No hay proyecto Supabase real; el sitio sigue usando datos demo.

## Archivos modificados
- `docs/backend/README.md` (creado)
- `docs/backend/arquitectura.md` (creado)
- `docs/backend/esquema-sql.md` (creado)
- `docs/backend/auth-roles.md` (creado)
- `docs/backend/integraciones.md` (creado)
- `docs/backend/migracion-mockup.md` (creado)
- `docs/backend/estructura.md` (creado)
- `web/lib/supabase/client.ts` (creado)
- `web/lib/supabase/server.ts` (creado)
- `web/lib/supabase/admin.ts` (creado)
- `web/lib/supabase/middleware.ts` (creado)
- `web/lib/queries/propiedades.ts` (creado)
- `web/lib/queries/agentes.ts` (creado)
- `web/lib/queries/leads.ts` (creado)
- `web/lib/types/roles.ts` (creado)
- `web/app/api/leads/route.ts` (creado)
- `web/.env.example` (creado)
- `web/lib/constants.ts` (editado)
- `web/lib/utils.ts` (editado)
- `web/components/conversion/FormularioVender.tsx` (editado)
- `web/app/vender/page.tsx` (editado)
- `web/.gitignore` (editado)
- `web/package.json` + `web/package-lock.json` (editados)
- `historial-prompts/decisiones.md` (editado)

## Decisiones tomadas
- **DBK-01** — Next.js App Router como servidor + Supabase como backend.
- **DBK-02** — Clientes `client`/`server`/`admin`/`middleware`; Auth email/password + magic link.
- **DBK-03** — Roles `admin`/`asesor`/`cliente` en `roles` + `usuarios.rol`; permisos JSONB.
- **DBK-04** — `leads` fuente única; `consultas` como vista derivada.
- **DBK-05** — `clientes` como extensión opcional de perfil de cliente.
- **DBK-06** — RLS: catálogo lectura pública; `leads` insert anónimo + lectura asesor/admin; CRUD admin.
- **DBK-07** — Número institucional de WhatsApp centralizado en env (DMK-13).
- **DBK-08** — Lecturas en RSC; mutaciones públicas vía `POST /api/leads`; admin vía Server Actions.
- **DBK-09** — Supabase Storage con buckets `propiedades`/`agentes`.

## Próximo paso
Sigue **QA — Agente 08** en **FASE 4**: revisar el mockup y la preparación de backend, probar `npm run build`/`lint`, validar los puntos de integración documentados y las decisiones `DBK-*`, antes de crear el proyecto Supabase real. El Agente 08 debe revisar `docs/backend/` (todos los archivos), `web/lib/supabase/*`, `web/lib/queries/*`, `web/lib/types/roles.ts`, `web/app/api/leads/route.ts` y `web/.env.example`.

## Estado
COMPLETADO

---
## Nota de push (protocolo D07)
No se ejecutó `git add`, `git commit` ni `git push`. La decisión de publicar queda en manos del usuario.
