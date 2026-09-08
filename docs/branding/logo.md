# Logo conceptual — mockup-inmobiliaria

> Es una **descripción conceptual y de uso**, no el archivo gráfico. El Agente 03/09 (o un diseñador) puede materializarlo. Marca de trabajo: **MORADA** (placeholder reemplazable).

## 1. Concepto

El símbolo es un **monograma "M"** que se lee como **el techo de una casa** (dos picos que se encuentran). La idea: *"una casa, en su forma más esencial"*. La intersección de los picos se remata con un **punto dorado** que representa **la puerta / el lugar** — el "morada" al que se llega.

- **Forma:** dos trazos angulosos (techos) que se cruzan y forman la letra `M`.
- **Significado:** hogar, refugio, destino, un lugar que te espera.
- **Lenguaje:** geométrico, minimalista, premium. Sin ornamentos innecesarios.

## 2. Wordmark

- **Texto:** `MORADA`
- **Tipografía:** **Sora** (la misma de display), peso **600**, en **mayúsculas** con `letter-spacing` generoso (≈ `0.12em`) → transmite elegancia y espacio.
- **Opcional tagline** (bajo el wordmark): **"Encontrá tu morada."** en **Inter 400**, `--neutral-500`.
- **Caso:** en el header, el wordmark va a la izquierda (`C-05`); en el footer, acompañado de redes (`C-06`).

## 3. Variantes

| Variante | Fondo | Símbolo | Wordmark | Uso |
|---|---|---|---|---|
| **Principal (color)** | Claro (`--neutral-50`) | `--brand-600` + punto `--accent-400` | `--brand-900` | Header, footer, marketing. |
| **Monocromo azul** | Claro | `--brand-600` | `--brand-900` | Documentos, aplicaciones donde no hay dorado. |
| **Reverso (sobre oscuro)** | Oscuro (`--brand-800/900`) | blanco + punto `--accent-300` | blanco | Hero, footer oscuro, sobre imágenes. |
| **Sólo símbolo (mark)** | Cualquiera | `--brand-600` (o blanco) | — | Favicon, avatar, marca de agua. |

## 4. Reglas de uso

- **Área de resguardo (clearspace):** dejar un espacio libre alrededor del logo igual a la **altura de la "M"** en los 4 lados. No acercar texto ni elementos.
- **Tamaño mínimo:** **28px** de alto para el lockup completo; **20px** para el símbolo solo (favicon).
- **No hacer:**
  - No estirar / deformar ni cambiar proporciones.
  - No rotar ni inclinar.
  - No recolorar fuera de la paleta definida.
  - No aplicar sombras, gradientes ni contornos.
  - No reordenar símbolo y wordmark ni intercalar elementos.
- **Fondo:** usar siempre la variante correcta (color sobre claro, reverso sobre oscuro). No usar el logo en color sobre una imagen sin overlay suficiente.

## 5. Logo en el sitio (aplicación por componente)

| Componente | Uso del logo |
|---|---|
| `C-05` Header | Logo (izquierda). En scrolled (compacto) mantiene tamaño legible. |
| `C-06` Footer | Logo + tagline + redes (columna 1). |
| `C-18` Modal | Símbolo pequeño en el encabezado de modales de marca. |
| **Favicon** | Símbolo solo, `--brand-600` con punto dorado, fondo transparente. |

## 6. Isologo (opcional, para reforzar)

Si se quiere un **isologo** (símbolo + wordmark en una sola pieza): el monograma `M` se ubica a la izquierda y `MORADA` a la derecha, alineados verticalmente. La separación entre símbolo y texto = **ancho de un trazo de la "M"**. Mantener la línea de base del wordmark alineada con la base del símbolo.

---

*El archivo gráfico (SVG/PNG) lo genera el Agente 09 (Director Visual) o el Frontend. Decisiones de logo: `DBR-*` en `historial-prompts/decisiones.md`.*
