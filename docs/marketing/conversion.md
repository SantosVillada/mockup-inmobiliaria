# Técnicas de conversión — mockup-inmobiliaria

> Estrategia de **conversión**: técnicas de **confianza**, **urgencia/escasez**, **prueba social** y **copy de CTAs**. Aterrizan el tono rioplatense de Branding (`DBR-06`) y refuerzan el embudo ([`embudo.md`](./embudo.md)).
> Son **decisiones de contenido y estructura**, no de código.

---

## 1. Principio rector

El usuario no compra una propiedad; compra **tranquilidad**. La marca transmite **confianza, profesionalismo, exclusividad y cercanía** (`concepto.md` §1). Toda técnica de conversión debe reforzar **"acá te resuelven el tema, sin vueltas"**.

---

## 2. Técnicas de confianza (trust)

| Técnica | Qué se muestra | Dónde | Regla |
|---|---|---|---|
| **Stats / números** | `C-19`: "+1.200 propiedades vendidas", "15 años de experiencia", "98% clientes satisfechos". | Home, P-03, P-07, P-05. | Números **concretos**; nunca inventados ni superlativos vacíos. |
| **Agentes con cara** | Fotos reales 3:4, nombre, cargo, especialidad. | P-04, P-05, P-03, Home. | El usuario trata con **una persona**, no con una web (`concepto.md` §2). |
| **Testimonios** | Carrusel `C-12` con cita + nombre + rol + estrellas. | Home, P-07 (sección). | Testimonios **específicos** y creíbles; incluir dato concreto. |
| **Garantías / respaldo** | "Publicamos tu propiedad y la mostramos a nuestra cartera de compradores", "Acompañamiento hasta la firma". | Home, P-07, landing sellers. | Transparencia sobre el proceso; sin letra chica. |
| **Certificaciones / afiliaciones** | Matrícula, afiliación a cámaras inmobiliarias. | P-07 (Nosotros). | Respaldan profesionalismo. |
| **Transparencia de precio** | Precio y operación siempre visibles (`DUX-D27`); sin sorpresas. | P-02, P-03. | Reduce fricción y desconfianza. |
| **Ficha técnica completa** | Datos claros (m², ambientes, antigüedad, expensas). | P-03. | El comprador quiere saber todo antes de contactar. |

### Copy de confianza (rioplatense)
- "Asesores reales. Sin vueltas."
- "Te acompañamos de punta a punta."
- "+1.200 propiedades vendidas. 15 años de experiencia."
- "Cada propiedad tiene un asesor que la conoce de memoria."

---

## 3. Urgencia y escasez

> **Usar con cuidado y siempre con veracidad.** No inventar disponibilidad; la escasez debe ser real (o claramente un atributo de marketing del listado).

| Técnica | Elemento | Ejemplo | Regla |
|---|---|---|---|
| **Badge "NUEVO"** | `estado = nuevo` (`C-08`) | "NUEVO — recién publicada." | Solo si `publicado_en` es reciente / obra nueva. |
| **Badge "OPORTUNIDAD"** | `estado = oportunidad` | "OPORTUNIDAD — precio destacado." | Precio por debajo del mercado / buena oportunidad. |
| **Badge "EXCLUSIVO"** | `estado = exclusivo` | "EXCLUSIVO — gestión de MORADA." | Listado exclusivo de la inmobiliaria. |
| **Disponibilidad** | `disponible` / contador | "Solo X disponibles en {zona}." | Real; si se muestra, reflejar el inventario real. |
| **Cantidad de visitas/consultas** | contador | "Ya lo consultaron X veces." | Refuerza interés (prueba social + escasez). |

### Reglas de urgencia
1. **Nunca** inventar escasez (genera desconfianza si se descubre).
2. El badge **"OPORTUNIDAD"** comunica urgencia por **precio**, no por tiempo artificial.
3. "Solo X disponibles" se usa **solo en Home/P-02** con datos reales del inventario.
4. **No** usar countdowns falsos ni "últimas X horas" (contraproducente para una marca seria).

---

## 4. Prueba social

| Elemento | Dónde | Cómo |
|---|---|---|
| **Testimonios** (`C-12`) | Home, P-07 | Cita real + nombre + rol + estrellas. |
| **Números de clientes** | Home (stats) | "1.200 familias", "98% satisfechos". |
| **Propiedades vendidas / en gestión** | P-02 | Contador de resultados ("Mostrando X de Y"). |
| **Valor transaccionado** | P-07, P-05 | "+$5.000M en operaciones." |
| **Recomendación de zona** | P-03 | "En {zona} somos referentes." (si es cierto). |

> **Regla:** la prueba social debe ser **específica y verificable** en la medida de lo posible. Evitar "la mejor del mercado" sin dato.

---

## 5. Copy de CTAs (banco, rioplatense — verbo primero)

### Buyers / renters
| Contexto | CTA |
|---|---|
| Home (hero) | "Ver propiedades" |
| Home (CTA final) | "Encontrá tu morada" |
| Listado | "Ver detalles" |
| Detalle (primario) | "Consultá por WhatsApp" |
| Detalle (secundario) | "Agendar visita" |
| Detalle (terciario) | "Pedir más fotos" |
| Contacto | "Enviar consulta" |
| Newsletter | "Suscribirme" |

### Sellers
| Contexto | CTA |
|---|---|
| Header | "Vender mi propiedad" |
| Landing | "Vendé tu propiedad" |
| Landing (secundario) | "Consultá por WhatsApp" |
| Formulario | "Publicar mi propiedad" |

### Microcopy de apoyo (junto a CTAs)
- **Hero:** "Encontrá tu morada. Te acompañamos de punta a punta."
- **Buscador:** "¿Qué estás buscando?"
- **Newsletter:** "Recibí las nuevas propiedades antes que nadie."
- **WhatsApp:** "¿Hablamos?"
- **Garantía (sellers):** "Publicamos tu propiedad y la mostramos a nuestra cartera. Sin vueltas."
- **Empty (búsqueda):** "No encontramos propiedades con esos filtros. Probá ampliando la búsqueda."

---

## 6. Estructura de una sección de conversión (plantilla)

Para que una sección convierta, seguir este orden (aterriza el ritmo del Home en `layout.md` §5):

```
1. Titular de impacto (qué logra el usuario)     ← captar
2. Subtítulo breve (beneficio concreto)           ← explicar
3. Prueba de confianza (stat / testimonio / dato) ← confiar
4. CTA primario (verbo primero)                   ← convertir
5. (opcional) CTA secundario (alternativa)        ← no competir
```

---

## 7. Anti-patrones (evitar)

1. **Dos CTA primarios** en la misma vista (`DUX-D26`).
2. **Superlativos vacíos** ("excelente", "increíble") sin dato que respalde.
3. **Urgencia falsa** (countdowns, "solo hoy").
4. **Formularios largos** (más de 4 campos de contacto).
5. **Pedir datos sensibles** (DNI, documentos) antes de la conversión.
6. **Jerga corporativa fría** (alejada del tono rioplatense `DBR-06`).

---

*Relacionado: [`embudo.md`](./embudo.md) (etapas), [`ctas.md`](./ctas.md) (inventario), [`vender-propiedad.md`](./vender-propiedad.md) (sellers). Decisiones: `DMK-11` en `historial-prompts/decisiones.md`.*
