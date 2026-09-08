# AGENTE 05 — AGENTES INMOBILIARIOS

Registro del Agente de Agentes Inmobiliarios.

> **Regla de finalización (obligatoria):** Antes de cerrar, preguntá al usuario:
> 1. ¿Push de los últimos cambios a GitHub? (Sí / No)
> 2. ¿A la rama `main` o a una nueva rama? (indicar nombre si es nueva)

## Prompt / Instrucción
Actuar como **Agente 05 — Agentes Inmobiliarios** del proyecto `mockup-inmobiliaria`. Definir y documentar **todo lo relacionado con agentes inmobiliarios** (contenido y modelo de datos, NO código frontend): modelo de datos de la futura tabla `agentes` (Supabase/backend), especialidades como lista controlada, zonas de cobertura, relación `agentes.id` ← `propiedades.agente_id` (1:N), tarjeta `C-02` y variantes, perfil `P-05`/`C-16`, contacto con el agente (WhatsApp con mensaje pre-cargado + formulario `C-04`), datos demo (4–5 agentes rioplatenses con asignación de las propiedades `agt-01`…`agt-04`) y justificaciones con IDs `DAG-NN`. Apoyarse en el Agente 01 (UX/UI), Agente 02 (Branding) y Agente 04 (Propiedades). Entregar en `docs/agentes/`. NO hacer push (protocolo D07).

## Fecha
2026-09-08

## Objetivo
Dejar un **modelo de datos y contenido de agentes claro, reutilizable y compatible con un backend futuro**, que el Agente 03 (Frontend) pueda consumir sin re-preguntar y que el Agente 07 (Backend/Supabase) pueda mapear directo. Aterrizar la confianza "por personas" del sitio y completar la relación `agente_id` que dejó abierta el Agente 04.

## Resultado
- Se creó la carpeta `docs/agentes/` con **5 documentos** de diseño (ver Archivos modificados).
- **Modelo de datos:** tabla `agentes` normalizada (21 campos con tipo y requerido), pensada para Supabase (`id` uuid, `slug` único, `nombre`+`apellido`, `email`, `telefono`, `whatsapp` solo dígitos para `wa.me`, `foto` 3:4, `cargo`, `especialidades` jsonb, `idiomas` jsonb, `bio`, `anios_experiencia`, `estadisticas` jsonb, `zona_cobertura` jsonb, `redes` jsonb, `activo`, `orden`, `publicado_en`).
- **Cargo:** lista recomendada (asesor / asesor-senior / especialista-inversion / broker / director-comercial).
- **Especialidades:** lista controlada (residencial, venta-departamentos, alquileres, ph, comercial, inversion, obra-nueva) con clave/label/icono y relación con tipos de propiedad.
- **Idiomas y zonas de cobertura:** listas controladas; las zonas reutilizan las normalizadas de `propiedades` (DPR-08).
- **Relación 1:N:** `propiedades.agente_id` → `agentes.id`; "propiedades del agente" = propiedades activas, ordenadas por `publicado_en DESC`, con estado vacío (DUX-D28).
- **Tarjeta `C-02`:** 4 variantes (compacta / estándar / destacada / perfil). La variante **perfil** se usa en `P-03` (detalle de propiedad).
- **Perfil `P-05` / `C-16`:** estructura completa (breadcrumb, header, stats `C-19`, bio, especialidades/zonas, propiedades grid `C-01`, CTAs, sticky mobile).
- **Contacto:** WhatsApp como canal principal (DUX-D29) con plantillas de mensaje pre-cargado por contexto (incluye agente y/o propiedad) + formulario `C-04` mínimo (≤4 campos, DUX-D30), con asunto implícito al agente/propiedad.
- **Datos demo:** 5 agentes rioplatenses; `agt-01`…`agt-04` asignados a las propiedades demo (prop-001..prop-010), `agt-05` (director comercial) sin propiedades (demuestra estado vacío).
- Se registraron decisiones `DAG-01`…`DAG-11` en `decisiones.md`.
- **NO se hizo push** (protocolo D07). Pendiente confirmación del usuario.

## Archivos modificados
- `docs/agentes/README.md` (creado — índice + resumen)
- `docs/agentes/modelo-datos.md` (creado — tabla `agentes`, cargo, especialidades, idiomas, zonas, redes, relación con propiedades)
- `docs/agentes/tarjeta.md` (creado — `C-02` y 4 variantes, responsive, estados)
- `docs/agentes/perfil.md` (creado — `P-05` / `C-16`: estructura completa)
- `docs/agentes/contacto.md` (creado — WhatsApp pre-cargado + formulario `C-04`, plantillas por contexto)
- `docs/agentes/datos-demo.md` (creado — 5 agentes de ejemplo en JSON + asignación de propiedades)
- `historial-prompts/05-agentes.md` (editado — este registro)
- `historial-prompts/decisiones.md` (editado — sección DAG-01…11)

## Decisiones tomadas
- **DAG-01:** Modelo de datos de agente orientado a Supabase (tabla `agentes` normalizada, JSONB para especialidades/idiomas/zonas/redes/estadísticas).
- **DAG-02:** `slug` como URL canónica de `P-05` (`/agentes/:slug`), generado con nombre+apellido; nunca cambia.
- **DAG-03:** Especialidades como lista controlada (clave/label/icono) para etiquetas, filtros y bio.
- **DAG-04:** Zonas de cobertura reutilizan las zonas normalizadas de `propiedades` (DPR-08); no inventar zonas.
- **DAG-05:** Relación 1:N agentes ↔ propiedades vía `propiedades.agente_id`; "propiedades del agente" = activas, ordenadas por `publicado_en DESC`, con estado vacío.
- **DAG-06:** Tarjeta `C-02` con 4 variantes (compacta/estándar/destacada/perfil); la de perfil se usa en `P-03`.
- **DAG-07:** WhatsApp con mensaje pre-cargado que incluye el agente y/o la propiedad (contexto), con plantillas por contexto y URL-encode.
- **DAG-08:** Formulario de contacto mínimo (≤4 campos, DUX-D30) en `P-05`, con asunto implícito al agente/propiedad.
- **DAG-09:** Datos demo con 5 agentes; `agt-01`…`agt-04` asignados a propiedades demo, `agt-05` (director) sin propiedades (demuestra estado vacío).
- **DAG-10:** Filtros opcionales en `P-04` por especialidad / idioma / zona de cobertura.
- **DAG-11:** `anios_experiencia` a nivel superior (stat primario) + `estadisticas` como jsonb (operaciones, vendidas, clientes, satisfacción).

## Próximo paso
Sigue el **Agente 06 — Conversión / Marketing** (FASE 2) para profundizar CTAs, formularios, mensajes y SEO/contenido de conversión, y para resolver el CTA "Vender mi propiedad" (sellers). Pendiente del usuario: confirmar **push** (D07) de los cambios de Agentes.

## Estado
COMPLETADO
