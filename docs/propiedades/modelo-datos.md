# Modelo de datos de Propiedad — mockup-inmobiliaria

> Define la **estructura de datos de una propiedad**, pensada para mapear directo a una tabla en Supabase/backend futuro (Agente 07). Es la **fuente de verdad** del contenido; el Agente 03 (Frontend) consume estos campos y el backend los persiste.

## 1. Tabla `propiedades`

### Campos

| Campo | Tipo (Supabase/Postgres) | Requerido | Descripción |
|---|---|---|---|
| `id` | `uuid` (PK, default `gen_random_uuid()`) | ✅ | Identificador único. |
| `slug` | `text` | ✅ (único) | URL amigable y canónica → `/propiedades/:slug`. Se genera `slugify(titulo)`; nunca cambia. |
| `codigo` | `text` | ⬜ (opcional) | Código interno de listado (ej. `REF-MOR-001`), usado en ficha técnica y en mensajes de WhatsApp. |
| `titulo` | `text` | ✅ | Título de la propiedad (display, máx. ~80 caracteres). |
| `descripcion` | `text` | ✅ | Descripción larga (texto/markdown) para la sección "Descripción" del detalle. |
| `precio` | `numeric` | ✅ | Valor numérico **sin separadores** (ej. `320000000`). |
| `moneda` | `text` | ✅ | `ARS` (default) / `USD` / `UYU`. Se configura una vez; el mockup usa `ARS`. |
| `operacion` | `text` (enum) | ✅ | `venta` \| `alquiler`. Si `alquiler`, el `precio` es **mensual** (por mes). |
| `tipo` | `text` (enum) | ✅ | `casa` \| `departamento` \| `ph` \| `local` \| `terreno`. Ver §2. |
| `zona` | `text` | ✅ | Barrio/zona (ej. `Palermo`, `Belgrano`). Normalizado (slug en `zona` para filtros). |
| `ciudad` | `text` | ✅ | Ciudad (ej. `Buenos Aires`, `Vicente López`). |
| `direccion` | `text` | ✅ | Dirección o referencia de ubicación. En el detalle se muestra como texto (nunca el número exacto por privacidad, si se prefiere). |
| `ambientes` | `int` | ✅ | Cantidad total de ambientes. |
| `dormitorios` | `int` | ✅ | Cantidad de dormitorios. |
| `banos` | `int` | ✅ | Cantidad de baños. |
| `superficie_total_m2` | `numeric` | ✅ | Superficie total en m² (lote para casas/terrenos). |
| `superficie_cubierta_m2` | `numeric` | ⬜ | Superficie cubierta en m² (edificada). Si no se indica, se oculta en la ficha. |
| `antiguedad_anios` | `int` | ⬜ | Antigüedad en años. `0` = obra nueva (se muestra "0 años / obra nueva"). |
| `disponible` | `boolean` | ✅ | Si la propiedad está activa para mostrarse. `false` → badge RESERVADO/VENDIDO y no aparece en listados activos. |
| `estado` | `text` (enum) | ✅ | Badge/atributo de marketing: `nuevo` \| `exclusivo` \| `oportunidad` \| `reservado` \| `vendido` \| `default`. Ver §3. |
| `destacado` | `boolean` | ✅ | Si se muestra en "Propiedades destacadas" del Home (P-01) y prioriza en P-02. |
| `caracteristicas` | `jsonb` (array de `text`) | ⬜ | Lista de claves de amenities (ej. `["balcon","cochera","piscina"]`). Ver `amenities` en §5. |
| `latitud` | `numeric` | ⬜ | Coordenada latitud para mapa. |
| `longitud` | `numeric` | ⬜ | Coordenada longitud para mapa. |
| `imagenes` | `jsonb` (array de `object`) | ✅ | Lista ordenada de imágenes: `[{ "url": "...", "alt": "...", "orden": 1 }]`. Ver §6. |
| `agente_id` | `uuid` (FK → `agentes`) | ✅ | Agente asociado (responsable). Lo define el Agente 05. |
| `publicado_en` | `timestamptz` | ✅ | Fecha de publicación (para ordenar por "más recientes" y badge NUEVO). |
| `actualizado_en` | `timestamptz` | ⬜ | Última actualización. |

### Notas de implementación

- **Precio:** siempre numérico puro. El formateo (miles, símbolo, "por mes") es responsabilidad del Frontend (`Intl.NumberFormat` con `moneda`).
- **Operación = alquiler:** el `precio` es mensual; la UI añade el sufijo "por mes".
- **Slug:** única clave canónica para `P-03`. Si se cambia el título, el slug no cambia (estabilidad SEO).
- **`agente_id`:** se relaciona con la futura tabla `agentes` (Agente 05). Para el mockup, se usa un `agente_id` fijo/demo.
- **Búsqueda por zona:** se indexa `zona` y `ciudad` (normalizadas). Las zonas se centralizan en una lista (ver §7).

---

## 2. Tipos y categorías de propiedad

### 2.1 Tipos (enum cerrado)

| Tipo (`tipo`) | Label (UI) | Descripción |
|---|---|---|
| `casa` | Casa | Vivienda unifamiliar con acceso propio; suele tener patio/jardín. |
| `departamento` | Departamento | Unidad dentro de un edificio; supone expensas y amenities comunes. |
| `ph` | PH | Propiedad Horizontal: casa de planta baja/entrepiso con patio compartido o acceso a techo. Muy rioplatense. |
| `local` | Local / Comercial | Local comercial u oficina. |
| `terreno` | Terreno | Lote sin construir. |

> **Extensión futura (no en el mockup):** `cochera`, `oficina`, `country`, `monoambiente` (como subtipo de departamento). Se agregan al enum sin romper nada.

### 2.2 Agrupación para filtros (categorías)

Para los filtros de `C-03` y los tiles de Home, los tipos se agrupan así:

| Categoría | Tipos incluidos | Uso |
|---|---|---|
| **Vivienda** | `casa`, `departamento`, `ph` | Búsqueda de compra/alquiler residencial. |
| **Comercial** | `local` | Negocios y oficinas. |
| **Terreno** | `terreno` | Lotes. |

- En el filtro de tipo, se puede elegir un **tipo individual** o una **categoría** (vivienda/comercial/terreno). La UI de filtro muestra chips/checkboxes; el backend resuelve la categoría a sus tipos.
- Los **tiles de Home** ("Búsqueda por zona/tipo") pre-cargan filtros por tipo, categoría y/o zona.

---

## 3. Badges y estados

> Semántica de color según `docs/branding/colores.md` (tokens en `docs/branding/tokens.md`).

### 3.1 Badge de operación (siempre visible — DUX-D27)

Se muestra **sobre la imagen** de la tarjeta y en el detalle. Un solo badge de operación por propiedad.

| Valor (`operacion`) | Label | Fondo | Texto |
|---|---|---|---|
| `venta` | **VENTA** | `--brand-600` | `#FFFFFF` |
| `alquiler` | **ALQUILER** | `--brand-500` | `#FFFFFF` |

### 3.2 Badge de estado / atributo (opcional, puede apilarse junto al de operación)

| Valor (`estado`) | Label | Fondo | Texto | Semántica |
|---|---|---|---|---|
| `nuevo` | **NUEVO** | `--warning-soft` | `--warning` | Recién publicada / obra nueva (ámbar). |
| `exclusivo` | **EXCLUSIVO** | `--accent-100` | `--accent-600` | Propiedad destacada/única (dorado premium). |
| `oportunidad` | **OPORTUNIDAD** | `--warning-soft` | `--warning` | Buena oportunidad/precio (ámbar). |
| `reservado` | **RESERVADO** | `--neutral-200` | `--neutral-600` | Apartada, no disponible (gris). |
| `vendido` | **VENDIDO** | `--neutral-200` | `--neutral-600` | Vendida, no disponible (gris). |
| `default` | — | — | — | Sin estado especial (no se muestra badge de estado). |

### 3.3 Reglas de aplicación

1. **Siempre** hay un badge de **operación** (VENTA/ALQUILER). Los badges de estado son **adicionales**.
2. **`disponible = false`** → se muestra **RESERVADO** o **VENDIDO** (según `estado`) y la propiedad se **excluye** de los listados activos (queda en estado de referencia/historial).
3. **Solo un badge de estado** a la vez por propiedad para no saturar (si hay varios, prioridad: `exclusivo` > `nuevo` > `oportunidad`).
4. **Accesibilidad:** nunca texto claro sobre dorado; usar `--accent-600` para texto sobre fondo claro (regla DBR-09). En el badge `EXCLUSIVO`, fondo `--accent-100` + texto `--accent-600`.
5. **Verde (`--success`)** se reserva para "DISPONIBLE" (inventario/estado de propiedad disponible) si se muestra como tercer badge en el detalle; no se usa en tarjetas de listado para no competir con la operación.

---

## 4. Búsqueda por zona — zonas normalizadas

Las zonas se centralizan en una lista controlada (futura tabla `zonas` o enum en backend). Para el mockup:

| `zona` (slug) | Label | Ciudad |
|---|---|---|
| `palermo` | Palermo | Buenos Aires |
| `recoleta` | Recoleta | Buenos Aires |
| `belgrano` | Belgrano | Buenos Aires |
| `nunez` | Núñez | Buenos Aires |
| `puerto-madero` | Puerto Madero | Buenos Aires |
| `caballito` | Caballito | Buenos Aires |
| `san-telmo` | San Telmo | Buenos Aires |
| `barrio-norte` | Barrio Norte | Buenos Aires |
| `vicente-lopez` | Vicente López | Vicente López (GBA Norte) |
| `la-plata` | La Plata | La Plata |

> Se usa el slug de zona en los URL params (`?zona=palermo`) y en tiles de Home.

---

## 5. Características / amenities (lista controlada)

> Lista estándar de amenities para **mostrar** en el detalle y **filtrar** (opcional avanzado). Cada amenity tiene `clave` (slug), `label` (UI) y `icono` (`C-20`, Lucide). Ver también [`detalle.md`](./detalle.md) §7.

### 5.1 Generales / exteriores

| Clave | Label | Icono sugerido |
|---|---|---|
| `balcon` | Balcón | `sun` / `building-2` |
| `terraza` | Terraza | `sun` |
| `patio` | Patio | `tree-deciduous` |
| `jardin` | Jardín | `tree-pine` |
| `parrilla` | Parrilla / Quincho | `flame` |
| `piscina` | Piscina | `waves` |
| `cochera` | Cochera / Garaje | `car` |
| `baulera` | Baulera | `package` |
| `deposito` | Depósito | `archive` |

### 5.2 Edificio / amenities comunes

| Clave | Label | Icono sugerido |
|---|---|---|
| `ascensor` | Ascensor | `arrow-up-down` |
| `porteria` | Portería / Seguridad 24hs | `shield-check` |
| `sum` | Salón de usos múltiples | `users` |
| `gym` | Gimnasio | `dumbbell` |
| `piscina-comun` | Pileta común | `waves` |

### 5.3 Confort / interiores

| Clave | Label | Icono sugerido |
|---|---|---|
| `aire` | Aire acondicionado | `snowflake` |
| `calefaccion` | Calefacción | `thermometer` |
| `placares` | Placeres | `door-open` |
| `amoblado` | Amoblado | `sofa` |
| `cocina-integrada` | Cocina integrada | `utensils` |
| `lavadero` | Lavadero | `washing-machine` |
| `perchero` | Perchero / vestidor | `shirt` |

### 5.4 Seguridad / tecnología

| Clave | Label | Icono sugerido |
|---|---|---|
| `alarma` | Alarma | `siren` |
| `camaras` | Cámaras de seguridad | `camera` |
| `porton-electrico` | Portón eléctrico | `lock` |
| `wifi` | Internet / fibra | `wifi` |
| `domotica` | Domótica | `cpu` |

> **Filtro por amenities:** en el mockup los amenities se muestran en el detalle. El filtro por amenity (avanzado) puede agregarse luego como checkbox en `C-03`; el campo `caracteristicas` ya soporta el filtrado (`@>` en Postgres para arrays jsonb).

---

## 6. Imágenes (`imagenes`)

```jsonc
[
  { "url": "https://.../img-01.jpg", "alt": "Living principal del departamento en Palermo", "orden": 1 },
  { "url": "https://.../img-02.jpg", "alt": "Cocina integrada con isla", "orden": 2 },
  ...
]
```

- **`orden`** define el orden de la galería; la primera (`orden: 1`) es la **imagen principal** (portada de la tarjeta `C-01`).
- **Ratio:** hero/tarjeta 4:3, galería 4:3 (opcional 16:9 en destacada). `object-fit: cover`.
- **Alt:** siempre descriptivo (SEO + accesibilidad).
- **Placeholder mockup:** se usan imágenes determinísticas (ver [`datos-demo.md`](./datos-demo.md)) y se reemplazan por fotos reales al subir a producción.

---

## 7. Relaciones (futuras)

| Relación | Tipo | Nota |
|---|---|---|
| `propiedades.agente_id` → `agentes.id` | FK (1:N) | Un agente puede tener muchas propiedades. Lo define el Agente 05. |
| `propiedades.zona` → `zonas.slug` | lookup | Zona normalizada para filtros/tiles. |
| `propiedades.caracteristicas` → `amenities.clave` | array | Lista de claves (ver §5). |
| `visitas` / `leads` | futuro | Agendamiento de visita y leads (Agente 06/07). |

---

*Relacionado: [`tarjeta.md`](./tarjeta.md), [`filtros-busqueda.md`](./filtros-busqueda.md), [`detalle.md`](./detalle.md), [`datos-demo.md`](./datos-demo.md). Decisiones: `DPR-*` en `historial-prompts/decisiones.md`.*
