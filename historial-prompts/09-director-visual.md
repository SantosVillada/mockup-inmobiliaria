# AGENTE 09 — DIRECTOR VISUAL

Registro del Director Visual.

> **Regla de finalización (obligatoria):** Antes de cerrar, preguntá al usuario:
> 1. ¿Push de los últimos cambios a GitHub? (Sí / No)
> 2. ¿A la rama `main` o a una nueva rama? (indicar nombre si es nueva)

## Prompt / Instrucción
Actuás como el **AGENTE 09 — DIRECTOR VISUAL**. Revisar el resultado global del mockup, detectar inconsistencias visuales, proponer mejoras y mantener la coherencia visual de la marca. Corregir detalles visuales directamente en el código de `web/`. NO hacer `git add/commit/push` (protocolo D07). No tocar `docs/` ni `historial-prompts/` salvo `09-director-visual.md` y `decisiones.md`.

## Fecha
2026-09-08

## Objetivo
Revisión global de la FASE 5 (mockup completo) contra las fuentes de verdad de marca (`docs/branding/` y `docs/ux-ui/`): coherencia de tokens (colores/tipografía/radios/sombras), jerarquía visual (un CTA primario por vista, títulos Sora / cuerpo Inter), estilo de componentes (tarjetas, botones pill, iconos line, badges, formularios, galería, WhatsApp), logo en header/footer, consistencia entre páginas, detalles premium y responsive.

## Resultado
Revisión global completada. Se detectaron y corrigieron **inconsistencias visuales concretas**:

**Detectadas:**
1. **Botones sin radio pill:** `Button.tsx` no definía `rounded-full`; los CTAs caían al radio por defecto del navegador (bordes duros), contra `estilo.md` §4 (pill 999px).
2. **Hex sueltos de WhatsApp:** `#25D366` / `#1da851` repetidos en 10+ componentes/páginas (violaba "tokens, nunca hex sueltos").
3. **Hex suelto `#FFFFFF`** en el stroke del logo.
4. **Radio fuera de escala:** `rounded-3xl` (24px) en 3 paneles grandes de CTA/estadísticas; la escala de tokens máx. es 16px (lg) o pill.

**Verificado sin inconsistencias:** paleta 60/30/10 (dorado en eyebrows/badges/estrellas/CTAs sobre oscuro, sin saturar); sombras todas azules (`rgba(10,31,51,…)` vía `@theme`); tarjetas radio 16px y sombra azul con hover; jerarquía Sora (display) / Inter (cuerpo); un CTA primario por vista (DUX-D26); badges semánticos (DPR-04); estados focus outline `--accent-400`; responsive (drawer filtros, sticky CTA, galería carrusel/mosaico).

## Archivos modificados
- `web/components/ui/Button.tsx` — `rounded-full` en base + variante whatsapp con tokens.
- `web/app/globals.css` — tokens `--whatsapp` / `--whatsapp-strong` (`:root` + `@theme inline`).
- `web/components/ui/Logo.tsx` — stroke usa `currentColor` (elimina hex `#FFFFFF`).
- `web/components/conversion/ContactoBarra.tsx` — `bg-whatsapp` / `hover:bg-whatsapp-strong`.
- `web/components/layout/WhatsAppWidget.tsx` — idem.
- `web/components/agentes/PerfilAgente.tsx` — idem.
- `web/components/agentes/TarjetaAgente.tsx` — idem.
- `web/components/propiedades/DetalleContacto.tsx` — idem.
- `web/components/layout/Footer.tsx` — idem.
- `web/app/contacto/page.tsx` — idem.
- `web/app/vender/page.tsx` — idem + `rounded-3xl`→`rounded-2xl`.
- `web/app/agentes/[slug]/page.tsx` — idem (empty-state).
- `web/app/page.tsx` — `rounded-3xl`→`rounded-2xl` (CTA final).
- `web/app/nosotros/page.tsx` — `rounded-3xl`→`rounded-2xl` (banda stats).
- `historial-prompts/decisiones.md` — sección DVI.
- `historial-prompts/09-director-visual.md` — este registro.

## Decisiones tomadas
- **DVI-01** — Botones pill (`rounded-full` en base de `Button`).
- **DVI-02** — Color WhatsApp centralizado en tokens (`--whatsapp` / `--whatsapp-strong`).
- **DVI-03** — Logo stroke con `currentColor` (sin hex `#FFFFFF`).
- **DVI-04** — Radios fuera de escala normalizados: `rounded-3xl`→`rounded-2xl` (16px).

## Próximo paso
La **FASE 5 está completa** (mockup revisado visualmente por el Director). Sigue la **FASE 6 — revisión final del Director**: validación integral del producto (build, responsive, accesibilidad, contenido, coherencia entre páginas y entrega). El **Agente Director** debe hacer la revisión final global del proyecto antes de la entrega/commit.

## Estado
COMPLETADO
