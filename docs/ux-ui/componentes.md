# Inventario de componentes — mockup-inmobiliaria

> Registro de los **bloques reutilizables** que construirá el Agente 03 (Frontend). Cada componente tiene: **ID, propósito, contenido, ubicación y estados**.
> Convención de IDs: `C-NN`.

---

## Sección A — Componentes de navegación y estructura

### C-05 — Header
- **Propósito:** navegación global + acceso a la acción principal (CTA). Siempre visible (DUX-D20).
- **Contenido:** logo (izquierda) · nav (centro): Inicio, Propiedades, Agentes, Nosotros, Contacto · CTA (derecha): "Vender mi propiedad" o "Consultar".
- **Ubicación:** todas las páginas.
- **Estados:** default · scrolled (compacto/persistente) · **mobile** (logo + hamburguesa; nav/CTA pasan al drawer `C-14`).
- **Accesibilidad:** hamburguesa con `aria-expanded`; nav usable con teclado.

### C-06 — Footer
- **Propósito:** navegación secundaria, contacto y conversión de re-contacto. Unificado (DUX-D21).
- **Contenido:** columna 1: mirada de marca (logo + tagline + redes sociales) · columna 2: links de navegación · columna 3: datos de contacto (teléfono, e-mail, dirección, horarios) · columna 4: **newsletter** (captura de e-mail `C-15`) + **botón WhatsApp** (`C-13`).
- **Ubicación:** todas las páginas.
- **Estados:** default · focus de inputs · **mobile** (apilado en 1 columna).
- **Colores:** fondo neutro oscuro para destacar frente al contenido.

### C-07 — Breadcrumb
- **Propósito:** orientar al usuario sobre dónde está.
- **Contenido:** `Inicio > Propiedades > {nombre}`.
- **Ubicación:** P-02, P-03, P-04, P-05, P-07 (interiores).
- **Estados:** hover en links · item actual (no clicable, sin underline).

### C-14 — Drawer / Menú móvil
- **Propósito:** desplegar navegación y filtros en pantallas chicas.
- **Contenido (nav):** mismos ítems de `C-05` + CTA. (Filtros): panel de `C-03`.
- **Ubicación:** mobile en header y en P-02.
- **Estados:** cerrado · abierto · **transition (desliza)**.

---

## Sección B — Componentes de propiedades

### C-01 — Tarjeta de Propiedad
- **Propósito:** resumir una propiedad y llevarla al detalle (P-03).
- **Contenido:**
  - Imagen principal (con badge de operación `C-08` superpuesto).
  - **Precio** (énfasis, siempre visible — DUX-D27).
  - **Zona / ubicación** + tipo (venta/alquiler) + métricas (ambientes, dormitorios, baños, m²).
  - CTA secundario "Ver detalles".
- **Ubicación:** P-01 (destacadas), P-02 (grid), P-03 (similares).
- **Estados:** default · hover (levanta imagen / muestra CTA) · **skeleton** loading · **video/360°** (opcional, future).

### C-08 — Badge / Etiqueta de estado
- **Propósito:** comunicar de un vistazo la operación o característica especial.
- **Contenido:** `VENTA`, `ALQUILER`, `NUEVO`, `EXCLUSIVO`, `OPORTUNIDAD`.
- **Ubicación:** sobre la imagen de `C-01` y en `C-03` (P-03).
- **Estados:** por color semántico (verde/succeso, ámbar/destacado, neutro/neutro).

### C-09 — Paginación
- **Propósito:** navegar entre resultados.
- **Contenido:** `‹ · 1 2 3 … · ›` + contador ("Mostrando 1–9 de 128").
- **Ubicación:** P-02 (y futuras listas).
- **Estados:** página activa (mayor énfasis) · disabled en extremos · skeleton.

### C-15 — Mini-buscador de Home (dentro del Hero)
- **Propósito:** captar la intención inicial con un formulario mínimo.
- **Contenido:** Zona/Ciudad · Tipo (venta/alquiler) · Precio max · Botón "Buscar".
- **Ubicación:** P-01 hero.
- **Estados:** default · focus · empty · error (validación).

---

## Sección C — Búsqueda y filtros

### C-03 — Barra de búsqueda / Filtros
- **Propósito:** filtrar el catálogo. El componente con más impacto en P-02.
- **Contenido:**
  - **Búsqueda textual** (zona, barrio, referencia).
  - **Filtros:** Operación (venta/alquiler) · Tipo (casa, departamento, local, terreno) · Zona/Ciudad · **Precio (rango min/max)** · **Ambientes / Dormitorios** · **m²**.
  - Botón **"Aplicar"** + botón **"Limpiar"**.
- **Ubicación:** P-02 (sidebar/drawer) y como mini en P-01.
- **Estados:** default · focus · seleccionado · **empty** (0 resultados → muestra titular "No encontramos propiedades con esos filtros" + botón limpiar) · **loading** (spinner) · error.
- **UX clave:** los filtros aplicados se muestran como **chips removibles** (`C-08`) acumulados arriba de los resultados (feedback claro).

### C-10 — Acordeón (FAQ)
- **Propósito:** agrupar preguntas frecuentes sin abrumar.
- **Contenido:** lista de ítems (pregunta → respuesta plegable).
- **Ubicación:** P-06 (sección FAQ), P-07.
- **Estados:** collapsed · expanded · hover.

---

## Sección D — Agentes

### C-02 — Tarjeta de Agente
- **Propósito:** presentar a un asesor para generar confianza.
- **Contenido:** foto · nombre · cargo/especialidad · idiomas (opcional) · **botón "Contactar"** / icono WhatsApp → P-05 o acción directa.
- **Ubicación:** P-01 (destacados), P-04 (grid), P-03 (sidebar agente), P-05 (perfil extendido).
- **Estados:** default · hover (sombra) · skeleton.

### C-16 — Perfil de Agente (versión extendida de C-02)
- **Propósito:** profundizar confianza; publicar su cartera.
- **Contenido:** foto grande · bio · especialidad · idiomas · **estadísticas** (años, operaciones cerradas) · **CTA WhatsApp + formulario** (`C-04`) · lista de **propiedades** (grid de `C-01`).
- **Ubicación:** P-05.
- **Estados:** default · loading.

---

## Sección E — Conversión y contacto

### C-04 — Formulario de Contacto
- **Propósito:** capturar un lead con **mínima fricción**.
- **Contenido (campos mínimos):**
  - Nombre (obligatorio).
  - Teléfono / WhatsApp (obligatorio).
  - E-mail (opcional, aún recomendado).
  - Mensaje / interés (por p.ej. propiedad o tipo de consulta).
  - **Botón "Enviar consulta"**.
- **Ubicación:** P-06, P-03 (panel lateral), P-05.
- **Estados:** default · focus · validación (`empty` con error, `error` de envío) · **submitting/loading** · **success** (mensaje de confirmación + CTA seguir explorando).
- **UX clave:** máximo **4 campos** en el mockup; validación inline y mensajes claros. (El Agente 06 profundizará la conversión.)

### C-13 — Botón / Widget de WhatsApp
- **Propósito:** canal de conversación directo y de alta conversión.
- **Contenido:** icono + texto ("Consultá por WhatsApp") → `wa.me/` con mensaje pre-cargado.
- **Ubicación:** header C-05, CTA fijo en P-03, footer C-06, P-06, P-05, y **flotante** en mobile.
- **Estados:** default · hover · active · **disabled** (modalidad de proceso).

### C-17 — CTA / Botón (genérico)
- **Propósito:** acción que avanza el flujo. Tiene **variante primario/secundario/terciario**.
- **Contenido:** texto de acción (verbo) + icono opcional.
- **Ubicación:** toda vista con conversión.
- **Estados:** default · hover (elevación/sombra) · active (press) · focus (>outline visible) · **disabled** · **loading** (spinner).
- **Primario:** el color de mayor contraste. **Secundario:** outline/claro. **Terciario:** es solo un link.

### C-18 — Modal / Popup
- **Propósito:** conversión puntual sin perder la página (contacto rápido, reserva de visita, newsletter).
- **Contenido:** título · breve texto · mini-formulario (`C-04`) · CTA.
- **Ubicación:** P-03 (reserva de visita), P-01 (newsletter/CTA), P-06.
- **Estados:** abierto · cerrado · **focus/score** para accesibilidad · **sobre-fondo (overlay)** · **closable (X / tecla ESC)**.

---

## Sección F — Contenido y presentación

### C-11 — Galería / Slider de imágenes
- **Propósito:** mostrar el inmueble de forma atractiva y completa.
- **Contenido:** imagen grande con navegación (flechas, miniaturas, contador "1/8", paginación de puntos).
- **Ubicación:** P-03 (principal) y P-01 (destacados opcional).
- **Estados:** default · hover (flechas) · **captcha de 360°/vídeo** (future) · **loading** (lazy img con placeholder).

### C-12 — Carrusel de Testimonios
- **Propósito:** prueba social para generar confianza y reducir indecisión.
- **Contenido:** 1 testimonio visible (o 3 en desktop) con valoración (stars), cita, foto/avatar, nombre + rol.
- **Ubicación:** P-01, P-07.
- **Estados:** default · **dots/arrows** · **autoplay** (con pausa en hover) · **accesible**.

### C-19 — Factor de confianza / Stat
- **Propósito:** comunicar números (autoridad, experiencia).
- **Contenido:** número grande + label ("+1.200 propiedades vendidas", "15 años de experiencia", "98% clientes satisfechos").
- **Ubicación:** P-01 (estadísticas), P-03, P-07.
- **Estados:** default · **contador animado** (opcional al llegar a viewport).

### C-20 — Iconografía / iconos (conjunto)
- **Propósito:** reforzar lectura; usados en beneficios, amenidades, servicios.
- **Contenido:** iconos de: ubicación pin, cama, baño, m², llave, WhatsApp, teléfono, e-mail, estrella, documento.
- **Ubicación:** tarjetas `C-01`, `C-02`, beneficios, footer.
- **Estados:** default · hover · tamaño por contexto.

---

## Sección G — Estados transversales de componentes

Todos los componentes siguen esta matriz de estados (donde aplique):

| Estado | Descripción |
|--------|-------------|
| **default** | Estado base. |
| **hover** | Cambio sutil (sombra, elevación, cambio de color del enlace). |
| **focus** | Outline visible (accesibilidad/teclado). |
| **active** | Feedback al hacer clic (presión). |
| **disabled** | No disponible (color apagado, cursor bloqueado). |
| **loading** | Skeleton o spinner mientras llega data (mockup usa data local). |
| **empty** | Sin resultados (mensaje claro + acción de reparación). |
| **error** | Mensaje de validación/error con estilo semántico. |

### DUX-D28 — Estados de loading/vacío/error
Nunca mostrar una pantalla en blanco. **Empty** → mensaje amigable + botón "Limpiar filtros"/"Volver". **Loading** → skeletons que respeten el layout. **Error** → mensaje claro + re-intento.

---

## Sección H — Categorías, Servicios y Favoritos (ampliación Home / P-08 / P-09)

### C-21 — Tiles de Categorías (Home)
- **Propósito:** acceso rápido por tipo de propiedad; pre-carga el filtro en P-02.
- **Contenido:** grid de tiles (Departamentos, Casas, PH, Locales, Terrenos) con icono + nombre + contador opcional.
- **Ubicación:** P-01 (sección 5).
- **Estados:** default · hover (elevación) · active (al hacer clic → P-02 con `?tipo=`).
- **Responsive:** 5 tiles → 3/2 columnas en tablet, 2 columnas o carrusel horizontal en mobile.

### C-22 — Toggle / Tarjeta de Favorito
- **Propósito:** guardar/desguardar una propiedad; reflejar el estado en tarjeta y en P-09.
- **Contenido:** icono corazón (relleno = guardado, contorno = no guardado) + contador opcional en el header.
- **Ubicación:** sobre `C-01` (tarjeta de propiedad), en P-01, P-02, P-03 y P-09.
- **Estados:** default · hover · activo (guardado) · **loading** (persistencia) · **error** (si falla la persistencia).
- **Persistencia (mockup):** `localStorage` (lista de `slug`/id) → se conecta a sesión real con backend (Fase 3+).

### C-23 — Tarjeta de Servicio
- **Propósito:** comunicar un servicio de la inmobiliaria y derivar a contacto.
- **Contenido:** icono + título + descripción breve + CTA secundario "Consultar" / WhatsApp (`C-13`).
- **Ubicación:** P-08 (grid).
- **Estados:** default · hover · skeleton.
- **Responsive:** 3 columnas desktop, 2 tablet, 1 mobile.

### C-24 — "Encontrá tu próximo hogar" (banda dual)
- **Propósito:** empujar al usuario indeciso hacia la acción (buscar/comprar) y captar sellers (vender).
- **Contenido:** imagen/fondo + título + breve copy + **2 CTAs**: primario "Empezá tu búsqueda" (→ P-02) y secundario "Quiero vender mi propiedad" (→ P-06 / vender). Opcional: mini-buscador `C-15`.
- **Ubicación:** P-01 (sección 7).
- **Estados:** default · hover en CTAs.
- **Responsive:** 2 columnas en desktop (copy + CTAs / imagen); apilado en mobile.

---

## Resumen de componentes por página (para el Agente 03)

| Página | Componentes |
|--------|-------------|
| P-01 Home | C-05, C-15, C-01, C-08, C-21, C-24, C-19, C-12, C-02, C-06, C-13, C-22 |
| P-02 Propiedades | C-05, C-03, C-01, C-08, C-09, C-14, C-06, C-13, C-22 |
| P-03 Detalle | C-05, C-11, C-01, C-02, C-04, C-08, C-18, C-06, C-13, C-17 (sticky), C-22 |
| P-04 Agentes | C-05, C-02, C-06, C-13 |
| P-05 Perfil | C-05, C-16, C-04, C-01, C-13, C-06 |
| P-06 Contacto | C-05, C-04, C-07, C-10, C-06, C-13 |
| P-07 Nosotros | C-05, C-19, C-12, C-02, C-04 (CTA), C-06, C-13 |
| P-08 Servicios | C-05, C-07, C-23, C-17 (CTA), C-13, C-06 |
| P-09 Favoritos | C-05, C-07, C-01, C-08, C-22, C-17 (CTA), C-06, C-13 |

> **Próximo paso:** Agente 02 — Branding para paleta, tipografía y estilo visual (aterriza la "calidad visual/modernidad").
