# AGENTE 03 — FRONTEND

Registro del Agente de Frontend.

> **Regla de finalización (obligatoria):** Antes de cerrar, preguntá al usuario:
> 1. ¿Push de los últimos cambios a GitHub? (Sí / No)
> 2. ¿A la rama `main` o a una nueva rama? (indicar nombre si es nueva)

## Prompt / Instrucción
Implementar el mockup de la inmobiliaria **MORADA** con **Next.js (App Router) + TypeScript + Tailwind CSS**, siguiendo la documentación de diseño en `docs/` (UX/UI, Branding, Propiedades, Agentes, Marketing) y los historiales de prompts. Construir componentes (`C-01`…`C-20`), páginas (`P-01`…`P-07` + `/vender`), con tokens de marca, fuentes Sora/Inter, WhatsApp con mensajes pre-cargados, formularios simulados, estados loading/empty/error, y que el proyecto compile sin errores. NO hacer `git add/commit/push` (protocolo D07). No tocar `docs/` ni `historial-prompts/`.

## Fecha
2026-09-08

## Objetivo
Entregar el sitio web funcional (mockup) que compila, con todas las páginas y componentes del diseño, coherente con la marca y listo para que el Agente 07 (Backend) lo conecte a Supabase.

## Resultado

### Stack
- **Next.js 16.3.4** (App Router, Turbopack) + **React 19** + **TypeScript 5** + **Tailwind CSS v4** (tema configurado vía `@theme` en `app/globals.css`) + **lucide-react** (iconos line).
- Fuentes **Sora** (display) e **Inter** (body) cargadas con `next/font/google`.
- Nada de `src/`; estructura en `app/`, `components/` y `lib/` con alias `@/*`.

### Ubicación
`create-next-app` se niega a inicializar en la raíz del repo (existen `docs/`, `historial-prompts/`, `.git`). Decisión: proyecto en la subcarpeta **`web/`** (DFE-01). La raíz conserva `docs/` y `historial-prompts/`.

### Estructura
- `app/` — rutas: `/` (Home P-01), `/propiedades` (P-02), `/propiedades/[slug]` (P-03), `/agentes` (P-04), `/agentes/[slug]` (P-05), `/contacto` (P-06), `/nosotros` (P-07), `/vender` (landing sellers). `layout.tsx` (header/footer/whatsapp), `not-found.tsx`, `globals.css`.
- `components/` — `ui/` (Button, Badge, Stat, Icon, Logo, Container, SectionHeading, Modal, Drawer, Accordion, Skeleton), `layout/` (Header, Footer, Breadcrumb, PageHeader, WhatsAppWidget), `propiedades/` (TarjetaPropiedad, Filtros, ChipsFiltros, Paginacion, Galeria, FichaTecnica, Mapa, MiniBuscador, PropiedadesListado, DetalleContacto), `agentes/` (TarjetaAgente, PerfilAgente), `conversion/` (FormularioContacto, FormularioVender, Newsletter, ModalVisita, CarruselTestimonios, ContactoBarra).
- `lib/` — `types.ts` (`Propiedad`, `Agente`, `Lead`, etc.), `constants.ts` (zonas, tipos, amenities, especialidades, número institucional…), `utils.ts` (formato de precio, `wa.me` con mensajes, filtros), `data/propiedades.ts` (10 propiedades demo) y `data/agentes.ts` (5 agentes demo), tipados según `docs/`.

### Páginas implementadas
- **P-01 Home** — hero + mini-buscador + destacadas + búsqueda por zona/tipo + por qué elegirnos + stats + testimonios + agentes destacados + CTA/newsletter.
- **P-02 Propiedades** — filtros (sidebar sticky desktop / drawer mobile) con URL params, chips removibles, grid, paginación, estados vacío/loading.
- **P-03 Detalle** — galería (con lightbox), badges, precio, ficha técnica, descripción, amenities, mapa (OSM), agente + CTAs sticky, similares, barra sticky mobile.
- **P-04 Agentes** — grid de tarjetas.
- **P-05 Perfil Agente** — header, stats, bio, chips, propiedades (con estado vacío para Carolina), CTAs sticky.
- **P-06 Contacto** — formulario + datos + WhatsApp + mapa + FAQ acordeón.
- **P-07 Nosotros** — misión, valores, stats, equipo, CTA.
- **/vender** — landing sellers (hero, beneficios, cartera, stats, cómo funciona, formulario seller, FAQ, CTA).

### Componentes clave (C-01…C-20)
Header (sticky+drawer), Footer, Breadcrumb, TarjetaPropiedad (3 variantes), TarjetaAgente (3 variantes), Barra de Filtros (URL params + chips), FormularioContacto (4 campos, validación inline, success), Badge (operación/estado), Paginacion, Acordeon, Galeria, CarruselTestimonios, WhatsApp (botón/flotante/detalle con mensajes pre-cargados), Drawer, MiniBuscador, PerfilAgente, CTA/Button (variantes), Modal (visita), Stat, Icon (lucide + WhatsApp SVG), Logo monograma "M".

### Verificación
- `npm run build` → **OK** (compila, TypeScript pasa, 19 páginas estáticas generadas; `/agentes/[slug]` dinámico).
- `npm run lint` → **sin errores ni warnings**.
- Smoke test con `next start` (localhost:3100): `/`, `/propiedades`, `/propiedades/depto-2-ambientes-palermo-soho`, `/agentes`, `/agentes/sofia-dominguez`, `/contacto`, `/nosotros`, `/vender` → **200**; slug inexistente → **404** (not-found).

## Archivos modificados
- `web/` (proyecto Next.js generado con create-next-app, dentro del repo).
- `web/app/globals.css` — tema Tailwind v4 con tokens de marca (colores, radios, sombras, fuentes).
- `web/app/layout.tsx` — fuentes Sora/Inter, metadata, Header/Footer/WhatsApp.
- `web/app/page.tsx`, `web/app/not-found.tsx`.
- `web/app/propiedades/page.tsx`, `web/app/propiedades/[slug]/page.tsx`, `web/app/propiedades/[slug]/not-found.tsx`.
- `web/app/agentes/page.tsx`, `web/app/agentes/[slug]/page.tsx`, `web/app/agentes/[slug]/not-found.tsx`.
- `web/app/contacto/page.tsx`, `web/app/nosotros/page.tsx`, `web/app/vender/page.tsx`.
- `web/components/**` (ui, layout, propiedades, agentes, conversion) — ~34 archivos.
- `web/lib/types.ts`, `web/lib/constants.ts`, `web/lib/utils.ts`, `web/lib/data/propiedades.ts`, `web/lib/data/agentes.ts`.
- `web/eslint.config.mjs` — regla `@next/next/no-img-element` desactivada (imágenes placeholder externas).
- `web/package.json`, `web/package-lock.json` — se agregó `lucide-react`.
- `historial-prompts/03-frontend.md` — este registro.
- `historial-prompts/decisiones.md` — sección `DFE` (ver Decisiones).

## Decisiones tomadas
- **Ubicación:** proyecto en `web/` (DFE-01) — `create-next-app` no puede inicializar en la raíz por archivos existentes (`docs/`, `historial-prompts/`, `.git`).
- **Stack:** Next 16 App Router + TS + Tailwind v4 (tema vía `@theme`) + lucide-react (DFE-02). 
- **Tema de marca:** tokens de `docs/branding/tokens.md` mapeados a `@theme`; fuentes Sora+Inter con `next/font/google` (DFE-03).
- **Estructura:** `app/` + `components/` + `lib/`, alias `@/*` (DFE-04); datos demo tipados en `lib/data/` (DFE-05).
- **Imágenes:** `<img>` con placeholders picsum/pravatar (DFE-06); regla ESLint de `<img>` desactivada.
- **Filtros/paginación:** URL params (DUX-D31), sidebar sticky desktop / drawer mobile (DUX-D23) (DFE-07).
- **Formularios:** simulados (loading→success) sin backend; WhatsApp `wa.me` con mensajes pre-cargados por contexto (DFE-08).
- **Logo:** monograma "M" SVG + wordmark MORADA (DFE-09).
- **Detalle P-03:** columna derecha sticky con agente + CTAs + formulario; barra fija inferior en mobile (DUX-D25) (DFE-10).

## Próximo paso
Sigue el **Agente 07 — Backend/Arquitectura** en FASE 3 (conectar a Supabase: persistir `propiedades`, `agentes`, `leads`; centralizar el número institucional; autenticación/RLS) y luego **QA**. Deberá revisar `web/lib/data/` (fuente de datos demo a migrar a queries), `web/lib/utils.ts` (formato de precios/mensajes WhatsApp), `web/components/conversion/` (formularios → persistencia de leads), y `web/app/` (páginas que hoy usan datos locales).

## Estado
COMPLETADO
