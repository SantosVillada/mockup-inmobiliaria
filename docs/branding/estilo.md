# Estilo visual de marca — mockup-inmobiliaria

> Define **cómo se ven** los componentes del UX/UI (`C-01`…`C-20`). Moderno y premium. Los valores concretos (radios, sombras, espaciados) se consolidan en `tokens.md`.

## 1. Principios de estilo

1. **Aire (whitespace) como lujo.** Espaciado generoso entre secciones y dentro de tarjetas. La exclusividad se siente en el vacío.
2. **Jerarquía por contraste, no por recargo.** Pocos pesos, pocos colores, mucho orden.
3. **Suavidad controlada.** Radios moderados, sombras suaves y difusas, sin bordes duros.
4. **Detalles premium.** Un acento dorado aquí y allá; no en todos lados.
5. **Movimiento sutil.** Transiciones cortas (150–250ms) con easing suave, sin animaciones llamativas.

## 2. Imágenes / fotografía

- **Calidad alta, real, arquitectónica.** Nada de ilustraciones ni mockups genéricos.
- **Luz natural y cálida** (hora dorada en exteriores; interiores luminosos con luz de día).
- **Color grade consistente:** neutros fríos con un toque cálido que armonice con azul + dorado. Evitar saturaciones fuertes.
- **Aspect ratio:** hero 16:9; tarjetas `C-01` 4:3; retratos de agentes `C-02` 3:4.
- **Tratamiento:** `object-fit: cover`, con un **overlay degradado sutil** (azul oscuro al 20–40%) en zonas donde hay texto encima (hero, badges), para garantizar legibilidad.
- **Sin filtros pesados** (no desaturar de más, no aplicar duotono). Mantener la foto "real".
- **Placeholder de carga:** skeleton que respete el ratio (`--neutral-100`).

## 3. Tarjetas (`C-01`, `C-02`, etc.)

| Propiedad | Valor |
|---|---|
| **Radio** | `16px` |
| **Fondo** | `--neutral-0` (blanco) |
| **Borde** | `1px solid --neutral-200` |
| **Sombra (default)** | `0 4px 20px rgba(10,31,51,0.06)` |
| **Sombra (hover)** | `0 12px 36px rgba(10,31,51,0.14)` |
| **Elevación hover** | `transform: translateY(-4px)` |
| **Transición** | `200ms ease` |

- Imagen ocupa la parte superior con radio superior `16px`; el contenido con padding `16–24px`.
- **Badge** (`C-08`) superpuesto en la imagen, arriba-izquierda.
- **Precio** en `--text-h3`, Sora 600, `--brand-600` (siempre visible, DUX-D27).

## 4. Botones (`C-17`, `C-13`)

| Variante | Fondo | Texto | Borde | Radio |
|---|---|---|---|---|
| **Primario** | `--brand-600` | blanco | ninguno | **pill (999px)** |
| **Primario (fondo oscuro)** | `--accent-400` | `--brand-900` | ninguno | pill |
| **Secundario** | transparente | `--brand-600` | `1.5px solid --brand-600` | pill |
| **Terciario** | transparente | `--brand-600` | ninguno (link) | — |

- **Radio:** botones **pill** (muy premium/moderno). Se acepta `10px` si el componente lo exige (p.ej. mini-CTA en tarjeta), pero preferir pill.
- **Padding:** `12px 24px` (normal), `14px 32px` (grande/hero).
- **Hover primario:** fondo `--brand-700` + elevación `translateY(-2px)` y sombra.
- **Hover secundario:** fondo `--brand-50`.
- **Focus:** outline de `2px` `--accent-400` con offset `2px` (accesibilidad).
- **Active:** `translateY(0)` + sombra menor (feedback de presión).
- **Disabled:** fondo `--neutral-200`, texto `--neutral-500`, cursor bloqueado.
- **WhatsApp (`C-13`):** botón primario con icono, o variante de color WhatsApp (`#25D366`) solo si se marca como distintivo; por defecto usar primario.

## 5. Iconos (`C-20`)

- **Estilo:** trazo (line icons), `stroke-width: 1.5–2px`, extremos y uniones redondeados.
- **Familia:** **una sola librería** para todo el sitio (recomendado **Lucide**). No mezclar sets.
- **Tamaños:** `16px` (inline), `20px` (UI/tarjetas), `24px` (beneficios), `32px` (bloques destacados).
- **Color:** `--neutral-600` por defecto; `--brand-600` para iconos activos/de marca; `--accent-400` solo para detalles premium puntuales.
- **Nunca** usar iconos de relleno (filled) mezclados con line.

## 6. Espacios y ritmo

| Token | Valor |
|---|---|
| Base de espaciado | `4px` |
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `24px` |
| `--space-6` | `32px` |
| `--space-7` | `48px` |
| `--space-8` | `64px` |
| `--space-9` | `96px` |

- **Sección:** `--space-8` (mobile) / `--space-9` (desktop) de separación vertical.
- **Gutter entre tarjetas:** `16px` (mobile) / `24px` (tablet+).
- **Container:** `1240px` máximo, padding lateral `16px` (mobile) / `24px` (desktop).
- **Consistencia:** misma altura de títulos de sección y espaciado repetido → ritmo y coherencia (regla UX/UI).

## 7. Superficies y niveles (elevación)

| Nivel | Descripción | Sombra |
|---|---|---|
| `--shadow-xs` | Default / bordes suaves | `0 1px 2px rgba(10,31,51,0.05)` |
| `--shadow-sm` | Tarjetas | `0 4px 20px rgba(10,31,51,0.06)` |
| `--shadow-md` | Hover tarjeta / drawer | `0 12px 36px rgba(10,31,51,0.14)` |
| `--shadow-lg` | Modal / popover | `0 24px 60px rgba(10,31,51,0.20)` |

> **Sombra única en la marca:** siempre **azul oscuro** (`rgba(10,31,51,…)`), nunca negra genérica. Refuerza la identidad de color.

## 8. Estados y microinteracciones

- **Transiciones:** `150–250ms`, easing `cubic-bezier(0.2, 0, 0, 1)`.
- **Hover en cards:** elevar + sombra media (no cambiar color de fondo bruscamente).
- **Hover en links:** color `--brand-600` y, si es menú, subrayado sutil.
- **Estados de formulario (`C-04`):** focus outline `--accent-400`; error `--error` + mensaje `--error-strong`; éxito `--success` + mensaje `--success-strong`.
- **Nunca** mostrar una pantalla en blanco: loading (skeleton), empty (mensaje + acción), error (mensaje + reintento) — regla DUX-D28.

---

*Tokens consolidados: ver `tokens.md`. Decisiones de estilo: `DBR-*` en `historial-prompts/decisiones.md`.*
