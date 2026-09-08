# Perfil de Agente (`P-05` / `C-16`) — mockup-inmobiliaria

> Estructura completa de la página de perfil: **header** (foto, nombre, cargo), **bio**, **especialidades**, **idiomas**, **estadísticas** (`C-19`), **CTAs** (WhatsApp `C-13` + formulario `C-04`), **propiedades del agente** (grid `C-01`).
> Contenido basado en [`modelo-datos.md`](./modelo-datos.md). Complementa a [`docs/ux-ui/sitemap.md`](../ux-ui/sitemap.md) (P-05) y [`docs/ux-ui/componentes.md`](../ux-ui/componentes.md) (`C-16`).

## 1. Propósito

**Profundizar la confianza** en un asesor y llevarlo a la acción: **contactar por WhatsApp o formulario**, y **ver las propiedades que maneja**. Es la página que convierte "la inmobiliaria" en "una persona que me va a acompañar".

**Ruta:** `/agentes/:slug` (slug canónico, ver [`modelo-datos.md`](./modelo-datos.md) §1).

## 2. Estructura (orden de bloques)

```
1. Breadcrumb (C-07): Inicio > Agentes > {nombre}
2. HEADER DE PERFIL:
   - Foto (3:4, grande)
   - Nombre + cargo
   - Especialidades (chips C-08)
   - Idiomas (chips)
   - Zona de cobertura (chips)
   - CTAs: WhatsApp (C-13) · "Contactar" (abre C-04) · "Ver propiedades" (ancla)
3. ESTADÍSTICAS (C-19): años de experiencia, operaciones cerradas, propiedades vendidas, satisfacción
4. BIO (descripción)
5. ESPECIALIDADES + ZONAS (detalle)
6. PROPIEDADES DEL AGENTE (grid C-01)
7. CTA FINAL + formulario de contacto (C-04) [o en columna sticky en desktop]
8. (sticky en mobile) barra inferior de contacto
```

### 2.1 Header de perfil
- **Foto** grande (3:4, `object-fit: cover`, radio `16px`).
- **H1:** `nombre + apellido` (Sora 600).
- **Cargo** (`--neutral-600`): "Asesor senior".
- **Chips:** especialidades (2–3), idiomas, zona de cobertura.
- **CTAs:**
  - **Primario:** "Consultá por WhatsApp" (`C-13`, mensaje pre-cargado con el agente — ver [`contacto.md`](./contacto.md) §3).
  - **Secundario:** "Contactar" (abre el formulario `C-04`).
  - **Terciario:** "Ver sus propiedades" (ancla al grid).

### 2.2 Estadísticas (`C-19`)
- 3–4 stats grandes (ver [`modelo-datos.md`](./modelo-datos.md) §4):
  - `anios_experiencia` → "15 años de experiencia".
  - `estadisticas.operaciones_cerradas` → "+120 operaciones cerradas".
  - `estadisticas.propiedades_vendidas` → "+85 propiedades vendidas".
  - `estadisticas.satisfaccion` → "98% clientes satisfechos".
- Contador animado al llegar al viewport (opcional, C-19). Si un stat no existe, no se muestra (DUX-D28).

## 3. Bio (descripción)

- Texto de `bio`, 2–4 párrafos, en **español rioplatense** (ver `docs/branding/concepto.md` §5).
- Debe transmitir: experiencia, especialidad, trato cercano y resultados concretos. Evitar superlativos vacíos.
- Copy sugerido: "Te acompaño de punta a punta. Sin vueltas."

## 4. Especialidades y zonas de cobertura

- **Especialidades:** chips con `label` (ver [`modelo-datos.md`](./modelo-datos.md) §3).
- **Zonas de cobertura:** chips con `label` de zona (ver §7).
- Se muestran en el header y, si conviene, como bloque detallado ("Soy especialista en...", "Trabajo en...").

## 5. Propiedades del agente (grid `C-01`)

- **Título:** "Propiedades de {nombre}".
- **Grid de tarjetas `C-01`** (estándar). En `P-05`: 2 columnas (mobile) / 3 columnas (desktop), hasta 6 tarjetas.
- **Fuente:** `SELECT ... WHERE agente_id = :id AND disponible = true ORDER BY publicado_en DESC` (ver [`modelo-datos.md`](./modelo-datos.md) §9.2).
- **Botón "Ver todas"** → `P-02` con filtro por agente (`?agente={slug}` opcional) o `P-02` general.
- **Estado vacío (DUX-D28):** si no hay propiedades activas → "Este asesor aún no tiene propiedades publicadas" + CTA "Ver todas las propiedades" o "Consultá por WhatsApp". Nunca dejar la sección en blanco.

## 6. Contacto (WhatsApp + formulario)

- **WhatsApp (`C-13`):** botón primario que abre `wa.me/{whatsapp}?text={mensaje}` con mensaje pre-cargado que menciona al agente (ver [`contacto.md`](./contacto.md) §3).
- **Formulario (`C-04`):** campos mínimos (nombre, teléfono/WhatsApp, e-mail opcional, mensaje). El mensaje se puede **pre-cargar** con el asunto "Consulta para {nombre} {apellido}" (ver §3 de [`contacto.md`](./contacto.md)).
- **Layout:**
  - **Desktop (≥1024px):** los CTAs y el formulario viven en una **columna derecha sticky** (DUX-D25); el contenido (bio, propiedades) scrollea a la izquierda.
  - **Mobile (<1024px):** los CTAs se muestran como **barra fija inferior** (WhatsApp + Contactar) y el formulario va al final de la página.

## 7. Estados

| Estado | Comportamiento |
|---|---|
| **default** | Página completa. |
| **loading** | Skeletons de foto, bio, stats y grid de propiedades. |
| **empty / not-found** | Si el `slug` no existe → página "Agente no encontrado" + CTA "Ver todos los agentes". |
| **error** | Mensaje de error con botón "Reintentar" (backend real). |
| **inactivo** | Si `activo = false`, la página muestra el contenido solo si se accede por URL directa; no se enlaza desde listados. |

## 8. Copy sugerido (rioplatense)

- **Título sección:** "Conocé a tu asesor" / "¿Hablamos?".
- **Stats:** "+120 operaciones cerradas" · "15 años de experiencia".
- **CTA WhatsApp:** "Consultá por WhatsApp".
- **CTA Contactar:** "Contactar" / "Dejame tu consulta".
- **Propiedades:** "Propiedades de {nombre}".
- **Empty propiedades:** "Este asesor aún no tiene propiedades publicadas. Igual podés consultarle por WhatsApp."
- **Success formulario:** "¡Recibimos tu consulta! Te contactamos a la brevedad." (DBR-06).

---

*Relacionado: [`tarjeta.md`](./tarjeta.md) (`C-02`, punto de entrada), [`modelo-datos.md`](./modelo-datos.md) (campos), [`contacto.md`](./contacto.md) (WhatsApp/formulario). Decisiones: `DAG-*`.*
