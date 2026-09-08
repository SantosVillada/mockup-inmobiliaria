# Esquema SQL — mockup-inmobiliaria

> SQL completo y ejecutable para **Supabase (Postgres)**. Consolida las tablas ya definidas por los Agentes 04/05/06 (`propiedades`, `agentes`, `leads`) y agrega **`roles`, `usuarios`, `clientes`** y una vista derivada **`consultas`**.
> Decisiones: `DBK-*` en `historial-prompts/decisiones.md`.

---

## 0. Convenciones

- **PK:** `uuid` con `gen_random_uuid()` (nativo en Postgres 13+; no requiere extensión).
- **Enums:** se usan enums de Postgres para los conjuntos cerrados (operación, tipo, estado, tipo/canal/estado de lead). Alternativa equivalente: `text` + `check` (como en `docs/marketing/leads.md`). La app consume los valores como `string`.
- **JSONB:** listas/objetos flexibles (`caracteristicas`, `imagenes`, `especialidades`, `estadisticas`, `zonas`, `redes`, `permisos`).
- **Timestamps:** `timestamptz` + trigger para `actualizado_en`.
- **RLS:** habilitado en todas las tablas públicas; lecturas públicas de catálogo, escritura anónima de `leads`, CRUD admin/asesor.
- **Orden de creación:** `roles` → `agentes` → `propiedades` → `usuarios` → `clientes` → `leads` → vistas → índices → RLS → triggers → seeds.

Pegá el bloque completo en el **SQL Editor** de Supabase.

---

## 1. Extensiones y enums

```sql
-- (gen_random_uuid es nativo; no hace falta crear extensión)

create type public.rol_usuario as enum ('admin','asesor','cliente');
create type public.tipo_operacion as enum ('venta','alquiler');
create type public.tipo_propiedad as enum ('casa','departamento','ph','local','terreno');
create type public.estado_propiedad as enum ('nuevo','exclusivo','oportunidad','reservado','vendido','default');
create type public.tipo_lead as enum ('contacto','visita','vender','newsletter');
create type public.estado_lead as enum ('nuevo','contactado','calificado','visito','cerrado','perdido');
create type public.canal_lead as enum ('whatsapp','formulario');
```

---

## 2. Tablas de catálogo

### 2.1 `roles` (lookup de roles y permisos)

```sql
create table public.roles (
  codigo    text primary key,           -- 'admin' | 'asesor' | 'cliente'
  label     text not null,
  permisos  jsonb not null default '[]'::jsonb,
  creado_en timestamptz not null default now()
);

insert into public.roles (codigo, label, permisos) values
  ('admin',   'Administrador',          '["propiedades:leer","propiedades:crear","propiedades:editar","propiedades:eliminar","agentes:leer","agentes:crear","agentes:editar","agentes:eliminar","leads:leer","leads:editar","leads:eliminar","clientes:leer","clientes:editar","usuarios:gestionar"]'::jsonb),
  ('asesor',  'Asesor inmobiliario',    '["propiedades:leer","propiedades:crear","propiedades:editar","agentes:leer","agentes:editar","leads:leer","leads:editar","clientes:leer","clientes:editar"]'::jsonb),
  ('cliente', 'Cliente',                '["propiedades:leer","agentes:leer"]'::jsonb);
```

### 2.2 `agentes`

```sql
create table public.agentes (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  nombre            text not null,
  apellido          text not null,
  email             text not null unique,
  telefono          text not null,
  whatsapp          text not null,
  foto              text,
  cargo             text,
  especialidades    jsonb not null default '[]'::jsonb,
  idiomas           jsonb not null default '["espanol"]'::jsonb,
  bio               text,
  anios_experiencia int not null default 0,
  estadisticas      jsonb not null default '{}'::jsonb,
  zona_cobertura    jsonb not null default '[]'::jsonb,
  redes             jsonb not null default '{}'::jsonb,
  activo            boolean not null default true,
  orden             int not null default 0,
  publicado_en      timestamptz not null default now(),
  actualizado_en    timestamptz
);
```

### 2.3 `propiedades`

```sql
create table public.propiedades (
  id                   uuid primary key default gen_random_uuid(),
  slug                 text not null unique,
  codigo               text unique,
  titulo               text not null,
  descripcion          text not null,
  precio               numeric not null,
  moneda               text not null default 'ARS',
  operacion            public.tipo_operacion not null,
  tipo                 public.tipo_propiedad not null,
  zona                 text not null,
  ciudad               text not null,
  direccion            text,
  ambientes            int not null default 0,
  dormitorios          int not null default 0,
  banos                int not null default 0,
  superficie_total_m2  numeric,
  superficie_cubierta_m2 numeric,
  antiguedad_anios     int,
  disponible           boolean not null default true,
  estado               public.estado_propiedad not null default 'default',
  destacado            boolean not null default false,
  caracteristicas      jsonb not null default '[]'::jsonb,
  latitud              numeric,
  longitud             numeric,
  imagenes             jsonb not null default '[]'::jsonb,
  agente_id            uuid references public.agentes(id) on delete set null,
  publicado_en         timestamptz not null default now(),
  actualizado_en       timestamptz
);
```

### 2.4 `zonas` y `amenities` (catálogos de referencia)

```sql
create table public.zonas (
  slug   text primary key,
  label  text not null,
  ciudad text not null,
  orden  int not null default 0,
  activa boolean not null default true
);

create table public.amenities (
  clave     text primary key,
  label     text not null,
  categoria text not null,
  icono     text
);
```

---

## 3. Tablas de usuarios / clientes

### 3.1 `usuarios` (perfil, 1:1 con `auth.users`)

```sql
create table public.usuarios (
  id           uuid primary key references auth.users(id) on delete cascade,
  nombre       text not null,
  apellido     text not null,
  email        text not null unique,
  telefono     text,
  whatsapp     text,
  rol          text not null references public.roles(codigo) default 'cliente',
  agente_id    uuid references public.agentes(id) on delete set null, -- si es asesor/admin
  activo       boolean not null default true,
  creado_en    timestamptz not null default now(),
  actualizado_en timestamptz
);
```

### 3.2 `clientes` (extensión de perfil de cliente registrado)

```sql
create table public.clientes (
  id                 uuid primary key references public.usuarios(id) on delete cascade,
  tipo_interes       text,                       -- 'comprador' | 'vendedor' | 'inversor' | ...
  zonas_preferidas   jsonb not null default '[]'::jsonb,
  presupuesto_min    numeric,
  presupuesto_max    numeric,
  newsletter         boolean not null default true,
  notas              text,
  creado_en          timestamptz not null default now(),
  actualizado_en     timestamptz
);
```

---

## 4. Tabla `leads` (captura) + vista `consultas`

### 4.1 `leads`

```sql
create table public.leads (
  id                 uuid primary key default gen_random_uuid(),
  nombre             text not null,
  telefono           text not null,
  whatsapp           text,
  email              text,
  mensaje            text,
  tipo               public.tipo_lead not null,
  agente_id          uuid references public.agentes(id) on delete set null,
  propiedad_id       uuid references public.propiedades(id) on delete set null,
  titulo_propiedad   text,
  fecha_visita       date,
  hora_visita        time,
  operacion_interes  public.tipo_operacion,
  tipo_propiedad     public.tipo_propiedad,
  zona_interes       text,
  origen             text not null,
  canal              public.canal_lead not null default 'formulario',
  estado             public.estado_lead not null default 'nuevo',
  usuario_id         uuid references public.usuarios(id) on delete set null,
  notas              text,
  creado_en          timestamptz not null default now(),
  actualizado_en     timestamptz,
  cerrado_en         timestamptz
);
```

### 4.2 `consultas` (vista derivada)

> **Decisión DBK-04:** `leads` es la **fuente única** de captación. `consultas` es una **vista derivada** (consultas formales = `contacto` + `visita`) para reportes. Si más adelante se necesita historial por usuario/thread, se promueve a tabla real (con `usuario_id` y `lead_id`).

```sql
create or replace view public.consultas as
select
  id, nombre, telefono, whatsapp, email, mensaje,
  tipo, agente_id, propiedad_id, titulo_propiedad,
  fecha_visita, hora_visita, zona_interes, origen, canal,
  estado, usuario_id, notas, creado_en, actualizado_en
from public.leads
where tipo in ('contacto','visita');
```

### 4.3 `config` (ajustes institucionales)

```sql
create table public.config (
  clave       text primary key,
  valor       text not null,
  descripcion text
);

insert into public.config (clave, valor, descripcion) values
  ('whatsapp_institucional','5491155550000','Número institucional de WhatsApp'),
  ('whatsapp_display','+54 9 11 5555 0000','Display del número institucional'),
  ('email_institucional','hola@morada.com.ar','E-mail institucional'),
  ('telefono_institucional','+54 9 11 5555 0000','Teléfono institucional'),
  ('horarios','Lun a Vie 9:00-19:00 · Sáb 9:00-13:00','Horarios de atención');
```

---

## 5. Índices

```sql
-- propiedades
create index idx_propiedades_zona       on public.propiedades (zona);
create index idx_propiedades_ciudad     on public.propiedades (ciudad);
create index idx_propiedades_operacion  on public.propiedades (operacion);
create index idx_propiedades_tipo       on public.propiedades (tipo);
create index idx_propiedades_estado     on public.propiedades (estado);
create index idx_propiedades_destacado  on public.propiedades (destacado);
create index idx_propiedades_publicado  on public.propiedades (publicado_en desc);
create index idx_propiedades_agente     on public.propiedades (agente_id);
create index idx_propiedades_caract     on public.propiedades using gin (caracteristicas);

-- agentes
create index idx_agentes_especialidades on public.agentes using gin (especialidades);
create index idx_agentes_zona_cobertura on public.agentes using gin (zona_cobertura);

-- leads
create index idx_leads_estado     on public.leads (estado);
create index idx_leads_agente     on public.leads (agente_id);
create index idx_leads_propiedad  on public.leads (propiedad_id);
create index idx_leads_origen     on public.leads (origen);
create index idx_leads_tipo       on public.leads (tipo);
create index idx_leads_creado     on public.leads (creado_en desc);
create index idx_leads_usuario    on public.leads (usuario_id);
```

---

## 6. RLS — Row Level Security

### 6.1 Helpers de rol

```sql
create or replace function public.current_rol() returns text
language sql stable as $$
  select rol from public.usuarios where id = auth.uid()
$$;

create or replace function public.is_admin() returns boolean
language sql stable as $$
  select exists (select 1 from public.usuarios where id = auth.uid() and rol = 'admin')
$$;

create or replace function public.is_asesor() returns boolean
language sql stable as $$
  select exists (select 1 from public.usuarios where id = auth.uid() and rol in ('admin','asesor'))
$$;
```

### 6.2 Habilitar RLS

```sql
alter table public.roles       enable row level security;
alter table public.agentes     enable row level security;
alter table public.propiedades enable row level security;
alter table public.zonas       enable row level security;
alter table public.amenities   enable row level security;
alter table public.usuarios    enable row level security;
alter table public.clientes    enable row level security;
alter table public.leads       enable row level security;
alter table public.config      enable row level security;
```

### 6.3 Políticas

```sql
-- roles: lectura pública (labels), escritura admin
create policy roles_select on public.roles for select using (true);
create policy roles_insert on public.roles for insert with check (public.is_admin());
create policy roles_update on public.roles for update using (public.is_admin());
create policy roles_delete on public.roles for delete using (public.is_admin());

-- agentes: lectura pública, escritura admin
create policy agentes_select on public.agentes for select using (true);
create policy agentes_insert on public.agentes for insert with check (public.is_admin());
create policy agentes_update on public.agentes for update using (public.is_admin());
create policy agentes_delete on public.agentes for delete using (public.is_admin());

-- propiedades: lectura pública, escritura admin (o asesor con permisos)
create policy propiedades_select on public.propiedades for select using (true);
create policy propiedades_insert on public.propiedades for insert with check (public.is_admin());
create policy propiedades_update on public.propiedades for update using (public.is_admin());
create policy propiedades_delete on public.propiedades for delete using (public.is_admin());

-- zonas / amenities: lectura pública, escritura admin
create policy zonas_select on public.zonas for select using (true);
create policy zonas_insert on public.zonas for insert with check (public.is_admin());
create policy zonas_update on public.zonas for update using (public.is_admin());
create policy zonas_delete on public.zonas for delete using (public.is_admin());

create policy amenities_select on public.amenities for select using (true);
create policy amenities_insert on public.amenities for insert with check (public.is_admin());
create policy amenities_update on public.amenities for update using (public.is_admin());
create policy amenities_delete on public.amenities for delete using (public.is_admin());

-- config: lectura pública, escritura admin
create policy config_select on public.config for select using (true);
create policy config_insert on public.config for insert with check (public.is_admin());
create policy config_update on public.config for update using (public.is_admin());
create policy config_delete on public.config for delete using (public.is_admin());

-- usuarios: el usuario lee/edita su propio perfil; admin todo
create policy usuarios_select_own on public.usuarios for select using (id = auth.uid() or public.is_admin());
create policy usuarios_insert on public.usuarios for insert with check (id = auth.uid() or public.is_admin());
create policy usuarios_update_own on public.usuarios for update using (id = auth.uid() or public.is_admin());
create policy usuarios_delete_admin on public.usuarios for delete using (public.is_admin());

-- clientes: el cliente lee/edita su propio perfil; admin todo
create policy clientes_select_own on public.clientes for select using (id = auth.uid() or public.is_admin());
create policy clientes_insert on public.clientes for insert with check (id = auth.uid() or public.is_admin());
create policy clientes_update_own on public.clientes for update using (id = auth.uid() or public.is_admin());
create policy clientes_delete_admin on public.clientes for delete using (public.is_admin());

-- leads: inserción ANÓNIMA (formularios públicos); lectura/edición solo asesor/admin
create policy leads_insert_anon on public.leads for insert with check (true);
create policy leads_select_team on public.leads for select using (public.is_asesor());
create policy leads_update_team on public.leads for update using (public.is_asesor());
create policy leads_delete_team on public.leads for delete using (public.is_admin());
```

---

## 7. Triggers

### 7.1 Auto-actualizar `actualizado_en`

```sql
create or replace function public.set_updated_at() returns trigger
language plpgsql as $$
begin
  new.actualizado_en = now();
  return new;
end;
$$;

create trigger trg_agentes_updated     before update on public.agentes
  for each row execute function public.set_updated_at();
create trigger trg_propiedades_updated before update on public.propiedades
  for each row execute function public.set_updated_at();
create trigger trg_usuarios_updated    before update on public.usuarios
  for each row execute function public.set_updated_at();
create trigger trg_clientes_updated    before update on public.clientes
  for each row execute function public.set_updated_at();
create trigger trg_leads_updated       before update on public.leads
  for each row execute function public.set_updated_at();
```

### 7.2 Crear perfil al registrarse (Supabase Auth)

```sql
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.usuarios (id, nombre, apellido, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nombre', ''),
    coalesce(new.raw_user_meta_data->>'apellido', ''),
    new.email
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
```

> Los campos `nombre`/`apellido` deben enviarse en `options.data` (raw_user_meta_data) al crear el usuario.

---

## 8. Storage — buckets

```sql
-- Buckets para imágenes (RLS: lectura pública, escritura admin/asesor)
insert into storage.buckets (id, name, public) values
  ('propiedades', 'propiedades', true),
  ('agentes', 'agentes', true)
on conflict (id) do nothing;

create policy storage_propiedades_read on storage.objects
  for select using (bucket_id = 'propiedades');
create policy storage_propiedades_write on storage.objects
  for insert with check (bucket_id = 'propiedades' and public.is_asesor());

create policy storage_agentes_read on storage.objects
  for select using (bucket_id = 'agentes');
create policy storage_agentes_write on storage.objects
  for insert with check (bucket_id = 'agentes' and public.is_asesor());
```

---

## 9. Seed de datos de ejemplo (opcional)

> Para probar sin cargar a mano, se puede reutilizar `docs/propiedades/datos-demo.md` y `docs/agentes/datos-demo.md` con un script de inserción. La estructura de los JSONB (`imagenes`, `caracteristicas`, `estadisticas`, `especialidades`) coincide 1:1 con los objetos del mockup en `web/lib/data/`. Ver `migracion-mockup.md` §4.

---

*Relacionado: `docs/backend/arquitectura.md`, `docs/backend/auth-roles.md`, `docs/backend/migracion-mockup.md`. Decisiones: `DBK-*`.*
