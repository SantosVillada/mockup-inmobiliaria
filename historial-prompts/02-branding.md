# AGENTE 02 — BRANDING

Registro del Agente de Branding.

> **Regla de finalización (obligatoria):** Antes de cerrar, preguntá al usuario:
> 1. ¿Push de los últimos cambios a GitHub? (Sí / No)
> 2. ¿A la rama `main` o a una nueva rama? (indicar nombre si es nueva)

## Prompt / Instrucción
Actuar como **Agente 02 — Branding** del proyecto `mockup-inmobiliaria`. Definir y documentar la **identidad de marca** completa (concepto, paleta de colores con hex, tipografía, logo conceptual, estilo visual, tono de comunicación, tokens). Aterrizar la regla conceptual de `docs/ux-ui/layout.md` (color primario para CTAs, neutro para fondo, énfasis sutil para eyebrows/badges, semánticos verde/ámbar/rojo). Entregar documentos en `docs/branding/`. NO hacer push (protocolo D07). El Agente 01 (UX/UI) ya definió sitemap, layout, componentes y decisiones UX.

## Fecha
2026-09-08

## Objetivo
Definir un **sistema de marca coherente y reutilizable** que el Agente 03 (Frontend) pueda aplicar sin re-preguntar: paleta exacta, tipografías, logo, estilo visual y tono, aterrizando los principios conceptuales del UX/UI.

## Resultado
- Se creó la carpeta `docs/branding/` con **6 documentos** de diseño (ver Archivos modificados).
- **Concepto:** marca de trabajo **MORADA** (placeholder). Posicionamiento **premium/exclusivo + moderno/tecnológico** con cercanía rioplatense. Tagline: "Encontrá tu morada."
- **Paleta:** azul petróleo (marca/CTAs) + dorado champagne (acento/exclusividad) sobre neutros fríos + semánticos. Proporción **60/30/10**.
- **Tipografía:** **Sora** (display) + **Inter** (cuerpo). Escala fluid y jerarquía H1–H3/cuerpo/small/eyebrow.
- **Logo:** monograma "M" como techo de casa + punto dorado; wordmark MORADA en Sora 600; variantes (color/monocromo/reverso/símbolo) + reglas de uso.
- **Estilo:** tarjetas (radio 16px, sombras azules suaves), botones pill, iconos line (Lucide), fotografía premium, espaciado base 4px.
- **Tokens:** `tokens.md` consolida variables CSS conceptuales (colores, tipografía, radios, sombras, espaciados, breakpoints) para el Agente 03.
- Se registraron decisiones de marca `DBR-01`…`DBR-09` en `decisiones.md`.
- **NO se hizo push** (protocolo D07). Pendiente confirmación del usuario.

## Archivos modificados
- `docs/branding/README.md` (creado — índice + resumen de identidad)
- `docs/branding/concepto.md` (creado — concepto, audiencia, posicionamiento, tono)
- `docs/branding/colores.md` (creado — paleta + tokens + uso + proporción)
- `docs/branding/tipografia.md` (creado — sistema tipográfico + jerarquía + tamaños)
- `docs/branding/logo.md` (creado — logo conceptual + variantes + reglas de uso)
- `docs/branding/estilo.md` (creado — estilo visual de componentes/imaginería)
- `docs/branding/tokens.md` (creado — tokens de marca consolidados para Agente 03)
- `historial-prompts/02-branding.md` (editado — este registro)
- `historial-prompts/decisiones.md` (editado — sección DBR-01…09)

## Decisiones tomadas
- **DBR-01:** Marca de trabajo **MORADA** (placeholder reemplazable), tagline "Encontrá tu morada."
- **DBR-02:** Paleta **azul petróleo** (marca/confianza/CTAs) + **dorado champagne** (acento/exclusividad) sobre neutros fríos. Proporción **60/30/10**.
- **DBR-03:** Tipografía **Sora** (display) + **Inter** (cuerpo); alternativas documentadas (Fraunces/Playfair, Manrope, DM Sans).
- **DBR-04:** Logo = monograma "M" (techo de casa) + punto dorado; wordmark Sora 600; variantes definidas.
- **DBR-05:** Estilo visual: tarjetas radio 16px con sombras azules suaves; botones **pill**; iconos **line** (Lucide); fotografía premium real; espaciado base 4px.
- **DBR-06:** Tono de comunicación en **español rioplatense** (vos, -tá), cercano y directo, con CTAs verbo-primero.
- **DBR-07:** Tokens de marca consolidados en `tokens.md` como variable fuente única para el Frontend.
- **DBR-08:** Sombra de marca siempre en **azul oscuro** `rgba(10,31,51,…)`, no negra genérica.
- **DBR-09:** El dorado es decorativo/detalle; para texto sobre claro usar `--accent-600`. Nunca azul sobre azul (CTAs en hero oscuro usan dorado/blanco).

## Próximo paso
Sigue el **Agente 03 — Frontend** (FASE 3) para implementar la interfaz con estos tokens y construir los componentes `C-01`…`C-20` y las páginas `P-01`…`P-07`. **El Director decide cuándo** avanzar a esa fase y puede revisar esta entrega antes. Pendiente del usuario: confirmar **push** (D07) de los cambios de Branding.

## Estado
COMPLETADO
