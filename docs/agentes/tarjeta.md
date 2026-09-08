# Tarjeta de Agente (`C-02`) — mockup-inmobiliaria

> Define **qué campos muestra** la tarjeta de agente, en **qué orden**, sus **variantes** (compacta, estándar, destacada, perfil) y su **comportamiento responsive**. Aterriza la intención de confianza por personas: el usuario "trata con alguien".
> El contenido proviene del modelo de datos: [`modelo-datos.md`](./modelo-datos.md).

## 1. Propósito

Presentar a un **asesor real** para generar **confianza** y permitir contactarlo directamente (WhatsApp) o ver su perfil (`P-05`). Es el componente que humaniza el sitio (ver `docs/branding/concepto.md` §2: "cada propiedad tiene un agente con nombre y cara").

**Ubicaciones:** `P-01` (destacados), `P-04` (grid de agentes), `P-03` (sidebar agente en detalle), `P-05` (perfil extendido), `P-07` (equipo).

## 2. Campos que muestra y orden (variante estándar)

| # | Campo | Fuente (campo) | Presentación |
|---|-------|----------------|--------------|
| 1 | **Foto** | `foto` | 3:4, `object-fit: cover`, radio superior `16px`. Con overlay sutil si hay texto encima. |
| 2 | **Nombre** | `nombre` + `apellido` | Sora 600, `--text-h3` (1 línea). "María González". |
| 3 | **Cargo** | `cargo` | Texto pequeño, `--neutral-600`: "Asesor inmobiliario". |
| 4 | **Especialidades** (chips) | `especialidades` | 1–2 chips (`C-08`), `--brand-50`/`--brand-600`. |
| 5 | **Idiomas** (chips) | `idiomas` | Chips pequeños, opcional (solo si hay más de 1 idioma). |
| 6 | **CTAs** | `whatsapp`, `slug` | **Primario:** "WhatsApp" (`C-13`) · **Secundario:** "Ver perfil" → `P-05`. |

### Reglas de presentación

- **Foto** siempre presente; es el elemento que genera confianza. Ratio 3:4.
- **Nombre + cargo** siempre visibles (no requiere hover).
- **Un CTA primario** (WhatsApp) por tarjeta (DUX-D26); el resto secundario/terciario.
- **Sin precio/operación** (eso es de `C-01`); acá no se mezclan con propiedades.
- En **hover** la tarjeta se eleva (`translateY(-4px)` + sombra `--shadow-md`) — patrón de `C-01`.
- Si `activo = false` → la tarjeta **no se muestra** en `P-04`/`P-01` ni se enlaza desde `P-03`.

## 3. Variantes

### 3.1 Estándar (grid de `P-04`, equipo `P-07`)
- Foto 3:4 arriba; contenido con padding `16–24px`.
- Muestra: foto, nombre, cargo, 1–2 especialidades, idiomas (si >1), CTA WhatsApp + "Ver perfil".
- Es la **default**; se usa en grillas de agentes.

### 3.2 Destacada (Home `P-01`)
- **Más grande**, mayor padding, foto más prominente.
- Añade **1 línea de bio** o una **estadística** (`C-19`, ej. "15 años de experiencia") para destacar al agente.
- Puede ocupar **2 columnas** en el grid de Home.
- Su propósito es **captar la mirada** hacia el equipo → se priorizan agentes con `orden` bajo y buena cartera.

### 3.3 Compacta (mini)
- Para listados horizontales / paneles laterales ("Sugerencias", "Conocé a tu asesor").
- Campos: **foto pequeña (cuadrada)** + nombre (1 línea) + cargo + **icono WhatsApp**. Sin chips ni stats.
- Menos espacio; prioriza **identidad + acción** (contactar directo).
- Uso típico: lista de agentes en `P-06`, carrusel, footer.

### 3.4 Perfil / modo lista (sidebar de `P-03` — detalle de propiedad)
- Variante usada en **`P-03`** (§8 de [`docs/propiedades/detalle.md`](../propiedades/detalle.md)).
- Muestra: foto, nombre, cargo, especialidades, **stats resumidos** (años, operaciones), y **CTAs**: "WhatsApp" (`C-13`, mensaje pre-cargado con la **propiedad**) + "Contactar" (`C-04`) + "Ver perfil" → `P-05`.
- Es más densa que la estándar porque vive en la **columna sticky** del detalle (DUX-D25). El CTA de WhatsApp incluye el contexto de la propiedad (ver [`contacto.md`](./contacto.md) §3).
- Enlaza a `P-05` para profundizar.

## 4. Comportamiento responsive

| Breakpoint | Columnas | Comportamiento de la tarjeta |
|---|---|---|
| **Mobile** (320–639px) | 1 | Tarjeta a ancho completo; foto 3:4. CTAs apilados (tap target ≥ 44px). |
| **Tablet** (640–1023px) | 2 | Tarjeta estándar, 2 columnas. |
| **Desktop** (1024–1439px) | 3 | Tarjeta estándar, 3 columnas. |
| **Large** (1440px+) | 4 | Tarjeta estándar, 4 columnas (o 2/4 si hay destacadas). |

- **Regla mobile-first (DUX-D22):** la tarjeta debe funcionar en 1 columna antes de optimizar desktop.
- **Foto:** `object-fit: cover` en todos los tamaños; lazy-load con skeleton placeholder (`--neutral-100`) que respete el ratio 3:4 (DUX-D28).
- **En `P-03`** la variante perfil se coloca en la **columna derecha sticky** (desktop) o dentro de la **barra inferior** (mobile).

## 5. Estados

| Estado | Comportamiento |
|---|---|
| **default** | Como se ve en la grilla. |
| **hover** | Elevación `translateY(-4px)` + sombra `--shadow-md` (transición 200ms). |
| **focus** | Outline `2px` `--accent-400` con offset `2px` (accesibilidad/teclado). |
| **active** | Presión (`translateY(0)` + sombra menor). |
| **loading / skeleton** | Placeholder con forma de tarjeta (foto + líneas) mientras llega la data. |
| **empty** | No aplica a la tarjeta individual; aplica al grid (ver `P-04` estado vacío en [`perfil.md`](./perfil.md) §6). |
| **error** | Si la foto no carga, mostrar avatar placeholder con icono (`user`); nunca romper el layout. |
| **disabled / inactivo** | Si `activo = false`, no se muestra (o se atenúa si es referencial). |

## 6. Micro-copy sugerido (rioplatense)

- **CTA primario:** "Consultá por WhatsApp" / "WhatsApp".
- **CTA secundario:** "Ver perfil" · "Conocer al asesor".
- **Stats (destacada):** "15 años de experiencia" · "+120 operaciones".
- **Idiomas extra:** "Español · Inglés".
- **Accesible (aria-label):** "Ver perfil de {nombre} {apellido}, {cargo}".

---

*Relacionado: [`modelo-datos.md`](./modelo-datos.md) (campos), [`perfil.md`](./perfil.md) (a dónde lleva, `P-05`), [`contacto.md`](./contacto.md) (WhatsApp pre-cargado). Decisiones: `DAG-*`.*
