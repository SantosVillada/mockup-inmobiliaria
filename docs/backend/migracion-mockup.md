# Migración del mockup → backend (Supabase)

> Pasos concretos para reemplazar los **datos locales** (`web/lib/data/*.ts`) por **queries a Supabase** y conectar los **formularios** a la inserción de `leads`. Se listan los **puntos de integración exactos** (archivos) y una **guía de reemplazo 1:1**.

---

## 1. Estado actual (datos locales)

El mockup consume datos tipados desde:
- `web/lib/types.ts` — tipos `Propiedad`, `Agente`, `Lead`, etc. (siguen siendo válidos; Supabase devuelve JSON compatible).
- `web/lib/data/propiedades.ts` — 10 propiedades + helpers (`getPropiedadBySlug`, `getPropiedadesDestacadas`, `getPropiedadesPorAgente`, `getPropiedadesSimilares`).
- `web/lib/data/agentes.ts` — 5 agentes + helpers (`getAgenteBySlug`, `getAgenteById`, `getAgentesActivos`, `getAgentesDestacados`).

Los **componentes** importan directamente desde `lib/data/*`. La migración consiste en cambiar esos imports por las funciones de `lib/queries/*` (que ya consultan Supabase).

---

## 2. Puntos de integración exactos

### 2.1 Reemplazo de lecturas (datos → Supabase)

| Archivo actual | Helper usado | Reemplazo (Supabase) |
|---|---|---|
| `web/app/page.tsx` | `getPropiedadesDestacadas`, `getAgentesDestacados` | `getPropiedadesDestacadas()` / `getAgentesActivos()` de `lib/queries/*` |
| `web/app/propiedades/page.tsx` | `PropiedadesListado` (client) usa `propiedades` | ver §2.2 |
| `web/app/propiedades/[slug]/page.tsx` | `getPropiedadBySlug`, `getPropiedadesSimilares`, `getAgenteById` | `getPropiedadBySlug`, `getPropiedadesPorAgente` / query similar, `getAgenteById` |
| `web/app/agentes/page.tsx` | `getAgentesActivos` | `getAgentesActivos()` |
| `web/app/agentes/[slug]/page.tsx` | `getAgenteBySlug`, `getPropiedadesPorAgente` | `getAgenteBySlug`, `getPropiedadesPorAgente` |
| `web/app/nosotros/page.tsx` | `getAgentesActivos` | `getAgentesActivos()` |
| `web/app/vender/page.tsx` | `getPropiedadesDestacadas` | `getPropiedadesDestacadas()` |
| `web/components/propiedades/PropiedadesListado.tsx` | `propiedades` (data) + `filtrarPropiedades` | `getPropiedades(filtros)` en servidor o via API |

> `getPropiedadesSimilares` no tiene equivalente directo en `lib/queries`; se resuelve con una query de `propiedades` filtrando por `tipo`/`zona` y excluyendo el id actual (`neq`). Se documenta en §3.

### 2.2 El listado `P-02` (caso especial)

`PropiedadesListado` es un **componente cliente** que hoy importa `propiedades` (array local) y filtra en el cliente (`filtrarPropiedades`). Para migrar sin reescribir todo:

- **Opción A (mínima):** hacer un fetch a una API/Server Action que devuelva las propiedades ya filtradas, y pasar los filtros desde `searchParams`. El filtrado/paginación pasa al servidor (Supabase).
- **Opción B:** mover el listado a un Server Component que lea `searchParams`, ejecute `getPropiedades(filtros)` y renderice la grilla (manteniendo los componentes de UI client para filtros/drawer).

**Recomendación:** Opción B (server component) — `PropiedadesListado` recibe `searchParams` y llama a `getPropiedades`; los `Filtros`/`ChipsFiltros`/`Paginacion` siguen siendo client pero reciben datos por props. El mapeo de `searchParams` → filtros ya existe (`filtrosFromParams` en `Filtros.tsx`).

### 2.3 Reemplazo de escrituras (formularios → `leads`)

Los formularios hoy **simulan** el envío (`setTimeout` → success). Se conectan a `POST /api/leads`:

| Formulario | Archivo | Tipo de lead | Datos a enviar |
|---|---|---|---|
| Contacto `C-04` | `web/components/conversion/FormularioContacto.tsx` | `contacto` | nombre, telefono, email, mensaje, `origen`, `canal='formulario'`, `agente_id`/`propiedad_id` según contexto |
| Vender | `web/components/conversion/FormularioVender.tsx` | `vender` | nombre, telefono, email, `operacion_interes`, `tipo_propiedad`, `zona_interes`, `origen='vender'` |
| Visita (modal) | `web/components/conversion/ModalVisita.tsx` | `visita` | nombre, telefono, email, `fecha_visita`, `hora_visita`, `propiedad_id`, `agente_id`, `origen='detalle'` |
| Newsletter | `web/components/conversion/Newsletter.tsx` | `newsletter` | email, `origen` (footer/home/modal) |

> **Contexto implícito:** los formularios hoy reciben `asunto`/propiedad/agente por props. Al conectar, esos valores se pasan como `propiedad_id`/`agente_id`/`origen` al body del POST.

**Patrón de conexión (en cada form client):**

```ts
async function handleSubmit(e: FormEvent) {
  e.preventDefault();
  const err = validar();
  setErrores(err);
  if (Object.keys(err).length) return;
  setStatus("loading");
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: form.nombre,
        telefono: form.telefono,
        email: form.email,
        mensaje: form.mensaje,
        tipo: "contacto",
        origen: "detalle",
        canal: "formulario",
        // agente_id, propiedad_id según contexto
      }),
    });
    if (!res.ok) throw new Error("Error al enviar");
    setStatus("success");
  } catch {
    // mostrar estado de error (DUX-D28)
  }
}
```

---

## 3. Queries auxiliares que faltan

- `getPropiedadesSimilares(propiedad)` → en `lib/queries/propiedades.ts`:
  `supabase.from('propiedades').select('*').eq('disponible', true).or(\`tipo.eq.${p.tipo},zona.eq.${p.zona}\`).neq('id', p.id).limit(3)`.
- `getAgentesDestacados()` → reutiliza `getAgentesActivos()` y toma los primeros `orden` (o filtro `destacado` si se agrega).

---

## 4. Carga de datos de ejemplo

Para poblar Supabase con los datos demo sin escribir a mano:

1. Reutilizar `docs/propiedades/datos-demo.md` (10 propiedades) y `docs/agentes/datos-demo.md` (5 agentes).
2. Insertar en `agentes` (con `slug`, `whatsapp`, `especialidades`, etc.).
3. Insertar en `propiedades` (con `slug`, `precio`, `imagenes` jsonb, `agente_id`, etc.).
4. Los `id` de los demo (`prop-001`, `agt-01`) se mapean a los `uuid` generados.

> Los JSONB (`imagenes`, `caracteristicas`, `estadisticas`, `especialidades`) coinciden 1:1 con los objetos del mockup, por lo que el tipado `Propiedad`/`Agente` sigue funcionando sin cambios.

---

## 5. Orden de migración recomendado (por fases)

Ver el plan en `migracion-mockup.md` §6 (o `estructura.md`). Resumen:

1. **Fase 1 — Datos reales (catálogo):** crear proyecto Supabase, correr `esquema-sql.md`, cargar seed, conectar `lib/queries/*` en las páginas de lectura. El sitio muestra datos reales.
2. **Fase 2 — Leads:** conectar los 4 formularios a `POST /api/leads`. Empezar a ver leads en la tabla.
3. **Fase 3 — Auth / Admin:** habilitar Auth, `middleware.ts`, login, `app/admin/*` con RLS. Gestión de propiedades/agentes/leads.
4. **Fase 4 — Integraciones:** storage, email, mapa, notificaciones, analytics.

---

## 6. Checklist por archivo

- [ ] `web/app/page.tsx` — cambiar imports de `lib/data` → `lib/queries`.
- [ ] `web/app/propiedades/page.tsx` — (opcional) listado server component.
- [ ] `web/app/propiedades/[slug]/page.tsx` — queries server.
- [ ] `web/app/agentes/page.tsx` — queries server.
- [ ] `web/app/agentes/[slug]/page.tsx` — queries server.
- [ ] `web/app/nosotros/page.tsx` — queries server.
- [ ] `web/app/vender/page.tsx` — queries server.
- [ ] `web/components/propiedades/PropiedadesListado.tsx` — datos desde Supabase.
- [ ] `web/components/conversion/FormularioContacto.tsx` — `fetch POST /api/leads`.
- [ ] `web/components/conversion/FormularioVender.tsx` — `fetch POST /api/leads`.
- [ ] `web/components/conversion/ModalVisita.tsx` — `fetch POST /api/leads`.
- [ ] `web/components/conversion/Newsletter.tsx` — `fetch POST /api/leads`.
- [ ] `.env.local` — completar credenciales (ver `estructura.md`).

---

*Relacionado: `docs/backend/estructura.md`, `docs/backend/arquitectura.md`, `docs/backend/esquema-sql.md`.*
