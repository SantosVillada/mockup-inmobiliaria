# Formularios — mockup-inmobiliaria

> Define la estructura de **todos los formularios**: **contacto** (`C-04`), **vender mi propiedad** (sellers), **newsletter** (`C-15`/modal), y **reserva de visita** (modal `C-18`). Cada uno con **campos**, **estados** y **mensajes de éxito**.
> Aterriza `DUX-D30` (máx. 4 campos), `DUX-D34` (newsletter 1 campo) y `DMK-05`/`DMK-06`/`DMK-07`/`DMK-08`.
> Los campos **deben poder persistir** en la tabla `leads` (ver [`leads.md`](./leads.md)).

---

## 1. Formulario de contacto (`C-04`)

> Contacto general / por agente / por propiedad. **Mínima fricción.** Máximo **4 campos** (`DUX-D30`).

### 1.1 Campos

| Campo | Tipo input | Requerido | Validación | Destino (tabla `leads`) |
|---|---|---|---|---|
| **Nombre** | `text` | ✅ | No vacío (mín. 2 caracteres). | `nombre` |
| **Teléfono / WhatsApp** | `tel` | ✅ | Formato válido (ej. `+54 9 11 ...`). | `telefono` / `whatsapp` |
| **E-mail** | `email` | ⬜ (recomendado) | Formato e-mail si se completa. | `email` |
| **Mensaje / interés** | `textarea` | ✅ | No vacío; puede pre-cargarse. | `mensaje` |

- **Botón:** "Enviar consulta" (primario).
- **Asunto implícito** (campos ocultos / contexto de la vista):
  - `agente_id` → si viene de `P-05`/`P-04` o de la tarjeta de agente en `P-03`.
  - `propiedad_id` + `titulo` → si viene de `P-03`.
  - `origen` → página (`home`, `propiedades`, `detalle`, `agentes`, `perfil`, `contacto`, `nosotros`, `vender`).
  - `canal` → `formulario`.
- **Pre-carga del mensaje:** al entrar desde `P-03` (propiedad) o `P-05` (agente), el placeholder/área se sugiere con el asunto, ej.:
  - `"Consulta sobre la propiedad: {titulo}."` (desde `P-03`)
  - `"Consulta para {nombre} {apellido}."` (desde `P-05`)
  - **No pre-cargar el mensaje completo** (frustra); solo el asunto como placeholder.

### 1.2 Estados

| Estado | Comportamiento |
|---|---|
| **default** | Campos en blanco (o con asunto pre-cargado). |
| **focus** | Outline `--accent-400` (accesibilidad). |
| **empty / error** | Validación **inline** en español, junto al campo, con icono y texto (`--error`/`--error-strong`). |
| **submitting / loading** | Spinner en el botón + campos deshabilitados. |
| **success** | **"¡Recibimos tu consulta! Te contactamos a la brevedad."** + CTA "Seguir explorando propiedades" / "Volver a inicio". |

### 1.3 Mensaje de éxito (rioplatense)

```
¡Recibimos tu consulta!
Te contactamos a la brevedad. Mientras tanto, podés seguir explorando propiedades.
[ Seguir explorando propiedades ]
```

---

## 2. Formulario "Vender mi propiedad" (sellers)

> Para **propietarios que quieren vender/alquilar** su propiedad. Es un **form de mayor fricción** que el de contacto, pero sigue siendo **mínimo**. El CTA primario del flujo seller es **WhatsApp**; el formulario es el camino formal.

### 2.1 Estructura

Dos pasos conceptuales (en una sola tarjeta/form, no multi-paso en el mockup):

**Paso A — Datos del propietario (3 campos):**
| Campo | Tipo | Requerido | Validación |
|---|---|---|---|
| **Nombre** | `text` | ✅ | No vacío. |
| **Teléfono / WhatsApp** | `tel` | ✅ | Formato válido. |
| **E-mail** | `email` | ⬜ | Formato e-mail. |

**Paso B — Datos de la propiedad (4 campos):**
| Campo | Tipo | Requerido | Validación |
|---|---|---|---|
| **Operación** | `select` | ✅ | `venta` / `alquiler`. |
| **Tipo de propiedad** | `select` | ✅ | `casa` / `departamento` / `ph` / `local` / `terreno`. |
| **Zona / Ciudad** | `text` (con sugerencias) | ✅ | No vacío; usar zonas normalizadas. |
| **Descripción breve** | `textarea` | ⬜ | Opcional, máx. ~500 caracteres. |

- **Botón primario:** "Publicar mi propiedad" / "Vendé tu propiedad".
- **Botón secundario (alternativo):** "Consultá por WhatsApp" — el usuario elige el canal.
- **Contexto implícito:** `tipo = vender` (o `vender-alquilar`), `origen = vender`, `canal = formulario`.

### 2.2 Estados

| Estado | Comportamiento |
|---|---|
| **default** | Campos en blanco. |
| **error** | Validación inline (operación/tipo/zona requeridos). |
| **submitting** | Spinner. |
| **success** | **"¡Gracias por confiar en nosotros! Un asesor te va a contactar para coordinar la publicación de tu propiedad."** + CTA "Volver al inicio". |

### 2.3 Mensaje de éxito (rioplatense)

```
¡Gracias por confiar en nosotros!
Un asesor te va a contactar para coordinar la publicación de tu propiedad.
[ Volver al inicio ]
```

### 2.4 Por qué el primario es WhatsApp en sellers

- El seller suele tener la propiedad "a mano" y quiere una respuesta rápida; WhatsApp le resuelve.
- El formulario captura más contexto pero es más esfuerzo; se deja como **secundario**.
- **Nunca pedir fotos ni documentación en el formulario** (fricción alta); eso se coordina después por WhatsApp/visita.

---

## 3. Newsletter (`C-15` / modal)

> Captura de e-mail para "nuevas propiedades". **1 campo** (`DUX-D34`). Vive en el **footer** (`C-06`) y como **modal** opcional en `P-01`.

### 3.1 Campo

| Campo | Tipo | Requerido | Validación |
|---|---|---|---|
| **E-mail** | `email` | ✅ | Formato válido; no vacío. |

- **Botón:** "Suscribirme".
- **Contexto implícito:** `tipo = newsletter`, `origen` (footer/home/modal), `canal = formulario`.

### 3.2 Estados

| Estado | Comportamiento |
|---|---|
| **default** | Campo e-mail vacío. |
| **focus** | Outline `--accent-400`. |
| **error** | "Ingresá un e-mail válido." (`--error`). |
| **submitting** | Spinner. |
| **success** | **"¡Listo! Te avisamos de las nuevas propiedades antes que nadie."** |

### 3.3 Reglas anti-spam / privacidad

- Texto corto junto al campo: "Recibí las nuevas propiedades antes que nadie."
- Link a **política de privacidad** ("Nunca spam. Podés darte de baja cuando quieras.").
- **Doble opt-in recomendado** (confirmación por e-mail) — lo implementa el Agente 07 (backend).
- **Nunca** pedir más de 1 campo.

---

## 4. Reserva de visita (modal `C-18`)

> **Intención avanzada** que se ofrece como **modal en `P-03`** (`DUX-D32`) para no abandonar la página. Campos de **fecha/hora + datos mínimos**.

### 4.1 Campos

| Campo | Tipo | Requerido | Validación |
|---|---|---|---|
| **Fecha** | `date` | ✅ | Fecha futura (no hoy/atrás). |
| **Hora** | `time` | ✅ | Rango de horarios disponibles (9–19hs). |
| **Nombre** | `text` | ✅ | No vacío. |
| **Teléfono / WhatsApp** | `tel` | ✅ | Formato válido. |
| **E-mail** | `email` | ⬜ | Formato e-mail. |

- **Botón:** "Agendar visita" / "Reservar".
- **Contexto implícito:** `tipo = visita`, `propiedad_id` + `titulo`, `agente_id`, `fecha`, `hora`, `origen = detalle`, `canal = formulario`.
- **Alternativa de 1 clic:** link "Preferís coordinar por WhatsApp?" → abre `wa.me/{agente}?text={mensaje}`.

### 4.2 Estados

| Estado | Comportamiento |
|---|---|
| **default** | Modal con fecha/hora vacías. |
| **error** | Validación (fecha/hora requeridas, fecha futura). |
| **submitting** | Spinner. |
| **success** | **"¡Listo! Agendamos tu visita para {fecha} a las {hora}. Te confirmamos por WhatsApp."** + CTA "Cerrar" / "Volver a la propiedad". |

### 4.3 Mensaje de éxito (rioplatense)

```
¡Listo! Agendamos tu visita.
Te confirmamos por WhatsApp. Si querés, también podés escribirnos antes.
[ Cerrar ]
```

### 4.4 Nota backend

- La reserva de visita **necesita backend** para persistir (`leads` con `tipo=visita` + `fecha`/`hora`). En el mockup, el Agente 03 muestra el estado **success** simulado; el Agente 07 conecta la persistencia y el calendario.

---

## 5. Resumen: qué se envía por cada formulario (para el Agente 07)

| Formulario | Campos visibles | Campos implícitos (contexto) | `tipo` de lead |
|---|---|---|---|
| Contacto `C-04` | nombre, tel, email, mensaje | `agente_id`, `propiedad_id`, `origen`, `canal` | `contacto` |
| Vender (sellers) | nombre, tel, email, operacion, tipo, zona, descripcion | `origen=vender`, `canal` | `vender` |
| Newsletter | email | `origen`, `canal` | `newsletter` |
| Reserva de visita | fecha, hora, nombre, tel, email | `propiedad_id`, `agente_id`, `origen=detalle`, `canal` | `visita` |

---

*Relacionado: [`leads.md`](./leads.md) (modelo de datos), [`whatsapp.md`](./whatsapp.md) (canal alternativo), [`ctas.md`](./ctas.md) (botones). Decisiones: `DMK-05`, `DMK-06`, `DMK-07`, `DMK-08` en `historial-prompts/decisiones.md`.*
