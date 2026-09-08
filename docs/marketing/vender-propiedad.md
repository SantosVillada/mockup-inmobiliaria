# Landing / sección "Vender mi propiedad" — mockup-inmobiliaria

> Define el **flujo para sellers** (propietarios que quieren **vender o alquilar** su propiedad): si conviene una **landing dedicada**, su **estructura** y sus **CTAs**. Aterriza `DMK-06` y `DMK-12`.

---

## 1. ¿Conviene una landing dedicada? — SÍ

**Motivo:**
1. **Público distinto:** el seller no busca comprar; busca **publicar** y que la inmobiliaria haga el trabajo. Un mensaje específico convierte mucho más que "ver propiedades".
2. **Mensaje propio:** "Vendé/alquilá tu propiedad sin vueltas" no encaja en la Home (que apunta a compradores).
3. **Captación de leads de mayor valor:** cada propiedad que ingresa es un **cliente potencial de venta**, un lead de mayor ticket que un comprador.
4. **CTA natural:** el seller quiere resolver rápido → **WhatsApp** es el canal ideal.
5. **Costo bajo:** es una **sección/página** simple, sin base de datos nueva (usa el formulario seller + WhatsApp).

### 3 opciones de implementación (recomendación)

| Opción | Qué es | Recomendación |
|---|---|---|
| **A. Landing dedicada** | Página `/vender` propia con estructura completa. | **Recomendada.** Mejor SEO, mensaje claro, link desde header y Home. |
| **B. Sección en Home** | Bloque "¿Tenés una propiedad?" al final de Home. | Como **refuerzo** (link a la landing). |
| **C. Sección en Contacto** | Bloque dentro de P-06. | Menos enfocado; se prefiere A. |

> **Decisión (`DMK-12`):** usar **Opción A** (landing `/vender`) como página/section principal de sellers, con un **bloque de refuerzo en Home** (Opción B) que enlaza a ella.

---

## 2. Estructura de la landing (orden de bloques)

```
1. HERO / banda superior
   - Título: "Vendé o alquilá tu propiedad, sin vueltas."
   - Subtítulo: "Publicamos tu propiedad, la mostramos a nuestra cartera y te acompañamos hasta la firma."
   - CTA primario: "Vendé tu propiedad" (WhatsApp) · CTA secundario: "Dejá tus datos" (formulario)

2. POR QUÉ ELEGIRNOS (3–4 beneficios con icono)
   - "Lo publicamos y lo difundimos" (alcance de la cartera)
   - "Valoramos tu propiedad" (tasación seria)
   - "Negociamos por vos" (acompañamiento hasta el cierre)
   - "Transparencia total" (comisión y condiciones claras)

3. PROPIEDADES QUE MANEJAMOS / CARTERA (mini grid de C-01 destacadas)
   - Demuestra que la inmobiliaria tiene operaciones reales → confianza.

4. PRUEBA SOCIAL / STATS (C-19)
   - "+1.200 propiedades vendidas" · "15 años de experiencia" · "98% clientes satisfechos".

5. TESTIMONIO DE UN VENDEDOR (C-12)
   - Cita de un propietario que vendió con MORADA (nombre + zona).

6. CÓMO FUNCIONA (3–4 pasos simples)
   1. Contanos de tu propiedad → 2. Tasamos y te asesoramos → 3. Publicamos y difundimos → 4. Cerramos la venta/alquiler contigo.

7. FORMULARIO "VENDER MI PROPIEDAD" (ver formularios.md §2)
   - Datos del propietario + datos de la propiedad.
   - Botón primario: "Publicar mi propiedad" · Secundario: "Consultá por WhatsApp".

8. FAQ (acordeón C-10, opcional)
   - "¿Cuánto cuesta?", "¿Cuánto tarda?", "¿Qué comisión manejan?"

9. CTA FINAL + newsletter
   - "Vendé tu propiedad hoy" → WhatsApp.
```

---

## 3. CTAs de la landing

| CTA | Variante | Ubicación | Destino | Nota |
|---|---|---|---|---|
| **Vendé tu propiedad** | **Primario** | Hero / CTA final | `wa.me/{institucional}?text={mensaje seller}` | Mensaje pre-cargado "Hola, quiero vender/alquilar mi propiedad..." |
| **Dejá tus datos** | Secundario | Hero / sección formulario | Ancla al formulario seller | |
| **Publicar mi propiedad** | Secundario | Formulario seller | Captura lead | Botón del form. |
| **Consultá por WhatsApp** | Secundario | Formulario (alternativa) | `wa.me/{institucional}?text=...` | El usuario elige canal. |
| **Ver propiedades** | Terciario | Footer / cierre | `/propiedades` | Si también busca comprar. |

> **Regla `DUX-D26`:** en la landing el **CTA primario es "Vendé tu propiedad"** (WhatsApp). El formulario y "ver propiedades" son secundarios/terciarios.

---

## 4. Mensaje de WhatsApp para sellers (pre-cargado)

**Institucional:**
```
Hola, quiero vender/alquilar mi propiedad. ¿Me asesoran?
```

**Si el seller viene de un agente (desde P-05 / contacto de agente):**
```
Hola {nombre}, quiero publicar mi propiedad en {zona}. ¿Cómo lo hacemos?
```

---

## 5. Relación con el resto del sitio

| Origen | Destino | Cómo |
|---|---|---|
| **Header** `C-05` | `/vender` (landing) | CTA "Vender mi propiedad" (primario). |
| **Home** `P-01` | `/vender` | Bloque de refuerzo + CTA en hero (secundario). |
| **Footer** `C-06` | `/vender` | Link en columna de navegación. |
| **Contacto** `P-06` | `/vender` | Link/CTA si el usuario quiere vender. |
| **Perfil de agente** `P-05` | `/vender` (o WhatsApp del agente) | CTA "Quiero vender mi propiedad" si el agente es especialista. |

---

## 6. Datos que genera (para el Agente 07)

- **Lead `tipo = vender`** (ver [`leads.md`](./leads.md)).
- Campos: nombre, telefono, email, `operacion_interes`, `tipo_propiedad`, `zona_interes`, `mensaje`, `origen = vender`, `canal = whatsapp` o `formulario`.

---

*Relacionado: [`formularios.md`](./formularios.md) §2 (form seller), [`whatsapp.md`](./whatsapp.md) (mensajes), [`embudo.md`](./embudo.md) (recorrido seller), [`ctas.md`](./ctas.md) (inventario). Decisiones: `DMK-06`, `DMK-12` en `historial-prompts/decisiones.md`.*
