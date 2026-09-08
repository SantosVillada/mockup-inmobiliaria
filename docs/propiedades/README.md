# Propiedades — mockup-inmobiliaria

Documentación del **contenido y modelo de datos de las propiedades** (NO código frontend). Generada por el **Agente 04 — Propiedades**, en FASE 2.

> **Propósito:** que el Agente 03 (Frontend) pueda construir las vistas de propiedades con datos realistas y un esquema claro, y que el futuro backend (Supabase u otro, Agente 07) mapee directo. Todo acá es **diseño de datos + contenido**, sin HTML/CSS/JS.

## Cómo se relaciona con lo anterior

- **UX/UI (Agente 01)** definió páginas y componentes: `P-02` (listado), `P-03` (detalle), y componentes `C-01` (tarjeta), `C-03` (filtros), `C-08` (badge), `C-09` (paginación), `C-11` (galería), `C-15` (mini-buscador), `C-20` (iconos). Acá aterrizo **qué datos muestran**.
- **Branding (Agente 02)** definió la marca: azul petróleo `#174A75` + dorado `#C7A55A`, tipografía Sora+Inter, tokens. Acá defino la **semántica de color de los badges** según `docs/branding/colores.md`.

## Documentos

| Documento | Qué define |
|---|---|
| [`modelo-datos.md`](./modelo-datos.md) | Tabla `propiedades` (campos, tipos, requerido), tipos/categorías, badges y semántica de color. |
| [`tarjeta.md`](./tarjeta.md) | Componente `C-01`: campos, orden, variantes (destacada/estándar/mini) y comportamiento responsive. |
| [`filtros-busqueda.md`](./filtros-busqueda.md) | `C-03`: filtros exactos, cómo se aplican, chips de filtros activos y URL params (DUX-D31). |
| [`detalle.md`](./detalle.md) | `P-03`: galería (`C-11`), ficha técnica, características, ubicación/mapa, agente (`C-02`), similares, CTA sticky. |
| [`datos-demo.md`](./datos-demo.md) | 10 propiedades de ejemplo (español rioplatense) para el mockup, con imágenes placeholder. |

## Resumen ejecutivo

1. **Modelo de datos:** una tabla `propiedades` normalizada, pensada para Supabase: `id` (uuid), `slug` (único), `titulo`, `descripcion`, `precio` (numérico) + `moneda`, `operacion` (`venta`/`alquiler`), `tipo` (`casa`/`departamento`/`ph`/`local`/`terreno`), `zona` + `ciudad`, `direccion`, `ambientes`, `dormitorios`, `banos`, `superficie_total_m2`, `superficie_cubierta_m2`, `antiguedad_anios`, `disponible`, `estado`, `destacado`, `caracteristicas` (jsonb), `latitud`/`longitud`, `imagenes` (jsonb), `agente_id` (FK), `publicado_en`, `codigo`.
2. **Tipos/categorías:** enum cerrado con agrupación para filtros (Vivienda / Comercial / Terreno).
3. **Badges:** operación en azul marca; estado premium (NUEVO/EXCLUSIVO/OPORTUNIDAD) en ámbar/dorado; no disponible (RESERVADO/VENDIDO) en gris. Siempre aterrizado en tokens de `colores.md`.
4. **Tarjeta `C-01`:** imagen + badges → zona/ubicación → título → métricas → **precio + operación siempre visibles** (DUX-D27) → CTA "Ver detalles". 3 variantes.
5. **Filtros `C-03`:** operación, tipo, zona, precio min/max, ambientes/dormitorios, m², texto. Se reflejan en URL params (DUX-D31) y se muestran como chips removibles.
6. **Tiles de acceso rápido (Home):** "Búsqueda por zona/tipo" pre-carga filtros en `P-02` (ver `filtros-busqueda.md` §7).
7. **Detalle `P-03`:** galería → título/precio → CTAs → ficha técnica → descripción → amenities → mapa → agente → similares → sticky CTA.
8. **Datos demo:** 10 propiedades variando operación/tipo/zona/precio, en pesos argentinos (ARS, configurable).

## Convenciones de identificación

- **Decisiones de este agente:** `DPR-NN` → registradas en `historial-prompts/decisiones.md`.
- **Decisiones heredadas:** `DUX-D23` (filtros sidebar/drawer), `DUX-D24` (galería carrusel/mosaico), `DUX-D25` (sticky CTA), `DUX-D27` (precio/operación siempre visibles), `DUX-D31` (filtros por URL).

## Pendiente del usuario / Director

- [ ] **Push a GitHub** — pendiente de confirmación del usuario (protocolo D07). El Agente 04 NO pusheó nada.
- [ ] **Siguiente fase:** Agente 05 — Agentes Inmobiliarios (definir el modelo de datos de agentes, `C-02`/`C-16`, perfiles y cómo se asocian a propiedades).

---

*Continuidad: ver `historial-prompts/04-propiedades.md`. Para contexto general ver `historial-prompts/README.md` y `00-director.md`.*
