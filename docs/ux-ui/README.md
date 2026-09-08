# Diseño UX/UI — mockup-inmobiliaria

Documentación de la **arquitectura de información** y **estructura visual** del sitio. Generada por el **Agente 01 — UX/UI**.

> **Propósito:** que el Agente 03 (Frontend) pueda construir la interfaz sin re-preguntar decisiones. Este paquete es **diseño, no código**. No hay HTML/CSS/JS acá.

## Objetivos del producto (recordenados para diseño)

El sitio debe transmitir: **confianza, profesionalismo, exclusividad, modernidad, facilidad de navegación, calidad visual, tecnología** y, sobre todo, **conversión de visitantes en clientes**.

Todo el diseño se subordina a estos objetivos.

## Cómo leer estos documentos

| Documento | Qué cubre | Para qué sirve |
|---|---|---|
| [`sitemap.md`](./sitemap.md) | Lista de páginas, jerarquía de URLs, y cuáles entran en el mockup inicial | Definir la estructura de navegación y qué construir |
| [`layout.md`](./layout.md) | Estructura de header/hero/footer, grid, breakpoints, jerarquía visual, CTAs | Construir el esqueleto y el responsive |
| [`componentes.md`](./componentes.md) | Inventario de componentes, propósito, contenido y estados | Construir cada bloque reutilizable |
| [`flujos.md`](./flujos.md) | Recorridos de usuario y patrones de interacción | Definir la UX de búsqueda, filtros, galería y formularios |

## Stack de referencia (NO decidido aún)

El stack técnico lo define el Agente 03 (Frontend) y el Agente 07 (Backend) en Fase 3. **Restricción vigente (D03):** el diseño debe ser compatible con un backend futuro (Supabase u otro). Por eso los componentes se describen de forma **agnóstica al stack**, usando nomenclatura de contenido, no de framework.

## Estados globales

Todos los componentes describen al menos estos estados: `default`, `hover`, `focus`, `active`, `disabled`, `loading`, `empty` (vacío) y `error`. Ver [`componentes.md`](./componentes.md) → sección "Estados".

## Convenciones de identificación

- **Páginas:** `P-01`, `P-02`, etc. → ver [`sitemap.md`](./sitemap.md).
- **Componentes:** `C-01`, `C-02`, etc. → ver [`componentes.md`](./componentes.md).
- **Decisiones UX:** `DUX-NN` → registradas en `historial-prompts/decisiones.md`.

## Pendiente del usuario / Director

- [ ] **Push a GitHub** — pendiente de confirmación del usuario (protocolo D07). El Agente 01 NO pusheó nada.
- [ ] **Siguiente fase:** Agente 02 — Branding (paleta de color, tipografía, estilo visual, logo).

---

*Continuidad: ver `historial-prompts/01-ux-ui.md`. Para el contexto general ver `historial-prompts/README.md` y `00-director.md`.*
