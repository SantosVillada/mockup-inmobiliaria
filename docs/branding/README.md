# Branding — mockup-inmobiliaria

Sistema de identidad de marca del sitio. Generado por el **Agente 02 — Branding** para aterrizar las reglas conceptuales del `Agente 01 — UX/UI`.

> **Propósito:** que el Agente 03 (Frontend) pueda aplicar la marca sin re-preguntar decisiones. Es **diseño, no código**. Los valores exactos (hex, tamaños, radios, sombras) se documentan aquí y se consolidan en `tokens.md` como variables CSS conceptuales.

## Resumen de identidad (una línea)

Una inmobiliaria **premium y moderna** que combina **confianza de hierro** (azul petróleo) con un toque de **exclusividad** (dorado champagne), hablando en **español rioplatense** cercano y directo: *"Encontrá tu morada"*.

## Marca de trabajo

- **Nombre de trabajo:** `MORADA` *(placeholder reemplazable)*
- **Símbolo:** monograma `M` que se lee como techos de una casa.
- **Posicionamiento:** premium / exclusivo + moderno + tecnológico, sin perder calidez humana.

## Documentos

| Documento | Qué define |
|---|---|
| [`concepto.md`](./concepto.md) | Concepto, audiencia, posicionamiento y **tono de comunicación**. |
| [`colores.md`](./colores.md) | Paleta completa + **tokens de color**, uso y proporción 60/30/10. |
| [`tipografia.md`](./tipografia.md) | Sistema tipográfico, jerarquía, tamaños, pesos y familias. |
| [`logo.md`](./logo.md) | Logo conceptual, variantes y reglas de uso. |
| [`estilo.md`](./estilo.md) | Estilo visual: tarjetas, botones, iconos, fotografía y espacios. |
| [`tokens.md`](./tokens.md) | **Tokens de marca consolidados** (variables CSS) para el Agente 03. |

## Cómo aplicar (reglas rápidas para el Agente 03)

1. **Color primario** (azul `--brand-600`) en **CTAs** sobre fondos claros; **dorado** (`--accent-400`) en eyebrows/badges/detalles y en CTAs sobre fondos oscuros (hero).
2. **Neutros** como base (fondos, superficies, texto) → ~60% del peso visual.
3. **Tipografía:** `Sora` (display) + `Inter` (cuerpo). Nunca mezclar más de 2 familias.
4. **Un CTA primario por vista** (DUX-D26). El resto secundario/terciario.
5. **Radios/sombras** y tamaños: tomar de `estilo.md` y `tokens.md`. No inventar valores.
6. **Español rioplatense** en todo el copy (vos, -tá, tono cercano).

## Relación con UX/UI

- Páginas: `P-01`…`P-07` (ver `docs/ux-ui/sitemap.md`).
- Componentes: `C-01`…`C-20` (ver `docs/ux-ui/componentes.md`). La marca define **cómo se ven**, el UX/UI define **qué son y dónde van**.
- Decisiones de marca: `DBR-NN` → registradas en `historial-prompts/decisiones.md`.

## Pendiente del usuario / Director

- [ ] **Push a GitHub** — pendiente de confirmación del usuario (protocolo D07). El Agente 02 NO pusheó nada.
- [ ] **Siguiente fase:** Agente 03 — Frontend (aplica tokens, construye componentes con la marca).

---

*Continuidad: ver `historial-prompts/02-branding.md`. Para contexto general ver `historial-prompts/README.md` y `00-director.md`.*
