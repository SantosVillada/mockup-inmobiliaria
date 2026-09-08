# Barra de búsqueda y filtros (`C-03`) — mockup-inmobiliaria

> Define los **filtros exactos** de `P-02`, **cómo se aplican**, los **chips de filtros activos** y el **comportamiento de URL params** (DUX-D31). Contenido basado en [`modelo-datos.md`](./modelo-datos.md).

## 1. Propósito

Permitir al usuario **encontrar la propiedad correcta** filtrando el catálogo. Es el componente con más impacto en `P-02`. Debe dar **feedback en tiempo real** (contador de resultados) y mantener el estado al navegar.

## 2. Filtros exactos

| # | Filtro | Fuente (campo) | Control UI | Valores |
|---|--------|----------------|------------|---------|
| 1 | **Texto** | `q` → `titulo`, `zona`, `ciudad`, `descripcion` | Input de búsqueda | Libre (mín. 2 chars). |
| 2 | **Operación** | `operacion` | Radio / pills | `venta` \| `alquiler`. |
| 3 | **Tipo** | `tipo` | Checkbox / pills (multi) | `casa`, `departamento`, `ph`, `local`, `terreno`. Agrupables por categoría. |
| 4 | **Zona** | `zona` | Select / pills (multi) | Palermo, Recoleta, Belgrano, Núñez, Puerto Madero, Caballito, San Telmo, Barrio Norte, Vicente López, La Plata. |
| 5 | **Ciudad** | `ciudad` | Select (opcional) | Buenos Aires, Vicente López, La Plata. |
| 6 | **Precio min** | `precio_min` | Input numérico / slider | Rango. |
| 7 | **Precio max** | `precio_max` | Input numérico / slider | Rango. |
| 8 | **Ambientes** | `ambientes_min` | Stepper / select | `1`–`6+`. |
| 9 | **Dormitorios** | `dormitorios_min` | Stepper / select | `1`–`5+`. |
| 10 | **m² (superficie)** | `m2_min`, `m2_max` | Inputs numéricos / slider | Rango. |
| 11 | **Ordenamiento** | `orden` | Select | `recientes` (default) \| `precio_asc` \| `precio_desc`. |

### Reglas de aplicación

1. **Operación** es el filtro más usado; suele fijarse primero. Si se elige `venta`, el precio se interpreta como **valor total**; si `alquiler`, como **precio mensual**.
2. **Tipo** admite múltiples selecciones (chips). La **categoría** (vivienda/comercial/terreno) es un atajo que agrupa varios tipos.
3. **Rangos** (precio, m²) usan min/max. Si solo hay min, se interpreta "desde"; si solo max, "hasta".
4. **"Aplicar"** refresca la lista; **"Limpiar"** restablece todos los filtros y la búsqueda.
5. Al cambiar un filtro, se **actualiza en vivo** el contador ("Mostrando X de Y propiedades").

## 3. Chips de filtros activos

- Arriba del grid de resultados se muestran **chips removibles** (`C-08`) por cada filtro activo.
- Cada chip muestra el **label humano** (ej. "Tipo: Casa", "Precio: hasta $100.000.000", "Zona: Palermo", "3+ dormitorios").
- Al tocar la **"×"** del chip, se quita ese filtro y se actualiza la lista.
- Botón **"Limpiar todos"** cuando hay más de 2 chips.
- El chip es la **confirmación visual** de qué filtros están aplicados (feedback claro, regla DUX-D28).

## 4. URL params (DUX-D31)

> Los filtros se **reflejan en la URL** → shareable, SEO-friendly y persistente al volver del detalle.

### Mapa de params

| Param | Corresponde a | Ejemplo |
|---|---|---|
| `q` | Texto de búsqueda | `?q=palermo` |
| `operacion` | Operación | `?operacion=venta` |
| `tipo` | Tipo (multi, separado por coma) | `?tipo=casa,ph` |
| `zona` | Zona (multi, coma) | `?zona=palermo,recoleta` |
| `ciudad` | Ciudad | `?ciudad=buenos-aires` |
| `precio_min` | Precio mínimo | `?precio_min=50000000` |
| `precio_max` | Precio máximo | `?precio_max=150000000` |
| `ambientes_min` | Ambientes mínimos | `?ambientes_min=3` |
| `dormitorios_min` | Dormitorios mínimos | `?dormitorios_min=2` |
| `m2_min` | Superficie mínima | `?m2_min=60` |
| `m2_max` | Superficie máxima | `?m2_max=300` |
| `orden` | Ordenamiento | `?orden=precio_desc` |
| `page` | Paginación | `?page=2` |

### Comportamiento

1. **Al filtrar:** se construye la URL con los params activos (reemplazando la lista anterior). Botón "Aplicar" → actualiza la URL y la lista.
2. **Al entrar con URL pre-cargada** (desde un tile de Home o un link compartido): se leen los params y se pre-aplican a la UI (filtros y chips visibles).
3. **Al quitar un chip:** se elimina el param de la URL.
4. **"Limpiar":** se resetea a `/propiedades` (sin params).
5. **Paginación:** `page` se suma; al filtrar se resetea a `page=1`.
6. **Persistencia:** al ir al detalle (`P-03`) y volver (botón atrás), la URL conserva la búsqueda (historial del navegador).

## 5. Diseño responsive

### Desktop (≥1024px) — sidebar sticky (DUX-D23)
- Filtros en un **sidebar sticky a la izquierda** (grid 4/8 o 3/9). El grid de resultados a la derecha.
- Los filtros se agrupan en **secciones plegables** (Operación, Tipo, Zona, Precio, Ambientes/Dormitorios, m²).
- Botones "Aplicar" y "Limpiar" al pie del sidebar.

### Mobile (<1024px) — drawer (DUX-D23)
- Botón flotante **"Filtros"** abre un **panel deslizante (drawer, `C-14`)**.
- El drawer contiene los mismos filtros + "Aplicar" (fija) y "Limpiar".
- Los **chips de filtros activos** se muestran arriba del grid (fuera del drawer) para que el usuario vea qué filtra sin abrirlo.

## 6. Estados

| Estado | Comportamiento |
|---|---|
| **default** | Filtros sin aplicar. |
| **focus** | Outline `2px` `--accent-400` (inputs/selects). |
| **seleccionado** | Chip/pill activo (color de marca). |
| **empty** | 0 resultados → titular "No encontramos propiedades con esos filtros" + botón "Limpiar filtros" (DUX-D28). |
| **loading** | Skeletons de tarjetas `C-01` mientras se filtran. |
| **error** | Mensaje de error de red con botón "Reintentar" (mockup: no aplica; backend real sí). |

---

## 7. Categorías / accesos rápidos (tiles del Home `P-01`)

> Bloque "Búsqueda por zona / tipo" del Home. Cada **tile** lleva a `P-02` con **filtros pre-cargados** en la URL (DUX-D31). Combinan **tipo/categoría** y/o **zona**.

### 7.1 Tiles por categoría / tipo

| Tile | Icono (`C-20`) | URL destino (filtros pre-cargados) |
|---|---|---|
| Casas en venta | `home` | `/propiedades?operacion=venta&tipo=casa` |
| Departamentos en venta | `building-2` | `/propiedades?operacion=venta&tipo=departamento` |
| PHs | `door-open` | `/propiedades?tipo=ph` |
| Alquiler | `key` | `/propiedades?operacion=alquiler` |
| Locales comerciales | `store` | `/propiedades?tipo=local` |
| Terrenos | `map` | `/propiedades?tipo=terreno` |

### 7.2 Tiles por zona

| Tile | URL destino |
|---|---|
| Palermo | `/propiedades?zona=palermo` |
| Recoleta | `/propiedades?zona=recoleta` |
| Belgrano | `/propiedades?zona=belgrano` |
| Puerto Madero | `/propiedades?zona=puerto-madero` |
| Zona Norte | `/propiedades?zona=vicente-lopez` |

### 7.3 Comportamiento y diseño

- **Grid de tiles** con icono + label + subtítulo (ej. "Departamentos en venta" / "En Palermo y toda CABA"). 
- Cada tile es un **link a `P-02`** con los filtros pre-cargados; al llegar, los filtros y chips ya están aplicados.
- **Mobile:** tiles apilados o en grid 2 columnas. **Desktop:** grid 3–4 columnas.
- **Estado hover:** elevación + sombra `--shadow-md` (transición 200ms).
- **Cantidad sugerida:** 6–8 tiles (no saturar). Puede mostrar un contador opcional de resultados por categoría.
- **Ejemplo de copy:** "Casas en venta", "Departamentos en venta", "Alquiler", "PHs", "Locales comerciales", "Terrenos", "Palermo", "Zona Norte".

---

*Relacionado: [`modelo-datos.md`](./modelo-datos.md) §2 (tipos) y §4 (zonas); [`tarjeta.md`](./tarjeta.md) (resultado). Decisiones: `DUX-D23`, `DUX-D31`, `DPR-*`.*
