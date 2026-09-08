# Tarjeta de Propiedad (`C-01`) — mockup-inmobiliaria

> Define **qué campos muestra** la tarjeta, en **qué orden**, sus **variantes** (destacada, estándar, mini) y su **comportamiento responsive**. Aterriza **DUX-D27** (precio y operación siempre visibles).
> El contenido proviene del modelo de datos: [`modelo-datos.md`](./modelo-datos.md).

## 1. Propósito

Resumir una propiedad en un vistazo y llevar al usuario al **detalle (`P-03`)**. Es el componente con **más impacto en conversión** del listado: debe comunicar qué es, dónde está, cuánto cuesta y por qué vale la pena, sin requerir hover.

**Ubicaciones:** `P-01` (destacadas), `P-02` (grid de resultados), `P-03` (similares), `P-05` (propiedades del agente).

## 2. Campos que muestra y orden (variante estándar)

| # | Campo | Fuente (campo) | Presentación |
|---|-------|----------------|--------------|
| 1 | **Imagen** | `imagenes[0]` | 4:3, `object-fit: cover`, radio superior `16px`. Con **overlay degradado sutil** (azul oscuro 20–40%) en la zona de badges. |
| 2 | **Badges** (sobre la imagen, arriba-izquierda) | `operacion` + `estado` | Badge de operación (siempre) + badge de estado (si existe). Ver `C-08` / [`modelo-datos.md`](./modelo-datos.md) §3. |
| 3 | **Zona / ubicación** (eyebrow) | `zona`, `ciudad` | Texto pequeño, `--neutral-500`: "Palermo, CABA". |
| 4 | **Título** | `titulo` | Sora 600, `--text-h3`. 1 línea con ellipsis (máx. ~60 chars). |
| 5 | **Métricas** | `ambientes`, `dormitorios`, `banos`, `superficie_total_m2` | Fila de iconos (`C-20`, Lucide) + valor: "3 amb · 2 dorm · 2 baños · 85 m²". |
| 6 | **Precio** | `precio` + `moneda` + `operacion` | **Sora 600, `--brand-600`**, siempre visible (DUX-D27). |
| 7 | **Nota de operación** | `operacion` | "en venta" o "por mes" (junto al precio o como subtítulo). |
| 8 | **CTA secundario** | — | "Ver detalles" (link/botón terciario) → `P-03`. |

### Reglas de presentación

- **Precio y operación SIEMPRE visibles**, sin hover (DUX-D27). Nunca ocultar el precio detrás de un efecto.
- El **CTA "Ver detalles"** se muestra de forma clara; en hover la tarjeta se **eleva** (`translateY(-4px)` + sombra `--shadow-md`) y el CTA gana énfasis, pero el precio ya estaba visible.
- Si `disponible = false` (RESERVADO/VENDIDO), la tarjeta se muestra **atenuada** (imagen con opacidad / badge gris) y el CTA pasa a "Consultar" (disponibilidad de lista de espera) — o se excluye del listado según política.

## 3. Variantes

### 3.1 Estándar (grid de `P-02`, similares `P-03`)
- Imagen 4:3, contenido con padding `16–24px`.
- Es la **default**; se usa en grillas de resultados.

### 3.2 Destacada (Home `P-01`, y primer ítem de P-02)
- **Más grande:** imagen 16:9 (o 4:3 con mayor alto), mayor padding, **precio en `--text-h2`**.
- **Badges más prominentes:** el badge de estado (`EXCLUSIVO` / `NUEVO`) se destaca (dorado/ámbar).
- Puede ocupar **2 columnas** en el grid de Home o ser una **tarjeta "featured"** a ancho completo con contenido a la derecha.
- Su propósito es **captar la mirada** → se priorizan `destacado = true` y estados premium.

### 3.3 Mini (compacta)
- Para listados horizontales: **imagen pequeña (cuadrada o 16:9 chico)** + título + precio, en una fila.
- Campos visibles: imagen, título (1 línea), zona, precio. **Sin** métricas completas (solo m² opcional) ni CTA.
- Usos: panel lateral "Sugerencias", lista de propiedades del agente (`P-05`) compacta, relacionados.
- Menos espacio; prioriza **título + precio** (lo mínimo que necesita el usuario para decidir).

## 4. Comportamiento responsive

| Breakpoint | Columnas | Comportamiento de la tarjeta |
|---|---|---|
| **Mobile** (320–639px) | 1 | Tarjeta a ancho completo. Contenido apilado vertical; métricas en fila (con iconos). Tap target del CTA ≥ 44px. |
| **Tablet** (640–1023px) | 2 | Tarjeta estándar, 2 columnas. |
| **Desktop** (1024–1439px) | 3 | Tarjeta estándar, 3 columnas. |
| **Large** (1440px+) | 4 | Tarjeta estándar, 4 columnas (grid amplio). La **destacada** puede ocupar 2 columnas. |

- **Regla mobile-first (DUX-D22):** la tarjeta debe funcionar bien en 1 columna antes de optimizar desktop.
- **Imagen:** `object-fit: cover` en todos los tamaños; lazy-load con placeholder skeleton (`--neutral-100`) que respete el ratio (DUX-D28).

## 5. Estados

| Estado | Comportamiento |
|---|---|
| **default** | Como se ve en la grilla. |
| **hover** | Elevación `translateY(-4px)` + sombra `--shadow-md` (transición 200ms). |
| **focus** | Outline `2px` `--accent-400` con offset `2px` (accesibilidad/teclado). |
| **active** | Presión (`translateY(0)` + sombra menor). |
| **loading / skeleton** | Placeholder con forma de tarjeta (imagen + líneas) mientras llega la data. |
| **empty** | No aplica a la tarjeta individual; aplica al grid (ver `C-03`/estado vacío). |
| **error** | Si la imagen no carga, mostrar placeholder con icono; nunca romper el layout. |
| **disabled** | Para `disponible = false` (imagen atenuada + badge gris). |

## 6. Micro-copy sugerido

- **Zona/ubicación:** "Palermo, CABA" / "Vicente López, GBA Norte".
- **Precio venta:** "$ 320.000.000" · **Precio alquiler:** "$ 780.000 /mes".
- **Nota de operación:** "en venta" / "en alquiler".
- **CTA:** "Ver detalles".
- **Accesible (aria-label):** "Ver detalles de {titulo} en {zona}".

---

*Relacionado: [`modelo-datos.md`](./modelo-datos.md) §3 (badges) y §6 (imágenes); [`detalle.md`](./detalle.md) (a dónde lleva). Decisiones: `DPR-*`.*
