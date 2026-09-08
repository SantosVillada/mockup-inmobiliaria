# Detalle de Propiedad (`P-03`) — mockup-inmobiliaria

> Estructura completa de la página de detalle: **galería (`C-11`)**, **ficha técnica**, **características/amenities**, **ubicación/mapa**, **agente asociado (`C-02`)**, **propiedades similares** y **CTA sticky** (DUX-D25/D33).
> Contenido basado en [`modelo-datos.md`](./modelo-datos.md).

## 1. Propósito

**Convencer** a quien ya está interesado y llevarlo a la acción: **contactar / WhatsApp / agendar visita**. Es la página de conversión por excelencia.

**Ruta:** `/propiedades/:slug` (slug canónico, ver [`modelo-datos.md`](./modelo-datos.md) §1).

## 2. Estructura (orden de bloques)

```
1. Breadcrumb (C-07): Inicio > Propiedades > {título}
2. GALERÍA (C-11) — principal
3. Título H1 + ubicación (zona, ciudad)
4. Precio destacado + badges (operación + estado) — SIEMPRE visibles (DUX-D27)
5. CTAs: WhatsApp (C-13) · "Contactar" (C-04) · "Agendar visita" (modal C-18)
6. Ficha técnica (tabla de datos)
7. Descripción
8. Características / amenities (grid de iconos C-20)
9. Ubicación / mapa (con coordenadas)
10. Tarjeta del agente (C-02) + sus datos
11. Propiedades similares (grid de C-01)
12. CTA sticky (barra inferior mobile / columna desktop)
```

### 2.1 Título y encabezado
- **H1:** `titulo`.
- **Subtítulo:** `zona, ciudad` (ej. "Palermo, CABA").
- **Badges:** badge de **operación** (VENTA/ALQUILER) + badge de **estado** (si existe). Ver [`modelo-datos.md`](./modelo-datos.md) §3.

### 2.2 Precio (zona de alta atención — DUX-D27)
- **Precio** grande (Sora 600, `--brand-600`).
- **Nota:** "en venta" o "por mes" (según `operacion`).
- **Moneda** formateada (ARS default). Si `alquiler`, mostrar "por mes".
- **Extras opcionales:** "expensas" (si aplica) como texto secundario.

### 2.3 CTAs (un CTA primario — DUX-D26)
- **Primario:** "Consultá por WhatsApp" (`C-13`, mensaje pre-cargado con `titulo`/`codigo`).
- **Secundario:** "Contactar" (abre formulario `C-04`) · "Agendar visita" (modal `C-18`).
- En **mobile**, estos CTAs viven en la **barra sticky inferior** (ver §10).

## 3. Galería (`C-11`)

> Componente `C-11` — Galería / Slider de imágenes. Se usa como bloque principal del detalle.

### 3.1 Comportamiento

- **Imagen principal** a la vista; se navega con **flechas** (izquierda/derecha), **miniaturas**, **contador "1/8"** y **puntos** de paginación.
- **Swipe** táctil en mobile (gesto natural); en desktop, clic en flechas/miniaturas.
- **Contador:** siempre visible ("1/8").
- **Miniaturas:** fila de thumbnails en desktop; en mobile se reemplazan por puntos (menos espacio).

### 3.2 Responsive (DUX-D24)

| Breakpoint | Visualización |
|---|---|
| **Mobile** | Carrusel a 1 imagen visible, swipe nativo, puntos como paginación. |
| **Tablet/Desktop** | Mosaico con miniaturas laterales (o grid), el carrusel principal ocupa mayor ancho. |

### 3.3 Lightbox / modal

- Al tocar la imagen principal → **lightbox/modal** (`C-18`) a pantalla completa.
- En el lightbox: imagen grande + navegación (flechas) + contador + **cerrar (X / tecla ESC)**.
- **Accesibilidad:** navegable con teclado (flechas, ESC), `aria` en controles.

### 3.4 Estados

- **default** · **hover** (flechas visibles) · **loading** (lazy-load con skeleton que respeta el ratio, `--neutral-100`) · **error** (imagen fallida → placeholder con icono).
- **Future:** 360° / video (fuera del mockup).

### 3.5 CTA extra

- **"Pedir más fotos"** → CTA a contacto (`C-04`) para generar lead.

## 4. Ficha técnica (tabla de datos)

Tabla limpia (2 columnas: dato / valor) con los campos:

| Dato | Campo |
|---|---|
| Operación | `operacion` |
| Tipo | `tipo` (label) |
| Ambientes | `ambientes` |
| Dormitorios | `dormitorios` |
| Baños | `banos` |
| Superficie total | `superficie_total_m2` m² |
| Superficie cubierta | `superficie_cubierta_m2` m² (si existe) |
| Antigüedad | `antiguedad_anios` (años, "0" → "obra nueva") |
| Disponibilidad | `disponible` / `estado` |
| Código | `codigo` |
| Zona / Ciudad | `zona`, `ciudad` |

> **Privacidad:** la `direccion` se muestra como **referencia de zona** (no el número exacto) hasta que el usuario contacta.

## 5. Descripción

- Texto largo (`descripcion`) en párrafos. Tonos rioplatense (ver `docs/branding/concepto.md` §5).
- Destacar beneficios de la propiedad y de la zona.

## 6. Características / amenities

- **Grid de iconos (`C-20`)** con label de cada amenity (ver [`modelo-datos.md`](./modelo-datos.md) §5).
- Solo se muestran las que la propiedad tiene (`caracteristicas`).
- Iconos **line** (Lucide), `--neutral-600`; `--brand-600` si destacados.

## 7. Ubicación / mapa

- **Mapa embebido** (iframe de Google Maps/OpenStreetMap) centrado en `latitud`/`longitud`.
- **Pin** sobre la propiedad + referencia de zona.
- Fallback: si no hay mapa, mostrar dirección/referencia + botón "Ver en mapa".
- En el mockup, un mapa estático o embebido con pin.

## 8. Agente asociado (`C-02`)

- **Tarjeta de agente** con: foto, nombre, cargo/especialidad, **botón "WhatsApp"** + **"Contactar"**.
- Enlaza a su perfil (`P-05`).
- **CTA de contacto** del agente con mensaje pre-cargado (incluye `titulo` de la propiedad).

## 9. Propiedades similares

- Grid de tarjetas `C-01` (mismo `tipo`/`zona`/rango de `precio`).
- Título: "Propiedades similares".
- En **mobile**: 1 columna; **desktop**: 3–4 columnas.
- Cada tarjeta lleva a su propio `P-03` (el feed de similares vuelve a `P-03`, ver `sitemap.md`).

## 10. CTA sticky (DUX-D25 / DUX-D33)

El CTA de contacto **nunca debe salir de vista**.

### Desktop (≥1024px)
- El CTA vive en la **columna derecha sticky** (junto a la tarjeta del agente y el formulario).
- La columna queda fija al hacer scroll; el contenido (galería, ficha) scrollea a la izquierda.

### Mobile (<1024px)
- **Barra fija inferior** con: precio + "Consultá por WhatsApp" (primario) + "Contactar" (secundario).
- El contenido tiene padding-bottom para que la barra no tape nada.
- Al hacer scroll, la barra permanece.

## 11. Estados

| Estado | Comportamiento |
|---|---|
| **default** | Página completa. |
| **loading** | Skeletons de galería, ficha y tarjeta de agente. |
| **empty / not-found** | Si el `slug` no existe → página "Propiedad no encontrada" + CTA "Volver a propiedades". |
| **error** | Mensaje de error con botón "Reintentar" (backend real). |
| **disabled** | Si `disponible = false` → mostrar badge RESERVADO/VENDIDO y CTA "Consultar disponibilidad" (lista de espera) en vez de "Contactar". |

## 12. Copy sugerido (rioplatense)

- **CTA WhatsApp:** "Consultá por WhatsApp".
- **CTA Contactar:** "Contactar".
- **CTA Agendar visita:** "Agendar visita".
- **Ficha técnica:** título "Datos de la propiedad".
- **Amenities:** título "Características".
- **Ubicación:** "Ubicación".
- **Agente:** "Tu asesor" / "¿Hablamos?".
- **Similares:** "Propiedades similares".
- **Success formulario:** "¡Recibimos tu consulta! Te contactamos a la brevedad." (DBR-06).

---

*Relacionado: [`tarjeta.md`](./tarjeta.md) (similares), [`modelo-datos.md`](./modelo-datos.md) (campos). Decisiones: `DUX-D24`, `DUX-D25`, `DUX-D26`, `DUX-D27`, `DUX-D32`, `DPR-*`.*
