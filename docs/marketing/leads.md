# Modelo de datos de `leads` — mockup-inmobiliaria

> Define la **tabla `leads`** (captación de contactos) y los **estados del lead**, pensada para mapear directo a **Supabase/backend futuro** (Agente 07). Es la **fuente de verdad** para persistir todo lo que generan los formularios, WhatsApp, newsletter y reservas.
> Complementa `docs/propiedades/modelo-datos.md` y `docs/agentes/modelo-datos.md` (usa sus `id`/`slug`).

---

## 1. Tabla `leads`

### Campos

| Campo | Tipo (Supabase/Postgres) | Requerido | Descripción |
|---|---|---|---|
| `id` | `uuid` (PK, default `gen_random_uuid()`) | ✅ | Identificador único. |
| `nombre` | `text` | ✅ | Nombre del contacto (del formulario). |
| `telefono` | `text` | ✅ | Teléfono formateado para display (ej. `+54 9 11 ...`). |
| `whatsapp` | `text` | ⬜ | Número de WhatsApp **solo dígitos con código de país** (si se usa para `wa.me`). Puede derivarse de `telefono`. |
| `email` | `text` | ⬜ | E-mail (requerido en newsletter; opcional en contacto). |
| `mensaje` | `text` | ⬜ | Mensaje / interés (del formulario de contacto o del mensaje pre-cargado de WhatsApp). |
| `tipo` | `text` (enum) | ✅ | Origen del lead: `contacto` \| `visita` \| `vender` \| `newsletter`. Ver §2. |
| `agente_id` | `uuid` (FK → `agentes`, nullable) | ⬜ | Agente asignado (si el lead viene de una propiedad/agente concreto). |
| `propiedad_id` | `uuid` (FK → `propiedades`, nullable) | ⬜ | Propiedad de interés (si el lead viene de un detalle `P-03`). |
| `titulo_propiedad` | `text` | ⬜ | Título de la propiedad de interés (denormalizado, para no tener que hacer join). |
| `fecha_visita` | `date` | ⬜ | Solo si `tipo = visita`: fecha agendada. |
| `hora_visita` | `time` | ⬜ | Solo si `tipo = visita`: hora agendada. |
| `operacion_interes` | `text` | ⬜ | Si el seller indica: `venta` \| `alquiler` (flujo vender). |
| `tipo_propiedad` | `text` | ⬜ | Si el seller indica: `casa` \| `departamento` \| `ph` \| `local` \| `terreno`. |
| `zona_interes` | `text` | ⬜ | Zona de interés (normalizada, ver `docs/propiedades/modelo-datos.md` §4). |
| `origen` | `text` | ✅ | Página/ubicación donde se captó: `home`, `propiedades`, `detalle`, `agentes`, `perfil`, `contacto`, `nosotros`, `vender`. |
| `canal` | `text` (enum) | ✅ | Cómo se captó: `whatsapp` \| `formulario`. |
| `estado` | `text` (enum) | ✅ | Estado del lead. Ver §3. |
| `notas` | `text` | ⬜ | Notas internas del asesor. |
| `creado_en` | `timestamptz` | ✅ | Fecha de creación. |
| `actualizado_en` | `timestamptz` | ⬜ | Última actualización. |
| `cerrado_en` | `timestamptz` | ⬜ | Si el lead se cerró (vendido/no). |

### Notas de implementación

- **`tipo`** categoriza el lead para que el asesor sepa **qué esperar** (consulta, visita, venta o newsletter).
- **`agente_id` / `propiedad_id`** son **nullable** (un lead general no los tiene). Si vienen de un detalle/perfil, se asignan para que el asesor correcto reciba el lead.
- **`titulo_propiedad`** denormalizado → no hace falta hacer `join` para mostrar "consulta sobre X" en el CRM del asesor.
- **`origen`** permite medir **de qué página viene** la conversión (clave para optimizar).
- **`canal`** distingue **WhatsApp vs formulario** → útil para medir cuál convierte más.
- **`estado`** es el **workflow** del lead (ver §3). El mockup puede simular; el Agente 07 lo gestiona.

---

## 2. `tipo` (enum de tipo de lead)

| Valor | Label | Cuándo se genera |
|---|---|---|
| `contacto` | Consulta | Formulario `C-04`, WhatsApp general, pedir más info/fotos. |
| `visita` | Visita agendada | Modal de reserva `C-18`. |
| `vender` | Vender / alquilar | Formulario / WhatsApp de "Vender mi propiedad". |
| `newsletter` | Newsletter | Suscripción de e-mail (footer/modal). |

---

## 3. `estado` (estados del lead)

> **Workflow del lead.** Un lead puede moverse por estos estados a lo largo de su ciclo de vida.

| Estado (`estado`) | Label | Descripción | Cuando ocurre |
|---|---|---|---|
| `nuevo` | Nuevo | Lead recién captado, sin gestionar. | Se crea al enviar el form / abrir WhatsApp. |
| `contactado` | Contactado | El asesor ya lo contactó. | Después de la primera respuesta del asesor. |
| `calificado` | Calificado | Se validó el interés / presupuesto / requisitos. | Tras una conversación que define necesidad. |
| `visito` | Visitó | La persona visitó la propiedad (si corresponde). | Tras una visita agendada realizada. |
| `cerrado` | Cerrado | Se concretó (venta / alquiler) o se descartó satisfactoriamente. | Cierre positivo de la operación. |
| `perdido` | Perdido | Se perdió (no respondió, eligió otra, etc.). | El asesor lo marca como no convertible. |

### Reglas de transición

```
nuevo → contactado → calificado → (visito) → cerrado
                                   └→ perdido (en cualquier punto)
```

- **`nuevo`** es el estado por defecto al crear el lead.
- **`cerrado`** es el objetivo; **`perdido`** es el estado de cierre negativo.
- **`visito`** es opcional (solo aplica a `tipo = visita` o a propiedades donde se agendó visita).
- El asesor avanza los estados manualmente (o el backend lo automatiza parcialmente). El Agente 07 define permisos/RLS para esto.

---

## 4. Relaciones

| Relación | Tipo | Nota |
|---|---|---|
| `leads.agente_id` → `agentes.id` | FK (nullable) | Asignación al asesor. `SET NULL` si se borra el agente. |
| `leads.propiedad_id` → `propiedades.id` | FK (nullable) | Propiedad de interés. `SET NULL` si se borra. |
| `leads.zona_interes` → `zonas.slug` | lookup | Zona normalizada (reutiliza `docs/propiedades/modelo-datos.md` §4). |

---

## 5. SQL de ejemplo (para el Agente 07)

```sql
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  telefono text not null,
  whatsapp text,
  email text,
  mensaje text,
  tipo text not null check (tipo in ('contacto','visita','vender','newsletter')),
  agente_id uuid references public.agentes(id) on delete set null,
  propiedad_id uuid references public.propiedades(id) on delete set null,
  titulo_propiedad text,
  fecha_visita date,
  hora_visita time,
  operacion_interes text,
  tipo_propiedad text,
  zona_interes text,
  origen text not null,
  canal text not null check (canal in ('whatsapp','formulario')),
  estado text not null default 'nuevo'
    check (estado in ('nuevo','contactado','calificado','visito','cerrado','perdido')),
  notas text,
  creado_en timestamptz not null default now(),
  actualizado_en timestamptz,
  cerrado_en timestamptz
);
```

> **Nota de seguridad (RLS):** la **inserción** de leads puede ser pública (anónima) para los formularios; la **lectura/edición** se limita a un rol admin/asesor. Lo resuelve el Agente 07 (Supabase RLS).

---

## 6. Índices sugeridos

- `(estado)` — para el tablero de gestión del asesor.
- `(agente_id)` — para listar leads de un asesor.
- `(origen)` — para medir qué página convierte.
- `(tipo)` — para filtrar por tipo de lead.
- `(creado_en desc)` — para ordenar por recientes.

---

*Relacionado: [`formularios.md`](./formularios.md) (qué se envía por cada form), [`whatsapp.md`](./whatsapp.md) (canal), [`embudo.md`](./embudo.md) (origen por página). Decisiones: `DMK-09`, `DMK-10` en `historial-prompts/decisiones.md`.*
