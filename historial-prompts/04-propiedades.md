# AGENTE 04 — PROPIEDADES

Registro del Agente de Propiedades.

> **Regla de finalización (obligatoria):** Antes de cerrar, preguntá al usuario:
> 1. ¿Push de los últimos cambios a GitHub? (Sí / No)
> 2. ¿A la rama `main` o a una nueva rama? (indicar nombre si es nueva)

## Prompt / Instrucción
Actuar como **Agente 04 — Propiedades** del proyecto `mockup-inmobiliaria`. Definir y documentar **todo lo relacionado con propiedades** (contenido y modelo de datos, NO código frontend): modelo de datos compatible con Supabase/backend, tipos/categorías, badges y semántica de color, tarjeta `C-01` y variantes, barra de búsqueda/filtros `C-03` (incl. chips y URL params), tiles de acceso rápido del Home, detalle `P-03` (galería `C-11`, ficha, amenities, mapa, agente, similares, CTA sticky), amenities estándar, datos demo (8–12 propiedades) y justificaciones con IDs `DPR-NN`. Apoyarse en el Agente 01 (UX/UI) y el Agente 02 (Branding). Entregar en `docs/propiedades/`. NO hacer push (protocolo D07).

## Fecha
2026-09-08

## Objetivo
Dejar un **modelo de datos y contenido de propiedades claro, reutilizable y compatible con un backend futuro**, que el Agente 03 (Frontend) pueda consumir sin re-preguntar y que el Agente 07 (Backend/Supabase) pueda mapear directo.

## Resultado
- Se creó la carpeta `docs/propiedades/` con **6 documentos** de diseño (ver Archivos modificados).
- **Modelo de datos:** tabla `propiedades` normalizada (23 campos con tipo y requerido), pensada para Supabase (`id` uuid, `slug` único, `precio`+`moneda`, `operacion`, `tipo`, `zona`/`ciudad`, métricas, `caracteristicas` jsonb, `imagenes` jsonb, `agente_id` FK, etc.).
- **Tipos/categorías:** enum cerrado `casa`/`departamento`/`ph`/`local`/`terreno`, agrupados en Vivienda / Comercial / Terreno para filtros.
- **Badges/estados:** operación en azul marca; estado premium (NUEVO/EXCLUSIVO/OPORTUNIDAD) en ámbar/dorado; no disponible (RESERVADO/VENDIDO) en gris. Aterrizado en tokens de `docs/branding/colores.md`.
- **Zonas normalizadas** (slug + ciudad) para filtros, tiles y URL params.
- **Tarjeta `C-01`:** campos en orden, 3 variantes (destacada/estándar/mini), responsive, estados. Aterriza **DUX-D27** (precio/operación siempre visibles).
- **Filtros `C-03`:** 10 filtros exactos + ordenamiento, chips de filtros activos, mapa de URL params (DUX-D31), diseño sidebar/drawer (DUX-D23), estados.
- **Tiles de acceso rápido (Home):** categorías/tipo + zona, con URL pre-cargada.
- **Detalle `P-03`:** estructura de 12 bloques, galería `C-11` (spec completa), ficha técnica, amenities, mapa, agente `C-02`, similares, CTA sticky (DUX-D25/D33).
- **Amenities:** lista controlada (clave/label/icono) en 4 categorías.
- **Datos demo:** 10 propiedades rioplatenses (venta/alquiler, distintos tipos y zonas), con imágenes placeholder (picsum) y `alt` descriptivo. Precios en ARS.
- Se registraron decisiones `DPR-01`…`DPR-11` en `decisiones.md`.
- **NO se hizo push** (protocolo D07). Pendiente confirmación del usuario.

## Archivos modificados
- `docs/propiedades/README.md` (creado — índice + resumen)
- `docs/propiedades/modelo-datos.md` (creado — tabla `propiedades`, tipos, badges, zonas, amenities, imágenes)
- `docs/propiedades/tarjeta.md` (creado — `C-01` y variantes, responsive)
- `docs/propiedades/filtros-busqueda.md` (creado — `C-03`, filtros, chips, URL params, tiles de acceso rápido)
- `docs/propiedades/detalle.md` (creado — `P-03`: galería, ficha, amenities, mapa, agente, similares, CTA sticky)
- `docs/propiedades/datos-demo.md` (creado — 10 propiedades de ejemplo en JSON)
- `historial-prompts/04-propiedades.md` (editado — este registro)
- `historial-prompts/decisiones.md` (editado — sección DPR-01…11)

## Decisiones tomadas
- **DPR-01:** Modelo de datos orientado a Supabase (tabla `propiedades` normalizada, `jsonb` para características/imágenes, FK `agente_id`).
- **DPR-02:** `precio` numérico + `moneda` (ARS default); `operacion=alquiler` → precio mensual.
- **DPR-03:** Tipos como enum cerrado (casa/departamento/ph/local/terreno) con agrupación en filtros (Vivienda/Comercial/Terreno).
- **DPR-04:** Badges de operación en azul marca; estado premium (NUEVO/EXCLUSIVO/OPORTUNIDAD) en ámbar/dorado; no disponible (RESERVADO/VENDIDO) en gris (semántica de `colores.md`).
- **DPR-05:** Tarjeta `C-01` con precio y operación siempre visibles (DUX-D27); 3 variantes (destacada/estándar/mini).
- **DPR-06:** Filtros `C-03` reflejados en URL params (DUX-D31); chips de filtros activos removibles.
- **DPR-07:** `slug` como URL canónica de `P-03` (estabilidad SEO).
- **DPR-08:** Zonas normalizadas (slug + ciudad) para filtros/tiles.
- **DPR-09:** Características como lista controlada de claves (amenities) para mostrar y filtrar.
- **DPR-10:** Datos demo con 10 propiedades representativas (variedad de operación/tipo/zona/precio).
- **DPR-11:** Imágenes placeholder deterministas (picsum) con `alt` descriptivo; reemplazables por fotos reales.

## Próximo paso
Sigue el **Agente 05 — Agentes Inmobiliarios** (FASE 2) para definir el modelo de datos de agentes (`C-02`/`C-16`), los perfiles y cómo se asocian a propiedades (el campo `agente_id` ya está definido con valores demo `agt-01`…`agt-04`). Pendiente del usuario: confirmar **push** (D07) de los cambios de Propiedades.

## Estado
COMPLETADO
