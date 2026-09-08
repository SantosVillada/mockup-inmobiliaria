# Agentes Inmobiliarios — mockup-inmobiliaria

Documentación del **contenido y modelo de datos de los agentes** (NO código frontend). Generada por el **Agente 05 — Agentes Inmobiliarios**, en FASE 2.

> **Propósito:** que el Agente 03 (Frontend) pueda construir las vistas de agentes con datos realistas y un esquema claro, y que el futuro backend (Supabase u otro, Agente 07) mapee directo. Todo acá es **diseño de datos + contenido**, sin HTML/CSS/JS.

## Cómo se relaciona con lo anterior

- **UX/UI (Agente 01)** definió páginas y componentes: `P-04` (listado de agentes), `P-05` (perfil de agente), y componentes `C-02` (tarjeta de agente), `C-16` (perfil de agente), `C-13` (WhatsApp), `C-04` (formulario), `C-19` (stat), `C-08` (chips/badges). Acá aterrizo **qué datos muestran**.
- **Branding (Agente 02)** definió la marca: azul petróleo `#174A75` + dorado `#C7A55A`, Sora+Inter, tono rioplatense, CTAs verbo-primero. Acá aplico el **tono y las reglas de CTA** a los agentes.
- **Propiedades (Agente 04)** definió la tabla `propiedades` con el campo `agente_id` (FK) y valores demo `agt-01`…`agt-04`. Acá defino la **tabla `agentes`** y la relación 1:N.

## Documentos

| Documento | Qué define |
|---|---|
| [`modelo-datos.md`](./modelo-datos.md) | Tabla `agentes` (campos, tipos, requerido), cargo, especialidades, estadísticas, idiomas, zonas de cobertura, redes, y relación 1:N con `propiedades`. |
| [`tarjeta.md`](./tarjeta.md) | Componente `C-02`: campos, orden, variantes (compacta/estándar/destacada/perfil) y comportamiento responsive. |
| [`perfil.md`](./perfil.md) | `P-05` / `C-16`: estructura completa (header, bio, especialidades, idiomas, stats, CTAs, propiedades del agente). |
| [`contacto.md`](./contacto.md) | Cómo contactar al agente: WhatsApp con mensaje pre-cargado (incluye agente y/o propiedad) + formulario `C-04` (campos mínimos). |
| [`datos-demo.md`](./datos-demo.md) | 5 agentes de ejemplo (rioplatense) con asignación de las propiedades demo (`agt-01`…`agt-04`). |

## Resumen ejecutivo

1. **Modelo de datos:** una tabla `agentes` normalizada, pensada para Supabase: `id` (uuid), `slug` (único), `nombre`+`apellido`, `email`, `telefono`, `whatsapp` (solo dígitos, para `wa.me`), `foto` (3:4), `cargo`, `especialidades` (jsonb), `idiomas` (jsonb), `bio`, `anios_experiencia`, `estadisticas` (jsonb), `zona_cobertura` (jsonb), `redes` (jsonb), `activo`, `orden`, `publicado_en`.
2. **Cargo:** lista recomendada (asesor / asesor-senior / especialista-inversion / broker / director-comercial).
3. **Especialidades:** lista controlada (residencial, venta-departamentos, alquileres, ph, comercial, inversion, obra-nueva) con clave/label/icono.
4. **Idiomas y zonas de cobertura:** listas controladas; las zonas reutilizan las de `propiedades` (DPR-08).
5. **Relación 1:N:** `propiedades.agente_id` → `agentes.id`. "Propiedades del agente" = propiedades activas del agente, ordenadas por `publicado_en DESC`.
6. **Tarjeta `C-02`:** 4 variantes (compacta, estándar, destacada, perfil). La variante **perfil** se usa en `P-03` (detalle de propiedad).
7. **Perfil `P-05` / `C-16`:** header (foto, nombre, cargo, chips), stats `C-19`, bio, especialidades/zonas, propiedades (grid `C-01`), CTAs WhatsApp + formulario.
8. **Contacto:** WhatsApp como canal principal (DUX-D29) con mensaje pre-cargado que incluye el agente y/o la propiedad; formulario `C-04` mínimo (≤4 campos, DUX-D30).
9. **Datos demo:** 5 agentes rioplatenses; `agt-01`…`agt-04` asignados a las propiedades demo, `agt-05` (director) sin propiedades (demuestra estado vacío).

## Convenciones de identificación

- **Decisiones de este agente:** `DAG-NN` → registradas en `historial-prompts/decisiones.md`.
- **Decisiones heredadas:** `DUX-D26` (un CTA primario), `DUX-D28` (estados vacío/loading/error), `DUX-D29` (WhatsApp canal principal), `DUX-D30` (formulario mínimo), `DUX-D25` (CTA sticky), `DPR-08` (zonas normalizadas), `DBR-06` (tono rioplatense), `DBR-09` (contraste).

## Pendiente del usuario / Director

- [ ] **Push a GitHub** — pendiente de confirmación del usuario (protocolo D07). El Agente 05 NO pusheó nada.
- [ ] **Siguiente fase:** Agente 06 — Conversión/Marketing (profundizar CTAs, formularios, mensajes, SEO/contenido de conversión).

---

*Continuidad: ver `historial-prompts/05-agentes.md`. Para contexto general ver `historial-prompts/README.md` y `00-director.md`.*
