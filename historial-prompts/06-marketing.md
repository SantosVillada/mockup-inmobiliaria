# AGENTE 06 — CONVERSIÓN / MARKETING

Registro del Agente de Conversión / Marketing.

> **Regla de finalización (obligatoria):** Antes de cerrar, preguntá al usuario:
> 1. ¿Push de los últimos cambios a GitHub? (Sí / No)
> 2. ¿A la rama `main` o a una nueva rama? (indicar nombre si es nueva)

---

## Registro 001 — Estrategia de conversión / marketing

## Prompt / Instrucción
Definir y documentar la **estrategia de conversión / marketing** del sitio: estructura comercial / embudo, inventario de CTAs (aterrizar `DUX-D26`), WhatsApp como canal principal (`C-13`, mensajes pre-cargados), formularios (contacto `C-04`, vender, newsletter, reserva de visita), modelo de datos de `leads` + estados, mecanismos de captación, técnicas de conversión, landing "Vender mi propiedad", copy/microcopy y decisiones `DMK-NN`. Entregar como documentos de diseño en `docs/marketing/`. **No** escribir código frontend. **No** hacer `git add/commit/push` (protocolo D07).

## Fecha
2026-09-08

## Objetivo
Dejar definida y documentada la estrategia comercial del sitio, reutilizable por el **Agente 03 (Frontend)** y el **Agente 07 (Backend)**. Completar la **FASE 2** del roadmap.

## Resultado
Se creó la carpeta `docs/marketing/` con **8 documentos** de diseño:

- `README.md` — índice, resumen ejecutivo y reglas de uso para los agentes siguientes.
- `embudo.md` — 4 etapas (Descubrir → Considerar → Decidir → Convertir) + **objetivo de conversión (KPI) por página**.
- `ctas.md` — **inventario completo de CTAs** por página (texto, variante, ubicación, destino); aterriza `DUX-D26`.
- `whatsapp.md` — estrategia WhatsApp (`C-13`): dónde va, **número institucional placeholder** `5491155550000`, **mensajes pre-cargados por contexto**, **flotante mobile**.
- `formularios.md` — **contacto** (`C-04`, ≤4 campos), **vender mi propiedad** (sellers), **newsletter** (1 campo), **reserva de visita** (modal `C-18`); campos, estados y mensajes de éxito.
- `leads.md` — **modelo de datos de `leads`** (tabla + SQL de ejemplo) y **estados del lead** (`nuevo, contactado, calificado, visitó, cerrado, perdido`).
- `conversion.md` — técnicas de conversión (confianza, urgencia/escasez, prueba social) y **copy de CTAs** (rioplatense).
- `vender-propiedad.md` — **landing "Vender mi propiedad"** (flujo sellers): justificación, estructura y CTAs.

## Archivos modificados
- `docs/marketing/README.md` (creado)
- `docs/marketing/embudo.md` (creado)
- `docs/marketing/ctas.md` (creado)
- `docs/marketing/whatsapp.md` (creado)
- `docs/marketing/formularios.md` (creado)
- `docs/marketing/leads.md` (creado)
- `docs/marketing/conversion.md` (creado)
- `docs/marketing/vender-propiedad.md` (creado)
- `historial-prompts/06-marketing.md` (actualizado, este registro)
- `historial-prompts/decisiones.md` (se agregaron `DMK-01`…`DMK-13`)

## Decisiones tomadas
- **DMK-01:** Embudo en 4 etapas con un objetivo de conversión (KPI) por página.
- **DMK-02:** Un CTA primario por vista (`DUX-D26`); inventario completo de CTAs.
- **DMK-03:** WhatsApp como canal principal; número institucional placeholder `5491155550000`.
- **DMK-04:** Mensajes pre-cargados por contexto (general / propiedad / agente / sellers).
- **DMK-05:** Formulario de contacto ≤4 campos con estados y éxito rioplatense.
- **DMK-06:** Formulario "Vender mi propiedad" para sellers (primario WhatsApp, secundario form).
- **DMK-07:** Newsletter de 1 campo + reglas anti-spam/privacidad.
- **DMK-08:** Reserva de visita como modal `C-18` (fecha/hora + datos mínimos).
- **DMK-09:** Modelo de datos `leads` orientado a Supabase + estados del lead.
- **DMK-10:** Mecanismos de captación priorizados (WhatsApp > formulario > visita > newsletter > pedir más info).
- **DMK-11:** Técnicas de conversión (confianza, urgencia/escasez, prueba social, copy).
- **DMK-12:** Landing "Vender mi propiedad" dedicada (Opción A) con refuerzo en Home (Opción B).
- **DMK-13:** Número institucional de WhatsApp como placeholder configurable en backend (Agente 07).

## Próximo paso
**FASE 2 COMPLETADA.** El **Director** decide pasar a **FASE 3**: el **Agente 03 (Frontend)** implementa los componentes/flujos (leyendo `docs/marketing/ctas.md`, `whatsapp.md`, `formularios.md`, `conversion.md`), y el **Agente 07 (Backend)** crea la tabla `leads` + endpoints (leyendo `docs/marketing/leads.md` y `formularios.md`).

## Estado
COMPLETADO
