# Inventario de CTAs — mockup-inmobiliaria

> **Inventario completo de CTAs** de todo el sitio: texto, **variante** (primario/secundario/terciario), **ubicación**, **página** y **destino**.
> Aterriza `DUX-D26` (**un CTA primario por vista**) y el **tono rioplatense verbo-primero** de Branding (`DBR-06`).

---

## 1. Reglas de jerarquía (aterrizando `DUX-D26`)

| Variante | Rol | Estilo (`docs/branding/estilo.md` §4) | Regla |
|---|---|---|---|
| **Primario** | La acción que hace avanzar el embudo en esa vista. | Pill, fondo `--brand-600` (o `--accent-400` sobre oscuro). | **Uno por vista.** Responde "¿qué quiero que haga el usuario acá?" |
| **Secundario** | Alternativa de igual valor, pero no compite. | Outline / claro (borde `--brand-600`). | Máximo 1–2 por vista. |
| **Terciario** | Link / acción menor (ancla, ver más, limpiar). | Link `--brand-600`, sin fondo. | Varios permitidos. |

**Reglas de copy (rioplatense, verbo primero):**
- Empezar por un **verbo en vos** ("Encontrá", "Consultá", "Vendé", "Agendá", "Suscribite").
- **Concreto** (qué va a pasar) y **sin superlativos vacíos**.
- Máximo ~25 caracteres para botones; los links pueden ser un poco más largos.
- Nunca dos CTAs primarios con distinta acción en la misma vista.

---

## 2. Inventario por página

> Formato: **Texto** — [variante] · Ubicación → **Destino**.

### P-01 — Home

| CTA | Variante | Ubicación | Destino | Nota |
|---|---|---|---|---|
| **Ver propiedades** | Primario | Hero | `/propiedades` | CTA principal del Home. |
| **Vender mi propiedad** | Secundario | Hero (bajo el buscador) | `#vender` / landing sellers | Capta sellers. |
| **Buscar** | Secundario | Mini-buscador `C-15` | `/propiedades?zona=&tipo=&precio_max=` | Acción del buscador. |
| **Ver detalles** | Terciario | Tarjeta `C-01` destacada | `/propiedades/:slug` | Toda la tarjeta es clickeable. |
| **Ver todas las propiedades** | Terciario | Cierre de "destacadas" | `/propiedades` | |
| **Ver agentes** / **Conocer asesores** | Terciario | Cierre de "agentes" | `/agentes` | |
| **Consultá por WhatsApp** | Secundario | Tarjeta `C-02` destacada | `wa.me/...?text=...` | Mensaje pre-cargado (agente). |
| **Suscribirme** | Terciario | Footer (newsletter `C-15`) | Captura e-mail | 1 campo (`DUX-D34`). |

### P-02 — Propiedades (listado)

| CTA | Variante | Ubicación | Destino | Nota |
|---|---|---|---|---|
| **Ver detalles** | Terciario | Tarjeta `C-01` (grid) | `/propiedades/:slug` | **Toda la tarjeta clickeable** (KPI: ir a detalle). |
| **Aplicar** | Secundario | Filtros `C-03` | Refresca resultados | |
| **Limpiar** | Terciario | Filtros `C-03` | Restablece filtros | |
| **Limpiar filtros** | Secundario | Estado **empty** | Restablece filtros | Mensaje + acción (`DUX-D28`). |
| **Ver perfil** | Terciario | (si hay agente asociado) | `/agentes/:slug` | |

> **Nota:** en `P-02` el CTA **primario** de la vista es implícito: **hacer clic en una tarjeta → detalle**. No se añade un botón primario genérico que compita con los detalles.

### P-03 — Detalle de Propiedad

| CTA | Variante | Ubicación | Destino | Nota |
|---|---|---|---|---|
| **Consultá por WhatsApp** | **Primario** | Columna sticky (desktop) / barra inferior (mobile) | `wa.me/{whatsapp}?text={mensaje}` | Mensaje pre-cargado con `titulo`/`codigo`/`zona`. **CTA principal.** |
| **Contactar** | Secundario | Bajo precio / columna sticky | Formulario `C-04` | Abre el form (o scrollea a él). |
| **Agendar visita** | Secundario | Bajo CTAs | Modal `C-18` | Intención avanzada (`DUX-D32`). |
| **Pedir más fotos** | Terciario | Galería `C-11` | Formulario `C-04` (pre-cargado) | Genera lead de bajo esfuerzo. |
| **Ver en el mapa** | Terciario | Sección ubicación | Mapa | |
| **Ver perfil del agente** | Terciario | Tarjeta agente `C-02` | `/agentes/:slug` | |
| **Ver detalles** | Terciario | Tarjeta de similares | `/propiedades/:slug` | |

### P-04 — Agentes (listado)

| CTA | Variante | Ubicación | Destino | Nota |
|---|---|---|---|---|
| **Ver perfil** | Terciario | Tarjeta `C-02` | `/agentes/:slug` | **Toda la tarjeta clickeable** (KPI: ir a perfil). |
| **Consultá por WhatsApp** | Secundario | Tarjeta `C-02` (icono/botón) | `wa.me/{whatsapp}?text={mensaje}` | Contacto directo. |
| **Aplicar** | Secundario | Filtros opcionales (especialidad/idioma/zona) | Refresca resultados | |

> **Nota:** en `P-04` el CTA **primario** es implícito: **ver perfil** (click en tarjeta). El WhatsApp es secundario por tarjeta.

### P-05 — Perfil de Agente

| CTA | Variante | Ubicación | Destino | Nota |
|---|---|---|---|---|
| **Consultá por WhatsApp** | **Primario** | Header de perfil / columna sticky | `wa.me/{whatsapp}?text={mensaje}` | Mensaje con nombre del agente. **CTA principal.** |
| **Contactar** | Secundario | Header / columna | Formulario `C-04` | Asunto pre-cargado al agente. |
| **Ver sus propiedades** | Terciario | Header | Ancla al grid de propiedades | |
| **Ver todas** | Terciario | Cierre de propiedades | `/propiedades?agente={slug}` | |
| **Ver detalles** | Terciario | Tarjeta `C-01` del agente | `/propiedades/:slug` | |

### P-06 — Contacto (+ FAQ)

| CTA | Variante | Ubicación | Destino | Nota |
|---|---|---|---|---|
| **Enviar consulta** | **Primario** | Formulario `C-04` | Captura lead | CTA principal de la vista. |
| **Consultá por WhatsApp** | Secundario | Sección contacto / footer | `wa.me/...?text=...` | WhatsApp general (institucional). |
| **Ver propiedades** | Terciario | CTA de cierre | `/propiedades` | |
| **Suscribirme** | Terciario | Footer (newsletter) | Captura e-mail | |

### P-07 — Nosotros

| CTA | Variante | Ubicación | Destino | Nota |
|---|---|---|---|---|
| **Ver propiedades** | **Primario** | CTA de cierre | `/propiedades` | CTA principal de la vista (deriva a descubrir). |
| **Conocer agentes** | Secundario | Sección equipo | `/agentes` | |
| **Contactá con nosotros** | Secundario | CTA de cierre | `/contacto` | |

---

## 3. CTAs transversales (en todas las páginas)

| CTA | Variante | Ubicación | Destino | Regla |
|---|---|---|---|---|
| **Vender mi propiedad** | Primario | Header `C-05` (desktop) | Landing / `#vender` | Siempre presente en el header (`DUX-D20`). En mobile pasa al drawer `C-14`. |
| **Consultá por WhatsApp** (general) | Secundario | Footer `C-06` | `wa.me/{institucional}?text=...` | WhatsApp general. |
| **Suscribirme** | Terciario | Footer (newsletter) | Captura e-mail | 1 campo (`DUX-D34`). |
| **WhatsApp flotante** | Primario (widget) | **Flotante mobile** (esquina inferior) | `wa.me/{institucional}?text=...` | Widget de conversación. Ver [`whatsapp.md`](./whatsapp.md). |

---

## 4. Jerarquía por vista (qué es PRIMARIO y por qué)

| Vista | CTA primario | Por qué es el correcto |
|---|---|---|
| Home | "Ver propiedades" | La acción masiva es **empezar a buscar** (descubrir). |
| Detalle P-03 | "Consultá por WhatsApp" | El que más convierte en inmobiliarias; mínima fricción. |
| Perfil P-05 | "Consultá por WhatsApp" | Contactar a la persona; WhatsApp es el canal preferido. |
| Contacto P-06 | "Enviar consulta" | La página existe para recibir la consulta. |
| Nosotros P-07 | "Ver propiedades" | Nosotros genera confianza y **deriva** a la acción principal. |

---

## 5. Microcopy de CTAs (banco de textos, rioplatense)

### Primarios
- "Ver propiedades"
- "Vender mi propiedad"
- "Consultá por WhatsApp"
- "Enviar consulta"
- "Agendar visita"

### Secundarios
- "Contactar"
- "Conocer agentes"
- "Ver todas las propiedades"
- "Limpiar filtros"

### Terciarios / links
- "Ver detalles"
- "Ver perfil"
- "Ver en el mapa"
- "Pedir más fotos"
- "Suscribirme"
- "Volver a propiedades"

### Formularios / botones de acción
- "Enviar consulta"
- "Suscribirme"
- "Agendar visita"
- "Reservar"
- "Publicar mi propiedad" (sellers)

---

*Relacionado: [`embudo.md`](./embudo.md) (objetivos por página), [`whatsapp.md`](./whatsapp.md) (canal principal), [`formularios.md`](./formularios.md) (botones de formularios). Decisiones: `DMK-02` en `historial-prompts/decisiones.md`.*
