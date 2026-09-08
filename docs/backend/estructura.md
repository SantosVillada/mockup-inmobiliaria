# Estructura del backend — mockup-inmobiliaria

> Carpetas, archivos, variables de entorno (`.env.example`) y estado de lo que ya se creó en `web/`.

---

## 1. Estructura de carpetas

```
mockup-inmobiliaria/
├── docs/
│   ├── propiedades/  agentes/  marketing/  ux-ui/  branding/   # diseño (existente)
│   └── backend/                                                # ESTA carpeta
│       ├── README.md
│       ├── arquitectura.md
│       ├── esquema-sql.md
│       ├── auth-roles.md
│       ├── integraciones.md
│       ├── migracion-mockup.md
│       └── estructura.md
├── historial-prompts/                                          # memoria (existente)
└── web/                                                        # app Next.js
    ├── .env.example                                            # (creado)
    ├── app/
    │   ├── api/leads/route.ts                                  # (creado) POST público de leads
    │   ├── admin/          (futuro)
    │   ├── login/ signup/  (futuro)
    │   └── ...páginas públicas (existentes)
    ├── lib/
    │   ├── supabase/
    │   │   ├── client.ts                                       # (creado) browser client
    │   │   ├── server.ts                                       # (creado) server client
    │   │   ├── admin.ts                                        # (creado) service role
    │   │   └── middleware.ts                                   # (creado) updateSession
    │   ├── queries/
    │   │   ├── propiedades.ts                                  # (creado)
    │   │   ├── agentes.ts                                      # (creado)
    │   │   └── leads.ts                                        # (creado) crearLead
    │   ├── types/
    │   │   ├── types.ts                                        # (existente)
    │   │   └── roles.ts                                        # (creado) roles/permisos
    │   ├── data/                                               # datos demo (a migrar)
    │   └── constants.ts / utils.ts                             # (existentes, ajustados)
    └── package.json                                            # (se agregaron @supabase/*)
```

---

## 2. Variables de entorno

### 2.1 `.env.example` (creado en `web/.env.example`)

```dotenv
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...   # SOLO servidor, nunca exponer

# Auth / site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# WhatsApp institucional (DMK-13)
NEXT_PUBLIC_WHATSAPP_NUMBER=5491155550000
NEXT_PUBLIC_WHATSAPP_DISPLAY=+54 9 11 5555 0000

# Email (Resend o Supabase Email)
EMAIL_FROM=MORADA <hola@morada.com.ar>
RESEND_API_KEY=re_...

# Supabase Storage
NEXT_PUBLIC_STORAGE_BUCKET_PROPIEDADES=propiedades
NEXT_PUBLIC_STORAGE_BUCKET_AGENTES=agentes
```

### 2.2 Uso en código

| Variable | Dónde se usa | Seguridad |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `lib/supabase/client|server|admin.ts` | pública |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client/server (anon) | pública (segura en navegador) |
| `SUPABASE_SERVICE_ROLE_KEY` | `admin.ts` | **secreta, solo servidor** |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `lib/constants.ts` (fallback demo) | pública |
| `NEXT_PUBLIC_SITE_URL` | Auth redirects / emails | pública |

> **Regla:** cualquier variable `SUPABASE_*` sin `NEXT_PUBLIC_` es secreta y **no** debe importarse en componentes cliente.

### 2.3 Archivos

- `.env.example` → se **commitea** (se agregó `!.env.example` al `.gitignore`).
- `.env.local` → **nunca** se commitea (queda en `.gitignore` con `.env*`).
- En Vercel → agregar las variables como Environment Variables.

---

## 3. Qué ya está creado en `web/` (no rompe build)

| Archivo | Estado | Rol |
|---|---|---|
| `lib/supabase/client.ts` | ✅ creado | Browser client |
| `lib/supabase/server.ts` | ✅ creado | Server client (cookies) |
| `lib/supabase/admin.ts` | ✅ creado | Service role (server only) |
| `lib/supabase/middleware.ts` | ✅ creado | `updateSession` (helper; se activa con `web/middleware.ts`) |
| `lib/queries/propiedades.ts` | ✅ creado | Lectura de propiedades |
| `lib/queries/agentes.ts` | ✅ creado | Lectura de agentes |
| `lib/queries/leads.ts` | ✅ creado | `crearLead` |
| `lib/types/roles.ts` | ✅ creado | Roles y permisos |
| `app/api/leads/route.ts` | ✅ creado | `POST /api/leads` (público) |
| `.env.example` | ✅ creado | Variables de entorno |
| `lib/constants.ts` | ✏️ ajustado | WhatsApp institucional por env (DMK-13) |
| `lib/utils.ts` | ✏️ ajustado | `waLinkGeneral` usa la constante |
| `components/conversion/FormularioVender.tsx` | ✏️ ajustado | usa la constante |
| `app/vender/page.tsx` | ✏️ ajustado | usa la constante |
| `web/.gitignore` | ✏️ ajustado | `!.env.example` |
| `package.json` | ✏️ ajustado | se agregó `@supabase/supabase-js` + `@supabase/ssr` |

> **Verificación:** `npm run build` y `npm run lint` pasan con estos cambios. No hay proyecto Supabase real todavía, por lo que el sitio sigue usando datos demo; los nuevos módulos solo se activan cuando se conectan (ver `migracion-mockup.md`).

---

## 4. Plan de implementación por fases

| Fase | Objetivo | Entregable |
|---|---|---|
| **F1 — Datos reales** | Crear Supabase, correr `esquema-sql.md`, seed de demo, conectar `lib/queries/*` en páginas públicas. | Sitio con catálogo real. |
| **F2 — Leads** | Conectar los 4 formularios a `POST /api/leads`. | Captura real de leads. |
| **F3 — Auth / Admin** | Habilitar Supabase Auth, `middleware.ts`, login, `app/admin/*` con RLS. | Gestión de propiedades/agentes/leads con roles. |
| **F4 — Integraciones** | Storage, email (doble opt-in / confirmaciones), mapa real, notificaciones, analytics. | Producto completo. |
| **F5 — Optimización** | SEO dinámico, caching, rendimiento, pruebas. | Pulido. |

> La FASE 3 del roadmap global corresponde a "Frontend → Arquitectura futura" (Agente 07). La FASE 4 del roadmap global es **QA (Agente 08)**.

---

*Relacionado: `docs/backend/README.md`, `docs/backend/migracion-mockup.md`, `docs/backend/integraciones.md`.*
