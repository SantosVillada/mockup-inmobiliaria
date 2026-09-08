# Modelo de datos de Agente — mockup-inmobiliaria

> Define la **estructura de datos de un agente inmobiliario**, pensada para mapear directo a una tabla `agentes` en Supabase/backend futuro (Agente 07). Es la **fuente de verdad** del contenido; el Agente 03 (Frontend) consume estos campos y el backend los persiste.
> Complementa el modelo de propiedades en [`docs/propiedades/modelo-datos.md`](../propiedades/modelo-datos.md), donde `propiedades.agente_id` es la FK hacia acá.

## 1. Tabla `agentes`

### Campos

| Campo | Tipo (Supabase/Postgres) | Requerido | Descripción |
|---|---|---|---|
| `id` | `uuid` (PK, default `gen_random_uuid()`) | ✅ | Identificador único. |
| `slug` | `text` | ✅ (único) | URL amigable y canónica → `/agentes/:slug`. Se genera `slugify(nombre + apellido)`; nunca cambia. |
| `nombre` | `text` | ✅ | Nombre de pila (ej. `María`). |
| `apellido` | `text` | ✅ | Apellido (ej. `González`). |
| `email` | `text` | ✅ | E-mail profesional del agente (único). |
| `telefono` | `text` | ✅ | Teléfono principal, formateado para display (ej. `+54 9 11 5555 1234`). |
| `whatsapp` | `text` | ✅ | Número de WhatsApp **solo dígitos con código de país** (ej. `5491155551234`) → se usa en el enlace `wa.me/{whatsapp}`. |
| `foto` | `text` | ✅ | URL de la foto/retrato. Ratio **3:4**, `object-fit: cover`. Ver §6. |
| `cargo` | `text` | ✅ | Título/titularidad (ej. `Asesor inmobiliario`, `Asesor senior`, `Director comercial`). Ver lista recomendada en §2. |
| `especialidades` | `jsonb` (array de `text`) | ✅ | Lista de claves de especialidad (ver §3). Mínimo 1. |
| `idiomas` | `jsonb` (array de `text`) | ⬜ | Lista de claves de idiomas hablados (ver §5). Default `["espanol"]`. |
| `bio` | `text` | ✅ | Biografía breve (2–4 párrafos, tono rioplatense) para el perfil. |
| `anios_experiencia` | `int` | ✅ | Años de experiencia en el rubro. Se muestra como stat (C-19). |
| `estadisticas` | `jsonb` (objeto) | ⬜ | Métricas numéricas para mostrar como stats (ver §4). |
| `zona_cobertura` | `jsonb` (array de `text`) | ⬜ | Zonas donde opera (claves de zona normalizadas, ver §7). |
| `redes` | `jsonb` (objeto) | ⬜ | Redes sociales: `{ "linkedin": "...", "instagram": "...", ... }`. Ver §8. |
| `activo` | `boolean` | ✅ | Si el agente se muestra públicamente. `false` → no aparece en `P-04` ni se enlaza desde `P-03`. |
| `orden` | `int` | ✅ | Orden de aparición en listados (`P-04`, Home). Menor = primero. |
| `publicado_en` | `timestamptz` | ✅ | Fecha de alta (para ordenar por "más recientes"). |
| `actualizado_en` | `timestamptz` | ⬜ | Última actualización. |

### Notas de implementación

- **Identidad completa:** el nombre mostrado es `nombre + apellido`. El slug usa **ambos** para evitar colisiones.
- **`whatsapp`** es el campo de conversión clave: es el que alimenta el botón `C-13` (WhatsApp) con `wa.me/{whatsapp}?text={mensaje}`. Ver [`contacto.md`](./contacto.md).
- **`cargo`** como texto libre, pero se recomienda usar la lista controlada de §2 para consistencia en filtros/etiquetas.
- **`especialidades` / `idiomas` / `zona_cobertura`** son arrays de **claves** (slugs) de listas controladas, no texto libre → filtros y etiquetas consistentes.
- **`estadisticas`** como objeto JSONB para no agregar columnas por métrica; el Frontend las lee con claves conocidas. `anios_experiencia` queda a nivel superior por ser un stat primario.
- **Foto:** URL externa (mockup usa placeholder determinista). En producción, se sube a un bucket (Supabase Storage) y se guarda la URL.

---

## 2. Cargo / titularidad (lista recomendada)

> `cargo` se guarda como texto; para consistencia se recomienda usar estos valores. El label se muestra tal cual.

| Valor sugerido | Label (UI) | Jerarquía |
|---|---|---|
| `asesor` | Asesor inmobiliario | Base. |
| `asesor-senior` | Asesor senior | Mayor experiencia / cartera. |
| `especialista-inversion` | Especialista en inversión | Enfocado en rentabilidad/obra. |
| `broker` | Broker / Martillero público | Matriculado, cierra operaciones. |
| `director-comercial` | Director comercial | Lidera el equipo. |

> **Nota:** si se quiere filtrar por cargo (opcional en `P-04`), conviene guardar el **valor** (slug) y mostrar el **label**.

---

## 3. Especialidades (lista controlada)

> Lista cerrada de especialidades para etiquetas, filtros y bio. Cada una tiene `clave` (slug), `label` (UI) y `icono` sugerido (`C-20`, Lucide).

| Clave | Label | Icono sugerido | Relación con tipos de propiedad |
|---|---|---|---|
| `residencial` | Residencial | `home` | Viviendas en general. |
| `venta-departamentos` | Venta de departamentos | `building-2` | `departamento` (venta). |
| `alquileres` | Alquileres | `key` | `operacion = alquiler` (todos los tipos). |
| `ph` | PHs / Propiedad Horizontal | `home` | `ph`. |
| `comercial` | Locales y terrenos | `store` | `local`, `terreno`. |
| `inversion` | Inversión | `trending-up` | Rentabilidad, obra nueva, oportunidad. |
| `obra-nueva` | Obra nueva | `sparkles` | `antiguedad_anios = 0` / `estado = nuevo`. |

- **Regla:** cada agente tiene al menos **1** especialidad; se recomienda 1–3 (no sobrecargar la tarjeta).
- Las especialidades se muestran como **chips** (`C-08`) en la tarjeta `C-02` y en el perfil `C-16`.
- Se usan en el **filtro opcional** de `P-04` (ver [`perfil.md`](./perfil.md) §6 y [`contacto.md`](./contacto.md) §4).

---

## 4. Estadísticas (`estadisticas`)

> Objeto JSONB con métricas numéricas que alimentan el componente `C-19` (Factor de confianza / Stat). Claves conocidas:

| Clave | Tipo | Label (UI) | Ejemplo |
|---|---|---|---|
| `operaciones_cerradas` | `int` | Operaciones cerradas | `120` |
| `propiedades_vendidas` | `int` | Propiedades vendidas | `85` |
| `clientes_atendidos` | `int` | Clientes atendidos | `300` |
| `valor_transaccionado` | `text` | Valor transaccionado | `"+$5.000M ARS"` |
| `satisfaccion` | `int` | Satisfacción (%) | `98` |

- **`anios_experiencia`** va a nivel superior (campo propio), no dentro de `estadisticas`, porque es un stat siempre visible.
- La UI muestra **3–4 stats** por agente (el perfil `C-16`), priorizando: años de experiencia, operaciones cerradas, propiedades vendidas, satisfacción.
- Si una clave no existe, la UI simplemente no muestra ese stat (estado `empty`/ausencia de dato — DUX-D28).

---

## 5. Idiomas (lista controlada)

> Lista de idiomas que habla el agente. `clave` en minúscula, `label` para UI.

| Clave | Label |
|---|---|
| `espanol` | Español |
| `ingles` | Inglés |
| `portugues` | Portugués |
| `italiano` | Italiano |
| `frances` | Francés |
| `aleman` | Alemán |

- Default: `["espanol"]`.
- Se muestran como chips pequeños (idioma) en `C-02`/`C-16`. Forman parte del **filtro opcional** de `P-04`.

---

## 6. Foto (`foto`)

- **Ratio:** **3:4** (retrato). `object-fit: cover`.
- **Tratamiento:** color grade consistente con la marca (neutros fríos + toque cálido); sin filtros pesados. Se recomienda fondo neutro o entorno de trabajo/inmueble (ver `docs/branding/estilo.md` §2).
- **Placeholder mockup:** `https://i.pravatar.cc/600x800?img={n}` (determinista, retrato) o `https://picsum.photos/seed/{slug}/600/800`. **En producción se reemplazan por fotos reales**.
- **Alt:** `"Retrato de {nombre} {apellido}, {cargo}"` (SEO + accesibilidad).

---

## 7. Zonas de cobertura (`zona_cobertura`)

> Reutiliza la **lista controlada de zonas** definida por el Agente 04 en [`docs/propiedades/modelo-datos.md`](../propiedades/modelo-datos.md) §4 (DPR-08). Son **claves** (slugs).

| `zona_cobertura` (clave) | Label | Ciudad |
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

- **Regla:** mantener la coherencia con las zonas de las propiedades que el agente tiene asignadas. No inventar zonas fuera de la lista.
- Las zonas de cobertura se muestran como chips en `C-16` y se usan en el **filtro opcional** de `P-04`.

---

## 8. Redes (`redes`)

> Objeto JSONB con enlaces a redes profesionales. Claves conocidas:

| Clave | Label | Icono |
|---|---|---|
| `linkedin` | LinkedIn | `linkedin` (Lucide) |
| `instagram` | Instagram | `instagram` (Lucide) |
| `facebook` | Facebook | `facebook` (Lucide) |
| `web` | Sitio personal | `globe` |

- Opcional; se muestran como iconos en `C-16` (no en la tarjeta compacta).

---

## 9. Relación con propiedades (1:N)

### 9.1 Definición

- `propiedades.agente_id` (FK) → `agentes.id`. **Un agente tiene muchas propiedades; una propiedad pertenece a un único agente.**
- Definido en [`docs/propiedades/modelo-datos.md`](../propiedades/modelo-datos.md) §1 y §7.

### 9.2 Cómo se listan "propiedades del agente"

Para la sección de propiedades del perfil (`P-05`):

```sql
SELECT * FROM propiedades
WHERE agente_id = :id
  AND disponible = true
ORDER BY publicado_en DESC;
```

- **Filtros:** solo `disponible = true` (excluye RESERVADO/VENDIDO). Se ordena por `publicado_en DESC` (más recientes primero).
- **Grid:** tarjetas `C-01` (estándar). En `P-05` se muestran hasta **6** (con botón "Ver todas" → `P-02` con filtro `?agente={slug}` opcional).
- **Contador:** se puede mostrar "X propiedades en cartera".
- **Estado vacío (DUX-D28):** si el agente no tiene propiedades activas, se muestra un mensaje amigable ("Este asesor aún no tiene propiedades publicadas") + CTA "Ver todas las propiedades" o "Contactar por WhatsApp". Nunca dejar la sección en blanco.

### 9.3 Consulta inversa (propiedades por agente en `P-03`)

En el detalle `P-03`, el `agente_id` de la propiedad resuelve al agente a mostrar en la tarjeta `C-02` (modo perfil) → enlaza a `P-05`.

---

## 10. Notas de compatibilidad (backend futuro)

- **PK uuid** y **slug único** → mismo patrón que `propiedades` (DPR-01/DPR-07). El slug de agente es la URL canónica de `P-05`.
- **`especialidades`, `idiomas`, `zona_cobertura`, `redes`, `estadisticas`** como JSONB → listas/objetos flexibles sin migraciones al agregar valores. En Postgres se pueden indexar con GIN para filtrar (`@>` / `?`).
- **FK con `on delete`**: al eliminar un agente, decidir si las propiedades quedan **huérfanas** (set null) o **sin asignar**. Recomendado: `SET NULL` + regla de negocio de reasignar en el backend (Agente 07).
- **RLS (Row Level Security) / políticas** de Supabase: los agentes son de lectura pública; la escritura se limita a un rol admin. Lo resuelve el Agente 07.

---

*Relacionado: [`tarjeta.md`](./tarjeta.md) (`C-02`), [`perfil.md`](./perfil.md) (`P-05`/`C-16`), [`contacto.md`](./contacto.md) (WhatsApp/formulario), [`datos-demo.md`](./datos-demo.md). Decisiones: `DAG-*` en `historial-prompts/decisiones.md`.*
