# Contacto con el Agente — mockup-inmobiliaria

> Define **cómo se contacta a un agente**: **WhatsApp** (`C-13`) con **mensaje pre-cargado** que incluye el agente y/o la propiedad, y el **formulario** (`C-04`) con campos mínimos. Aterriza `DUX-D29` (WhatsApp canal principal) y `DUX-D30` (formulario mínimo).
> Contenido basado en [`modelo-datos.md`](./modelo-datos.md) (campo `whatsapp`) y [`docs/propiedades/detalle.md`](../propiedades/detalle.md) §8.

## 1. Principios de contacto

1. **WhatsApp primero** — es el canal de mayor conversión; siempre con mensaje pre-cargado (menos fricción).
2. **Un CTA primario por contexto** (DUX-D26): WhatsApp como primario; formulario como secundario.
3. **Mínima fricción** — el mensaje pre-cargado evita que el usuario escriba; el formulario pide lo mínimo.
4. **Contexto siempre presente** — el mensaje de WhatsApp y el asunto del formulario mencionan **el agente y/o la propiedad** de la que hablan. Sin contexto, el lead pierde calidad.
5. **No obligar a elegir** — tanto WhatsApp como formulario están disponibles; el usuario elige su canal cómodo.

## 2. Canales

| Canal | Componente | Cuándo se usa | Acción |
|---|---|---|---|
| **WhatsApp** | `C-13` | Contacto directo, alta intención | `wa.me/{whatsapp}?text={mensaje}` |
| **Formulario** | `C-04` | Contacto formal, consulta larga, o cuando no quiere WhatsApp | Enviar lead |
| **E-mail directo** | — | Respuesta corporativa | `mailto:{email}` |

- **Número de WhatsApp** (`whatsapp`) y **e-mail** (`email`) del agente vienen del modelo de datos.
- El **WhatsApp general** de la inmobiliaria (header/footer/flotante) es un número institucional; el de **cada agente** es el `whatsapp` de su fila. (El número institucional lo configura el Agente 07/backend.)

## 3. WhatsApp con mensaje pre-cargado

> Se usa el formato estándar `https://wa.me/{whatsapp}?text={mensaje}` con `{mensaje}` **URL-encoded**.

### 3.1 Plantilla por contexto

| Contexto | Mensaje pre-cargado (ejemplo) |
|---|---|
| **Desde `P-05` (perfil del agente)** | `Hola {nombre}, te escribo por el sitio. Me interesa consultarte sobre las propiedades que tenés. ¿Me ayudás?` |
| **Desde `P-03` (detalle de propiedad, con la tarjeta del agente)** | `Hola {nombre}, vi la propiedad "{titulo}" ({codigo}) en {zona}. ¿Podés contarme más?` |
| **Desde `P-04` (grid de agentes, CTA WhatsApp)** | `Hola {nombre}, te vi en el sitio y quiero consultarte por una propiedad.` |
| **Desde `C-02` (tarjeta en Home)** | `Hola {nombre}, quería consultarte por las propiedades que manejás.` |
| **WhatsApp general (inmobiliaria)** | `Hola, quiero hacer una consulta sobre propiedades.` |

### 3.2 Reglas

- **Siempre incluir el nombre del agente** en el mensaje (personaliza el primer contacto).
- **Si hay propiedad asociada** (contexto `P-03`), incluir `titulo`, `codigo` y `zona` → el agente sabe de qué hablan desde el primer mensaje.
- El **mensaje lo genera el Frontend** con los datos del agente/propiedad en el momento del clic (no es un texto estático).
- **URL-encode** de espacios y tildes (ej. `Consultá` → `Consult%C3%A1`). El Agente 03 lo resuelve con `encodeURIComponent`.
- **Accesible:** el botón tiene `aria-label` descriptivo (ej. "Consultar por WhatsApp a {nombre}").

## 4. Formulario de contacto (`C-04`)

> Hereda `DUX-D30` (máximo 4 campos, validación inline, success claro). El Agente 06 (Marketing) puede profundizar la conversión.

### 4.1 Campos mínimos

| Campo | Tipo | Requerido | Validación |
|---|---|---|---|
| Nombre | texto | ✅ | No vacío. |
| Teléfono / WhatsApp | tel | ✅ | Formato válido (ej. `+54 9 11 ...`). |
| E-mail | email | ⬜ (recomendado) | Formato de e-mail si se completa. |
| Mensaje / interés | textarea | ✅ | No vacío; puede pre-cargarse. |

- **Botón:** "Enviar consulta" (primario).
- **Asunto implícito:** el formulario siempre sabe **a qué agente** va dirigido (campo oculto `agente_id` o en el asunto) y, si viene de `P-03`, **a qué propiedad** (`propiedad_id` / `titulo`). Esto se envía al backend (Agente 07) para asignar el lead al agente correcto.

### 4.2 Mensaje pre-cargado (opcional)

Al entrar desde `P-05`, el campo **Mensaje** se puede pre-cargar con:
- "Quiero consultarte sobre las propiedades que tenés." (contexto agente)
- O vacío, dejando que el usuario escriba. Se recomienda **pre-cargar el asunto** como placeholder, no el mensaje completo, para no frustrar.

### 4.3 Estados

| Estado | Comportamiento |
|---|---|
| **default** | Campos en blanco (o con asunto pre-cargado). |
| **focus** | Outline `--accent-400` (accesibilidad). |
| **empty / error** | Validación inline en español, junto al campo. |
| **submitting** | Spinner / deshabilitado. |
| **success** | "¡Recibimos tu consulta! Te contactamos a la brevedad." + CTA "Seguir explorando". |

### 4.4 Destino del lead

- En el mockup, el formulario **no persiste** (es simulado). El Agente 03 puede mostrar el estado success.
- En producción (Agente 07/backend), el lead se guarda en una tabla `leads` (futura) con: `nombre`, `telefono`, `email`, `mensaje`, `agente_id`, `propiedad_id`, `origen` (P-03/P-05/P-06), `creado_en`. Lo define el Agente 06/07.

## 5. Dónde aparece el contacto del agente

| Ubicación | Canal |
|---|---|
| `P-03` (tarjeta del agente, columna sticky) | WhatsApp + "Contactar" |
| `P-05` (header de perfil) | WhatsApp + "Contactar" |
| `P-05` (CTA final) | WhatsApp |
| `P-04` (tarjetas `C-02`) | WhatsApp (icono) + "Ver perfil" |
| `P-01` (tarjetas destacadas) | WhatsApp |
| Footer / flotante | WhatsApp **general** (institucional) |

---

*Relacionado: [`modelo-datos.md`](./modelo-datos.md) (campos `whatsapp`/`email`), [`perfil.md`](./perfil.md) (`P-05`), [`docs/propiedades/detalle.md`](../propiedades/detalle.md) §8. Decisiones: `DUX-D29`, `DUX-D30`, `DAG-*`.*
