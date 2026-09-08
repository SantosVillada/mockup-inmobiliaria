# Sistema tipográfico — mockup-inmobiliaria

> Aterriza la regla de `docs/ux-ui/layout.md`: **no más de 1 fuente de display + 1 de cuerpo**.

## 1. Elección del sistema

| Rol | Fuente | Google Fonts | Justificación |
|---|---|---|---|
| **Display** (títulos, hero, H1–H3) | **Sora** | Sí | Geométrica, moderna, con carácter (terminales distintivos). Comunica **modernidad y tecnología** manteniendo **exclusividad** en títulos grandes. Legible a tamaños display. |
| **Cuerpo** (párrafos, UI, formularios) | **Inter** | Sí | Sans neutra, de máxima **legibilidad** y rendimiento. Perfecta para interfaces, tablas y microcopy. Escala en toda la web. |

**Por qué esta pareja:** Sora da el toque **premium-moderno** en titulares; Inter da **legibilidad y confianza** en el cuerpo. Juntas logran que la marca se sienta **actual y seria** sin caer en lo "clásico de lujo" ni en lo "genérico de startup".

### Alternativas (si el cliente quiere otro aire)
- **Más clásico/lujo:** Display → **Fraunces** o **Playfair Display** (serif elegante). Cuerpo → mantener **Inter**.
- **Más minimal/tecnológico:** Display y cuerpo → **Manrope** (single-family, muy limpio).
- **Más redondeado/amigable:** Cuerpo → **DM Sans** o **Plus Jakarta Sans**.

> Recomendación firme: **Sora + Inter**. Las alternativas solo se activan si el Director lo pide.

## 2. Jerarquía y tamaños

Escala **fluid** con `clamp()` para adaptarse al viewport (mobile → desktop). Base de tipografía: **16px** en el `html`.

| Nivel | Token | Tamaño (clamp) | Peso | Line-height | Letter-spacing | Uso |
|---|---|---|---|---|---|---|
| Display / H1 (hero) | `--text-display` | `clamp(2.5rem, 6vw, 4.5rem)` | 600/700 | 1.05 | `-0.02em` | Título de hero (P-01), grandes. |
| H1 (interior) | `--text-h1` | `clamp(2rem, 4vw, 3rem)` | 600 | 1.1 | `-0.01em` | Título de página (P-02…P-07). |
| H2 | `--text-h2` | `clamp(1.5rem, 3vw, 2.25rem)` | 600 | 1.15 | `-0.01em` | Título de sección. |
| H3 | `--text-h3` | `clamp(1.25rem, 2vw, 1.75rem)` | 600 | 1.2 | `0` | Subtítulo de tarjeta / bloque. |
| Body / párrafo | `--text-body` | `clamp(1rem, 1.2vw, 1.125rem)` | 400/500 | 1.6 | `0` | Cuerpo de texto. |
| Small / metadata | `--text-small` | `0.875rem` | 500 | 1.5 | `0` | Labels, metadata de tarjeta. |
| Eyebrow | `--text-eyebrow` | `0.8125rem` | 600 | 1.4 | `+0.08em` | **UPPERCASE**, acento dorado. |

## 3. Pesos por rol

| Peso | Uso |
|---|---|
| **300** (opcional) | Muy raro; solo en numeración de stats grandes. |
| **400** | Cuerpo, subtítulos. |
| **500** | UI, labels, botones secundarios. |
| **600** | **Títulos y botones primarios.** Peso principal de la marca. |
| **700** | Sólo H1/Display hero (énfasis máximo). |

> **Regla:** no usar más de **3 pesos distintos por página** (recomendado: 400, 500, 600). El 700 sólo en el hero.

## 4. Reglas de uso

1. **Nunca mezclar más de 2 familias** (Sora + Inter). Si un elemento es texto, no es display.
2. **Títulos:** Sora, peso 600. El **subtítulo** bajo un título de sección va en **Inter 400** (equilibra el peso visual — regla UX/UI).
3. **Eyebrow:** Inter o Sora **600, UPPERCASE**, con `letter-spacing: 0.08em` y color `--accent-600` (sobre claro) o `--accent-300` (sobre oscuro).
4. **Contraste tipográfico:** no usar 3 tamaños con el mismo peso en la misma página (saturaría). Distinguir por tamaño y color, no por muchos pesos.
5. **Cuerpo:** color `--neutral-600` (secundario) o `--neutral-800` (importante). Nada de texto demasiado gris para contenido clave.
6. **Números/stats (C-19):** Sora 600, tamaño display, color `--brand-600` con label `--neutral-500`.
7. **Accesibilidad:** línea de texto no más de ~70 caracteres en párrafos largos; `line-height` ≥ 1.5 en cuerpo.

## 5. Carga de fuentes

- Usar **Google Fonts** con `display=swap` y precarga de las 2 familias.
- Peso mínimo necesario: Sora (400, 600), Inter (400, 500, 600). Cargar como **variable fonts** si el stack lo permite.
- `font-display: swap` para evitar bloqueo de render.

---

*Tokens consolidados: ver `tokens.md`. Decisiones tipográficas: `DBR-*` en `historial-prompts/decisiones.md`.*
