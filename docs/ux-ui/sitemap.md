# Sitemap y páginas — mockup-inmobiliaria

> Este documento define **qué páginas existen**, con qué **propósito**, y **cuáles entran** en el primer mockup.
> Convención de IDs: `P-NN`.

---

## Principio rector para decidir páginas

Regla de oro del primer mockup: **mínimo suficiente para convertir**. Cada página debe tener un objetivo claro. Lo que no ayuda a convertir (ni a generar confianza ni a encontrar propiedades) se pospone.

Criterios que usé para **incluir** una página:

1. **Cumple un objetivo de negocio** (encontrar, ver, contactar, confiar).
2. **Se puede construir como mockup** sin datos de backend reales (usa contenido demo).
3. **No introduce fricción ni navegación muerta** (sin páginas "en construcción" que rompan el recorrido).

Criterios para **excluir / posponer**:

1. **Requiere contenido editorial extenso** (blog) que no aporta al flujo de conversión inicial.
2. **Es un cluster que puede vivir como sección** (testimonios, FAQ) y así ahorrar páginas.
3. **Depende de un backend / datos aún no existentes** (p.ej. autenticación, dashboard de clientes).

---

## Mapa de páginas

```
Home (P-01)
├── Propiedades (P-02)            [search + filtros]
│     └── Detalle de Propiedad (P-03)   [galería, agente, CTA, similares]
│           (feed de similares → vuelve a P-03)
├── Agentes (P-04)
│     └── Perfil de Agente (P-05)  [bio + sus propiedades]
├── Contacto (P-06)               [form + mapa + WhatsApp] (+ FAQ como sección)
├── Nosotros / Quiénes somos (P-07)
└── (posponer) Testimonios → sección en Home y P-03
└── (posponer) FAQ → sección en P-06
└── (posponer) Blog → fase posterior (SEO/contenido)
```

---

## Detalle por página

### P-01 — Home
- **Propósito:** primera impresión + **conversión temprana**. Que el visitante entienda qué es el sitio en <5s, encuentre la acción principal (buscar / ver propiedades / contactar) y, si está indeciso, confíe.
- **Ruta:** `/`
- **Objetivo de negocio (KPI):** iniciar una búsqueda, ir a propiedades o contactar por WhatsApp.
- **Bloques (de arriba a abajo):**
  1. Hero con **barra de búsqueda rápida** (zona, tipo, precio) + CTA primario.
  2. **Propiedades destacadas** (grid de tarjetas `C-01`).
  3. **Búsquelas por zona / tipo** (accesos rápidos a P-02 con filtro pre-cargado).
  4. **Por qué elegirnos** (beneficios / trust signals).
  5. **Estadísticas** (números de la inmobiliaria).
  6. **Testimonios** (carrusel `C-12`) — incluye este bloque, NO como página separada.
  7. **Agentes destacados** (grid de tarjetas `C-02`).
  8. **CTA final + newsletter** (se dirige a P-06 / WhatsApp).
- **Nota:** Testimonios viven acá → justifica excluir página propia.

### P-02 — Propiedades (listado + búsqueda/filtros)
- **Propósito:** **encontrar** la propiedad adecuada mediante filtros y lectura rápida de resultados.
- **Ruta:** `/propiedades`
- **Objetivo:** llegar a un detalle (P-03) o contactar.
- **Contenido:**
  - **Barra de búsqueda/filtros** (`C-03`): búsqueda textual + filtros por **tipo**, **operación** (venta/alquiler), **zona/ciudad**, **rango de precio**, **ambientes/cantidad de dormitorios**, **metro²**.
  - **Barra de resultados**: contador de resultados + ordenamiento (relevancia, precio asc/desc, más recientes).
  - **Grid responsivo** de tarjetas `C-01`.
  - **Paginación** (`C-09`) y estados **vacío** / **loading**.
- **Clave UX:** los filtros deben quedar **visibles/en-fijo** en desktop (sidebar sticky) y como **panel deslizante** en mobile (drawer).

### P-03 — Detalle de Propiedad
- **Propósito:** **convencer** a quien ya está interesado, y llevarlo a la acción (contactar / WhatsApp / agendar visita).
- **Ruta:** `/propiedades/:slug`
- **Objetivo:** contacto o WhatsApp.
- **Contenido:**
  1. **Galería** de imágenes (`C-11` / slider).
  2. Título, **precio** destacado, **badges** de estado (`C-08`: venta/alquiler/nuevo/único).
  3. Ficha técnica: tipo, operación, ambientes, dormitorios, baños, metro², antigüedad, disponibilidad.
  4. **Características** (listado de amenities).
  5. **Ubicación / mapa**.
  6. **Tarjeta del agente** (`C-02` en modo perfil) + **CTA contacto** fijo.
  7. **Propiedades similares** (grid de `C-01`).
  8. **Sticky CTA / barra de contacto** en mobile.
- **Clave UX:** el CTA de contacto debe ser **fijo y siempre visible** (header en desktop, barra inferior en mobile).

### P-04 — Agentes (listado)
- **Propósito:** generar **confianza por personas**; permite elegir un asesor.
- **Ruta:** `/agentes`
- **Objetivo:** ir a un perfil de agente o contactar directo.
- **Contenido:** grid de tarjetas `C-02`, filtro por especialidad/idioma/zona (opcional), CTA contacto.

### P-05 — Perfil de Agente
- **Propósito:** profundizar confianza; mostrar experiencia y propiedades a cargo.
- **Ruta:** `/agentes/:slug`
- **Objetivo:** contacto directo con ese agente (WhatsApp / form).
- **Contenido:** foto, bio, **especialidad**, **idiomas**, estadísticas (propiedades vendidas, años de experiencia), **CTA WhatsApp + formulario**, y **propiedades publicadas por este agente**.

### P-06 — Contacto (+ FAQ como sección)
- **Propósito:** canal de contacto centralizado y sin fricción.
- **Ruta:** `/contacto`
- **Objetivo:** recibir una consulta (lead) o abrir WhatsApp.
- **Contenido:**
  - **Formulario de contacto** (`C-04`) — campos mínimos.
  - **Datos de contacto** (teléfono, e-mail, dirección, horarios).
  - **Botón WhatsApp** (inserta `C-13`).
  - **Mapa** de ubicación.
  - **FAQ** como **sección acordeón** (`C-10`) — justifica excluir página propia.

### P-07 — Nosotros / Quiénes somos
- **Propósito:** construir **autoridad y confianza** (respaldo corporativo).
- **Ruta:** `/nosotros`
- **Objetivo:** reafirmar que es una inmobiliaria seria y experta.
- **Contenido:** misión/visión, **historia**, **valores**, **estadísticas**, **equipo** (link a P-04), **certificaciones/afiliaciones**, breve CTA a P-02/P-06.

---

## Justificación: qué entra y qué no en el primer mockup

### Incluir (7 páginas)
| Página | Justificación |
|---|---|
| P-01 Home | Primera impresión y puerta de entrada; concentra la conversión temprana. |
| P-02 Propiedades | Núcleo del negocio: permite buscar y filtrar. Es el corazón. |
| P-03 Detalle | Donde ocurre la conversión (contacto/WhatsApp). Indispensable. |
| P-04 Agentes | Confianza por personas; muchos usuarios quieren "tratar con alguien". |
| P-05 Perfil Agente | Profundiza la relación personal; fácil de derivar de P-04. |
| P-06 Contacto | Canal de lead directo. Obligatorio. |
| P-07 Nosotros | Autoridad/confianza corporativa; barato de construir. |

### Posponer / excluir (con motivo)
| Ítem | Motivo | Cuándo lo retomamos |
|---|---|---|
| **Testimonios** (página) | Funciona mejor como **sección de home y de detalle**; una página sola no aporta al flujo de conversión y duplica contenido. | Ya incluido como bloque; no se proyecta página. |
| **FAQ** (página) | Impacto similar como **sección en Contacto**; evita una página con poco tráfico y navegación extra. | Ya incluido como acordeón en P-06. |
| **Blog** | Requiere contenido editorial sostenido (SEO de largo plazo), no aporta al flujo de conversión inicial y complica el mockup con scaffolds vacíos. | Fase posterior; puedo agregarlo en `sitemap.md` como "futuro" sin romper nada. |
| **Dashboard / login de clientes** | Depende de backend real (Supabase); fuera de alcance del mockup. | Fase 3+ (Backend). |
| **Detalle de agente "en construcción"** | Ninguna página en construcción en el mockup: rompería la sensación de sitio terminado. | — |

### Futuro (roadmap de páginas, NO del primer mockup)
- `/blog` y `/blog/:slug` — contenido / SEO.
- `/propiedades/:slug/solicitar-visita` — agendamiento con backend.
- `/favoritos` — lista guardada (requiere sesión de usuario).
- `/listado` para un plan de "publicar mi propiedad" (sellers) — ver Agente 06/Marketing.

---

## Navegación global (menú)

En **desktop**:
1. Inicio (`/`)
2. Propiedades (`/propiedades`)
3. Agentes (`/agentes`)
4. Nosotros (`/nosotros`)
5. Contacto (`/contacto`)

CTA de header: **"Vender mi propiedad"** (primario) o **"Consultar"** (secundario). Ver `layout.md` para jerarquía.

En **mobile**: menú hamburguesa con los mismos ítems + CTA de header como botón prominente.

---

## IDs de página (referencia para el Agente 03)

| ID | Página | Archivo objetivo sugerido |
|----|--------|---------------------------|
| P-01 | Home | `index` |
| P-02 | Propiedades | `propiedades` |
| P-03 | Detalle de Propiedad | `propiedad-detalle` |
| P-04 | Agentes | `agentes` |
| P-05 | Perfil de Agente | `agente-perfil` |
| P-06 | Contacto (+FAQ) | `contacto` |
| P-07 | Nosotros | `nosotros` |
