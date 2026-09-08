# Estrategia de WhatsApp — mockup-inmobiliaria

> Estrategia del canal de **mayor conversión** (`C-13`): **dónde va**, el **número institucional** (placeholder), los **mensajes pre-cargados por contexto** y el **flotante (widget)**.
> Aterriza `DUX-D29` y `DMK-03`/`DMK-04`.

---

## 1. Por qué WhatsApp es el canal principal

1. **Máxima conversión** en inmobiliarias: el usuario ya usa WhatsApp, no hay que instalar nada ni crear cuenta.
2. **Mínima fricción:** con **mensaje pre-cargado** el visitante no escribe nada → solo aprieta "Enviar".
3. **Trato 1 a 1** (alineado a `concepto.md` §2): cada propiedad/agente tiene una persona real que responde.
4. **Contexto que califica el lead:** el mensaje pre-cargado ya dice **qué propiedad / qué agente / qué zona** → el asesor sabe de qué hablan desde el primer mensaje.
5. **Canal favorito de mobile** (mayoría de la audiencia es mobile — `DUX-D22`).

**Regla de oro:** WhatsApp es el **CTA primario** en las vistas de conversión (Detalle, Perfil, Contacto) y el **atajo** a Convertir desde cualquier etapa del embudo.

---

## 2. Número institucional (placeholder)

> **Placeholder configurable por el Agente 07 (backend).** El mockup lo usa tal cual para construir los enlaces `wa.me/`.

```text
Número institucional (general):  5491155550000
Formato wa.me:                    https://wa.me/5491155550000?text={mensaje}
Display:                          +54 9 11 5555 0000
```

- Se guarda como **constante/config** en el backend (tabla `config` o env var). No hardcodear en cada componente.
- El **WhatsApp de cada agente** es el campo `whatsapp` de su fila (`docs/agentes/modelo-datos.md` §1), ej. `5491155551001`.

| Tipo de número | Dónde se usa |
|---|---|
| **Institucional** `5491155550000` | Header, footer, **flotante mobile**, contacto general, sellers. |
| **Por agente** (campo `whatsapp`) | Tarjeta de agente `C-02`, detalle `P-03`, perfil `P-05`. |

---

## 3. Dónde va el WhatsApp (`C-13`)

| Ubicación | Componente | Número | Contexto | Cuándo |
|---|---|---|---|---|
| **Header** | `C-05` | Institucional | General | Todas las páginas (desktop; en mobile pasa al drawer `C-14`). |
| **Footer** | `C-06` | Institucional | General | Todas las páginas. |
| **Flotante mobile** | Widget (nuevo) | Institucional | General | **Solo mobile**, esquina inferior derecha. |
| **Detalle `P-03`** | Columna sticky / barra inferior | **Agente** de la propiedad | Por propiedad | Siempre visible (`DUX-D25/D33`). |
| **Tarjeta de agente `C-02`** | `C-02` | **Agente** | Por agente | Home, P-04, P-03, P-05. |
| **Perfil `P-05`** | `C-16` | **Agente** | Por agente | Header + CTA final. |
| **Contacto `P-06`** | `C-04`/sección | Institucional | General | Página de contacto. |
| **Sellers (landing)** | `#vender` | Institucional | Vender | Landing "Vender mi propiedad". |

---

## 4. Mensajes pre-cargados por contexto

> Formato: `https://wa.me/{whatsapp}?text={mensaje}`, con `{mensaje}` **URL-encoded** (`encodeURIComponent`).
> El **Frontend** arma el mensaje con los datos del agente/propiedad en el momento del clic (no es texto estático).

### 4.1 Plantillas base (rioplatense)

| Contexto | Número | Mensaje pre-cargado |
|---|---|---|
| **General (institucional)** | Institucional | `Hola, quiero hacer una consulta sobre propiedades.` |
| **General + vender** (sellers) | Institucional | `Hola, quiero vender/alquilar mi propiedad. ¿Me asesoran?` |
| **Por agente** (`P-05`, `P-04`, `C-02`) | Agente | `Hola {nombre}, te escribo por el sitio. ¿Podés ayudarme con una consulta?` |
| **Por propiedad** (`P-03`, sticky, tarjeta de agente) | Agente | `Hola {nombre}, vi la propiedad "{titulo}" ({codigo}) en {zona}. ¿Podés contarme más?` |
| **Sellers → agente** | Agente | `Hola {nombre}, quiero publicar mi propiedad en {zona}. ¿Cómo lo hacemos?` |

### 4.2 Variables a interpolar

| Variable | Origen |
|---|---|
| `{nombre}` | `agentes.nombre` |
| `{titulo}` | `propiedades.titulo` |
| `{codigo}` | `propiedades.codigo` (ej. `REF-MOR-001`) |
| `{zona}` | `propiedades.zona` (label) |
| `{whatsapp}` | `agentes.whatsapp` o número institucional |

### 4.3 Reglas

1. **Siempre incluir el nombre del agente** cuando el mensaje va a un agente (personaliza el contacto).
2. **Si hay propiedad asociada**, incluir `titulo` + `codigo` + `zona` → el asesor sabe de qué hablan.
3. **URL-encode** de espacios y tildes (ej. `Consultá` → `Consult%C3%A1`). Lo resuelve el Frontend con `encodeURIComponent`.
4. **Accesible:** `aria-label` descriptivo (ej. `"Consultar por WhatsApp a Sofía"`).
5. **No sobre-cargar el mensaje:** breve, con la info esencial del contexto.
6. **Párrafos / saltos de línea:** usar `%0A` para saltos; no es necesario en mensajes cortos.

### 4.4 Ejemplos resueltos

- **Por propiedad** (prop-001, agente Sofía):
  `Hola Sofía, vi la propiedad "Departamento 2 ambientes en Palermo Soho" (REF-MOR-001) en Palermo. ¿Podés contarme más?`
- **Por agente** (Martín, desde perfil):
  `Hola Martín, te escribo por el sitio. ¿Podés ayudarme con una consulta?`
- **Institucional** (flotante):
  `Hola, quiero hacer una consulta sobre propiedades.`

---

## 5. Flotante de WhatsApp (widget)

> Nuevo componente derivado de `C-13`. **Solo en mobile** (`<1024px`) y **en todas las páginas**, salvo que la vista ya tenga barra sticky de contacto en `P-03` (evitar dos flotantes encimados).

### 5.1 Comportamiento

- **Posición:** fijo, esquina **inferior derecha** (o izquierda si la barra sticky de `P-03` ocupa el lado de las acciones).
- **Tamaño:** botón circular ~56px con icono WhatsApp (`C-20`) y **etiqueta corta** "WhatsApp" (o solo icono).
- **Apertura:** clic → abre `wa.me/{institucional}?text={general}`.
- **Visibilidad:** aparece tras un pequeño scroll (~150px) para no tapar el hero; se oculta en `P-03` mobile para no competir con la barra sticky (`DUX-D25`).
- **Accesibilidad:** botón con `aria-label` "Consultá por WhatsApp"; foco visible; target ≥ 44px.

### 5.2 Cuándo mostrarlo

| Página | Mobile | Desktop |
|---|---|---|
| Home | ✅ flotante | ❌ (basta header) |
| Propiedades | ✅ flotante | ❌ |
| Detalle P-03 | ❌ (ya hay barra sticky) | ❌ (ya hay columna) |
| Agentes | ✅ flotante | ❌ |
| Perfil P-05 | ❌ (barra sticky) | ❌ |
| Contacto P-06 | ✅ flotante | ❌ |
| Nosotros | ✅ flotante | ❌ |

> **Regla anti-solapamiento:** nunca dos elementos de contacto flotantes a la vez. Donde hay barra sticky de contacto (`P-03`, `P-05` mobile), el flotante se oculta.

---

## 6. KPI / métricas de WhatsApp

| Métrica | Qué mide |
|---|---|
| **Clics en WhatsApp** | Nº de veces que se abre `wa.me/...`. |
| **Tasa de clic por ubicación** | Qué CTA de WhatsApp convierte más (sticky vs flotante vs tarjeta). |
| **Mensajes por contexto** | % de mensajes que llegan con propiedad/agente (lead calificado). |
| **Primera respuesta** | Tiempo del asesor en responder (medir con backend). |

---

*Relacionado: [`ctas.md`](./ctas.md) (dónde va cada CTA), [`formularios.md`](./formularios.md) (alternativa por form), [`leads.md`](./leads.md) (canal del lead). Decisiones: `DMK-03`, `DMK-04`, `DMK-13` en `historial-prompts/decisiones.md`.*
