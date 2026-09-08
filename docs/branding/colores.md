# Paleta de colores — mockup-inmobiliaria

> Aterriza la regla conceptual de `docs/ux-ui/layout.md`:
> - **Color primario** para CTAs (alta conversión).
> - **Color neutro** (fondo) para superficies.
> - **Énfasis sutil** (acento) para eyebrows, badges, detalles.
> - **Semánticos:** verde (disponible/suceso), ámbar (alerta/destacado), rojo (error).

## Filosofía de color

**Confianza (azul) + Exclusividad (dorado) sobre neutros.** El azul petróleo es el color de marca y de los CTAs primarios; el dorado champagne es el acento que subraya lo "especial"; los neutros fríos sostienen todo (fondos, superficies, texto) para que la marca respire y no sature.

## 1. Paleta primaria (marca) — Azul petróleo

Azul profundo, serio, moderno y tecnológico. Es el color de **confianza** y de los **CTAs primarios** en fondos claros.

| Token | Hex | Uso |
|---|---|---|
| `--brand-900` | `#0A1F31` | Fondos muy oscuros (footer oscuro, hero oscuro profundo). |
| `--brand-800` | `#0E2B45` | Superficies oscuras (nav desplegable, header scrolled). |
| `--brand-700` | `#12385A` | Hover de botones primarios / superficies de marca. |
| **`--brand-600`** | **`#174A75`** | **Color primario de marca. CTAs primarios, links activos, títulos sobre claro.** |
| `--brand-500` | `#23608F` | Hover/acentos de marca en claro. |
| `--brand-400` | `#3E7BAA` | Detalles, bordes de marca suaves. |
| `--brand-300` | `#7BA6C6` | Fondos de marca muy suaves (tints). |
| `--brand-100` | `#DCE8F2` | Fondo de sección con tint azul. |
| `--brand-50` | `#F0F5F9` | Fondo de cabecera / bandas sutiles. |

## 2. Paleta de acento — Dorado champagne

Acento de **exclusividad y calidez**. Se usa con **moderación** (~10%). Es el color de eyebrows, badges premium, detalles y CTAs sobre fondos oscuros (hero).

| Token | Hex | Uso |
|---|---|---|
| `--accent-600` | `#A8843B` | Dorado profundo, hover de acento. |
| **`--accent-400`** | **`#C7A55A`** | **Acento principal (champagne).** Eyebrows, badges, detalles, CTA sobre fondo oscuro. |
| `--accent-300` | `#D9BC7E` | Acento suave / tint dorado. |
| `--accent-100` | `#F4EAD5` | Fondo de badge/accento muy suave. |

> **Nota de accesibilidad:** el dorado `#C7A55A` es decorativo/detalle. Para **texto** sobre fondo claro, usar `--accent-600` (`#A8843B`) que tiene mejor contraste. Nunca usar dorado como texto grande sobre claro.

## 3. Neutros — fondo, superficie, texto

Base del sistema (~60% del peso visual). Fríos para acompañar al azul.

| Token | Hex | Uso |
|---|---|---|
| `--neutral-0` | `#FFFFFF` | Superficies blancas (tarjetas, paneles). |
| `--neutral-50` | `#F6F8FA` | **Fondo principal de página.** |
| `--neutral-100` | `#EDF0F3` | Fondos de sección alternos / inputs. |
| `--neutral-200` | `#DCE1E6` | Bordes / dividers. |
| `--neutral-300` | `#BFC7CF` | Bordes en hover / disabled. |
| `--neutral-400` | `#98A2AB` | Iconos / texto terciario. |
| `--neutral-500` | `#6B7680` | Texto secundario. |
| `--neutral-600` | `#4C5760` | Texto de cuerpo fuerte. |
| `--neutral-700` | `#39434B` | Títulos suaves. |
| `--neutral-800` | `#232B31` | Títulos / texto principal. |
| `--neutral-900` | `#141A1F` | Texto principal de alto contraste. |

## 4. Semánticos — éxito, alerta, error

Usados en badges (`C-08`), estados de formulario y feedback.

| Token | Hex | Uso |
|---|---|---|
| **`--success`** | `#1F9D6A` | Disponible / suceso / éxito. |
| `--success-strong` | `#157A53` | Texto de éxito sobre claro. |
| `--success-soft` | `#E6F6EE` | Fondo de badge/estado éxito. |
| **`--warning`** | `#C9820B` | Alerta / destacado / "OPORTUNIDAD". |
| `--warning-soft` | `#FBF3E0` | Fondo de badge alerta. |
| **`--error`** | `#D64545` | Error / no disponible. |
| `--error-strong` | `#B93A3A` | Texto de error. |
| `--error-soft` | `#FBEAEA` | Fondo de estado error. |

> **Semántico en badges:** verde = disponible/suceso; ámbar = alerta/destacado ("OPORTUNIDAD", "NUEVO"); rojo = no disponible/agotado. El neutro azul queda para "VENTA"/"ALQUILER" (badge estándar).

## 5. Proporción de uso — 60 / 30 / 10

| % | Rol | Colores | Dónde |
|---|---|---|---|
| **60%** | Neutros | fondos, superficies, texto, bordes | Casi toda la página: fondo `--neutral-50`, tarjetas `--neutral-0`, texto `--neutral-900/600`. |
| **30%** | Marca (azul) | `--brand-600/800/900` | Header, nav activa, botones primarios, footer oscuro, superficies de marca, títulos. |
| **10%** | Acento (dorado) | `--accent-400/600` | Eyebrows, badges, detalles premium, CTA sobre fondos oscuros, logo. |

**Regla práctica:** si dudás entre dos colores para un elemento, elegí el neutro. El dorado es un condimento, no el plato.

## 6. Aplicación según superficie

| Superficie | Botón primario | Botón secundario | Énfasis |
|---|---|---|---|
| **Clara** (fondo `--neutral-50`) | `--brand-600` (texto blanco) | outline `--brand-600` | eyebrow `--accent-600` |
| **Oscura** (hero/footer `--brand-800/900`) | `--accent-400` (texto `--brand-900` o blanco) | outline blanco | eyebrow `--accent-300` |

## 7. Reglas de contraste y accesibilidad

- **Texto sobre claro:** usar `--neutral-800/900` (no `--neutral-400` para texto importante). `--neutral-400` solo para texto terciario/placeholder.
- **Botones primarios:** texto **blanco** sobre `--brand-600` (contraste alto, AA). No usar dorado como fondo de botón con texto claro en fondos claros.
- **No usar azul sobre azul:** para CTAs en hero oscuro, usar dorado o blanco.
- **No combinar dorado y verde/rojo** en el mismo elemento; son roles distintos.

---

*Tokens consolidados: ver `tokens.md`. Decisiones de color: `DBR-*` en `historial-prompts/decisiones.md`.*
