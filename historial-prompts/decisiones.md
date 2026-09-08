# DECISIONES DEL PROYECTO — mockup-inmobiliaria

Registro central de las decisiones arquitectónicas y visuales importantes. Se actualiza a medida que cada agente resuelve puntos clave.

## Código de decisión
Usar identificadores tipo `DNN` (ej. `D01`, `D02`) para poder referenciarlas desde los archivos de cada agente.

---

## D01 — Estado inicial del proyecto
- **Fecha:** 2026-09-08
- **Tipo:** Arquitectónica
- **Decisión:** El proyecto parte desde cero (carpeta vacía, sin historial previo).
- **Motivo:** No existe trabajo previo que conservar.
- **Impacto:** Todo el contenido visual se construirá a partir de esta base.

## D02 — Primero coordinación, luego interfaz
- **Fecha:** 2026-09-08
- **Tipo:** Proceso
- **Decisión:** Construir la capa de coordinación (`historial-prompts/`) antes de cualquier desarrollo visual.
- **Motivo:** Garantizar la continuidad del proyecto y evitar trabajo aislado/repetido.

## D03 — Stack tecnológico a definir en Fase 3
- **Fecha:** 2026-09-08
- **Tipo:** Arquitectónica
- **Decisión:** No fijar aún el stack definitivo; lo resolverán los Agentes Frontend (03) y Backend (07).
- **Motivo:** Evitar decisiones prematuras que luego haya que revertir.
- **Restricción:** El mockup debe ser compatible con un backend futuro (Supabase u otro), según lo indicado por el Director.

## D04 — Bloqueo: Git no disponible en el entorno (RESUELTO)
- **Fecha:** 2026-09-08
- **Tipo:** Bloqueo / Infraestructura
- **Decisión:** Registrar que `git` (y `node`/`npm`/`gh`) no estaban en PATH en este entorno.
- **Motivo:** No se podía inicializar/clonar el repositorio local.
- **Acción recomendada:** Instalar Git (y Node si se usará un framework frontend) antes de la Fase 3. El proyecto queda listo para asociarse a `https://github.com/SantosVillada/mockup-inmobiliaria.git`.
- **RESOLUCIÓN (2026-09-08):** Instalados con `winget` → Git 2.55.0, GitHub CLI (gh) 2.100.0, Node.js v24.19.0, npm 11.17.0. Se autenticó `gh` como `SantosVillada`. Repo local inicializado, commit inicial creado y pusheado a GitHub.

## D05 — Repositorio y rama
- **Fecha:** 2026-09-08
- **Tipo:** Arquitectónica / Infraestructura
- **Decisión:** Repo local inicializado en `mockup-inmobiliaria`, rama por defecto `main`.
- **Motivo:** Convención moderna de ramas; GitHub lo usa por defecto.
- **Impacto:** Todo el trabajo futuro se realiza sobre `main` y se pushea a `origin`.
- **Remote:** `https://github.com/SantosVillada/mockup-inmobiliaria.git`
- **Commit inicial:** `cefe55e` ("chore: init project and historial de prompts").

## D06 — Identidad de git
- **Fecha:** 2026-09-08
- **Tipo:** Configuración
- **Decisión:** `user.name = SantosVillada`, `user.email = scvillada@gmail.com`.
- **Motivo:** Identidad configurada a nivel de repo (local) para los commits del proyecto.

## D07 — Protocolo de push obligatorio (confirmación del usuario)
- **Fecha:** 2026-09-08
- **Tipo:** Proceso / Gobernanza
- **Decisión:** Todo agente, al finalizar, debe pedir confirmación al usuario sobre:
  1. ¿Hacer push de los últimos cambios a GitHub? (Sí / No)
  2. ¿A la rama `main` o a una nueva rama? (indicar nombre si es nueva)
- **Motivo:** Evitar pushes no deseados o a la rama equivocada; mantener control del flujo de publicación.
- **Regla:** Ningún agente hace `git push` sin esta confirmación. Si responde No, se documenta y no se pushea.

---

## DUX — Decisiones de UX/UI (Agente 01)

> Rango `DUX-D20` en adelante. Cada una referencia los documentos de diseño en `docs/ux-ui/`.

### DUX-D20 — Header sticky
- **Fecha:** 2026-09-08 · **Tipo:** Visual
- **Decisión:** El header permanece fijo (sticky) al scrollear para que nunca se pierda la navegación ni el CTA.
- **Motivo:** Conversión y usabilidad (acción siempre a mano).

### DUX-D21 — Footer único
- **Decisión:** Un solo footer unificado en todas las páginas (nav, contacto, WhatsApp, redes, newsletter).
- **Motivo:** Coherencia y punto de re-contacto.

### DUX-D22 — Mobile-first
- **Decisión:** Diseñar primero para mobile (1 columna) y escalar hacia arriba.
- **Motivo:** Mayor audiencia móvil y mejor responsive.

### DUX-D23 — Filtros P-02 (sidebar / drawer)
- **Decisión:** Desktop: filtros en sidebar sticky. Mobile: panel deslizante (drawer) abierto con botón "Filtros".
- **Motivo:** Aprovechar el espacio en desktop y no tapar resultados en mobile.

### DUX-D24 — Galería P-03
- **Decisión:** Mobile: carrusel/swipe. Tablet/Desktop: mosaico con miniaturas laterales.
- **Motivo:** Adaptar la visualización al espacio.

### DUX-D25 — Sticky CTA en Detalle (P-03)
- **Decisión:** En mobile una barra fija inferior (precio + contacto/WhatsApp); en desktop columna derecha sticky.
- **Motivo:** El CTA nunca debe salir de vista en la página de conversión.

### DUX-D26 — Un CTA primario por vista
- **Decisión:** Cada página/sección tiene UN CTA primario; los demás son secundarios/terciarios.
- **Motivo:** Evitar competencia de acciones y confusión.

### DUX-D27 — Precio y operación siempre visibles
- **Decisión:** Precio y operación (venta/alquiler) siempre visibles en tarjetas y detalle, sin requerir hover.
- **Motivo:** Transparencia y agilidad de lectura.

### DUX-D28 — Estados de loading/vacío/error
- **Decisión:** Todos los componentes definen estados default/hover/focus/active/disabled/loading/empty/error. Nunca mostrar pantalla en blanco.
- **Motivo:** Robustez y buena experiencia ante datos faltantes/errores.

### DUX-D29 — WhatsApp como canal principal
- **Decisión:** WhatsApp es el CTA de mayor conversión; siempre con mensaje pre-cargado y presente en header, footer, detalle y flotante en mobile.
- **Motivo:** Alta conversión en inmobiliarias; mínima fricción.

### DUX-D30 — Formulario de contacto mínimo
- **Decisión:** Máximo 4 campos (nombre, teléfono/WhatsApp, e-mail opcional, mensaje), validación inline y mensaje de éxito claro.
- **Motivo:** Reducir fricción para captar leads.

### DUX-D31 — Filtros persistentes por URL
- **Decisión:** Los filtros de P-02 se reflejan en URL params (`?tipo=&zona=...`) para compartir/SEO y persistir al volver del detalle.
- **Motivo:** Compartibilidad, SEO y mejor UX.

### DUX-D32 — Agendar visita como modal
- **Decisión:** La reserva de visita se ofrece como modal (C-18) en P-03, sin abandonar la página.
- **Motivo:** No perder contexto; intención avanzada.

### DUX-D33 — CTA sticky en P-03
- **Decisión:** Reforzado en DUX-D25; CTA siempre visible en la página de detalle.

### DUX-D34 — Newsletter de 1 campo
- **Decisión:** Newsletter con un solo campo (e-mail) y confirmación de éxito.
- **Motivo:** Captura simple; base que profundiza el Agente 06.

### Estructura del sitemap (decisión de alcance)
- **Decisión:** Primer mockup con **7 páginas**: Home, Propiedades, Detalle, Agentes, Perfil Agente, Contacto, Nosotros. **Testimonios** y **FAQ** como **secciones** (Home / Contacto) y no como páginas; **Blog** pospuesto a fase de contenido; **dashboard/login de clientes** fuera de alcance (depende de backend).
- **Motivo:** Mínimo suficiente para convertir; evitar navegación muerta y páginas "en construcción".

---

---

## DBR — Decisiones de Branding (Agente 02)

> Rango `DBR-NN`. Cada una referencia los documentos de diseño en `docs/branding/`.

### DBR-01 — Marca de trabajo MORADA
- **Fecha:** 2026-09-08 · **Tipo:** Identidad
- **Decisión:** Nombre de trabajo **MORADA** (placeholder reemplazable). Tagline: "Encontrá tu morada."
- **Motivo:** Necesidad de una marca para el mockup; término español elegante/literario que transmite hogar, exclusividad y cercanía. Reemplazable sin romper nada.

### DBR-02 — Paleta azul petróleo + dorado champagne (60/30/10)
- **Decisión:** Azul petróleo (`#174A75`) como color de marca y CTAs; dorado champagne (`#C7A55A`) como acento de exclusividad; neutros fríos como base. Proporción **60% neutros / 30% azul / 10% dorado**.
- **Motivo:** Confianza + exclusividad + modernidad; regla conceptual de `layout.md` (primario=CTAs, neutro=fondo, acento=eyebrows/badges, semánticos verde/ámbar/rojo).
- **Nota accesibilidad:** dorado solo decorativo/detalle; texto sobre claro usa `--accent-600`.

### DBR-03 — Tipografía Sora + Inter
- **Decisión:** **Sora** (display/títulos) + **Inter** (cuerpo/UI). Alternativas documentadas (Fraunces/Playfair Display, Manrope, DM Sans).
- **Motivo:** Sora da modernidad+exclusividad en títulos; Inter da legibilidad y rendimiento en cuerpo. Regla UX/UI: máx. 2 familias.

### DBR-04 — Logo monograma "M" (techo de casa)
- **Decisión:** Símbolo = monograma "M" que se lee como techos de una casa + punto dorado (la puerta/lugar). Wordmark MORADA en Sora 600, mayúsculas, letter-spacing amplio. Variantes: color, monocromo azul, reverso (sobre oscuro), símbolo solo.
- **Motivo:** Geometría mínima y premium; lectura inmediata de "hogar".

### DBR-05 — Estilo visual moderno premium
- **Decisión:** Tarjetas radio **16px** con sombras azules suaves; botones **pill**; iconos **line** (Lucide); fotografía real/arquitectónica con overlay sutil en zonas de texto; espaciado base **4px**.
- **Motivo:** Suavidad, aire y detalles premium; coherencia con modernidad/tecnología.

### DBR-06 — Tono español rioplatense
- **Decisión:** Copy en **español rioplatense** (vos, "podés", "-tá"), cercano y directo; CTAs verbo-primero; sin jerga corporativa ni superlativos vacíos.
- **Motivo:** Cercanía y confianza con la audiencia; el proyecto es en español.

### DBR-07 — Tokens de marca consolidados
- **Decisión:** `docs/branding/tokens.md` define variables CSS conceptuales (colores, tipografía, radios, sombras, espaciados, breakpoints) como **fuente única** para el Agente 03.
- **Motivo:** Consistencia, facilidad de re-tematización y trabajo limpio del Frontend.

### DBR-08 — Sombra de marca en azul oscuro
- **Decisión:** Todas las sombras usan **azul oscuro** `rgba(10,31,51,…)`, nunca negro genérico.
- **Motivo:** Refuerza la identidad de color y evita sombras "sucias".

### DBR-09 — Reglas de contraste y superficie
- **Decisión:** Nunca azul sobre azul; en fondos oscuros (hero/footer) los CTAs usan **dorado** o **blanco**. Texto sobre claro usa neutros 800/900.
- **Motivo:** Accesibilidad (AA) y legibilidad.

---

---

## DPR — Decisiones de Propiedades (Agente 04)

> Rango `DPR-NN`. Cada una referencia los documentos de diseño en `docs/propiedades/`.

### DPR-01 — Modelo de datos orientado a Supabase
- **Fecha:** 2026-09-08 · **Tipo:** Arquitectónica / Datos
- **Decisión:** Tabla `propiedades` normalizada: `id` (uuid PK), `slug` único, `titulo`, `descripcion`, `precio`+`moneda`, `operacion`, `tipo`, `zona`/`ciudad`, métricas, `caracteristicas` (jsonb), `imagenes` (jsonb), `agente_id` (FK), `publicado_en`, etc.
- **Motivo:** Compatibilidad directa con Supabase/backend futuro (D03); JSONB para listas flexibles (amenities/imágenes).

### DPR-02 — Precio numérico + moneda
- **Decisión:** `precio` es numérico puro (formato del Frontend con `Intl.NumberFormat`). Campo `moneda` (default `ARS`). Si `operacion=alquiler`, el precio es **mensual**.
- **Motivo:** Independencia de formato; soporta ARS/USD/UYU sin tocar datos.

### DPR-03 — Tipos de propiedad (enum cerrado)
- **Decisión:** `casa` / `departamento` / `ph` / `local` / `terreno`. Agrupación en filtros: Vivienda (casa, departamento, ph), Comercial (local), Terreno (terreno).
- **Motivo:** Cobertura mínima del negocio inmobiliario rioplatense + agrupación para filtros y tiles.

### DPR-04 — Semántica de color de badges
- **Decisión:** Operación (VENTA/ALQUILER) en azul marca; estado premium NUEVO/OPORTUNIDAD en ámbar, EXCLUSIVO en dorado; no disponible (RESERVADO/VENDIDO) en gris. Regla DBR-09 (texto `--accent-600` sobre claro).
- **Motivo:** Aterrizar `docs/branding/colores.md`; distinguir operación de estado y de disponibilidad.

### DPR-05 — Tarjeta `C-01` (precio/operación siempre visibles)
- **Decisión:** `C-01` muestra siempre precio y operación sin hover (DUX-D27). 3 variantes: destacada (Home), estándar (grid), mini (compacta). Responsive 1/2/3/4 columnas.
- **Motivo:** Transparencia y agilidad de lectura; máxima conversión.

### DPR-06 — Filtros por URL params
- **Decisión:** Los filtros de `C-03` se reflejan en URL params (`?operacion=&tipo=&zona=&precio_min=&precio_max=&ambientes_min=&dormitorios_min=&m2_min=&m2_max=&orden=&page=`). Chips removibles (C-08).
- **Motivo:** DUX-D31 (shareable / SEO / persistencia al volver del detalle).

### DPR-07 — Slug como URL canónica
- **Decisión:** `P-03` usa `/propiedades/:slug`; el slug se genera una vez (`slugify(titulo)`) y no cambia al editar el título.
- **Motivo:** Estabilidad de enlaces y SEO.

### DPR-08 — Zonas normalizadas
- **Decisión:** Lista controlada de zonas (slug + ciudad) para filtros, tiles y URL params.
- **Motivo:** Coherencia de datos y filtros; evita variantes libres ("palermo"/"Palermo").

### DPR-09 — Amenities como lista controlada
- **Decisión:** `caracteristicas` = array de claves de un listado controlado (clave/label/icono), en 4 categorías. Se muestran en detalle y sirven para filtrar (avanzado).
- **Motivo:** Consistencia, SEO y filtrado eficiente (`@>` en Postgres).

### DPR-10 — Datos demo representativos
- **Decisión:** 10 propiedades (venta/alquiler, varios tipos y zonas, rangos de precio) en `datos-demo.md`, en español rioplatense.
- **Motivo:** Poblar el mockup con variedad realista para probar filtros, tarjetas y detalle.

### DPR-11 — Imágenes placeholder
- **Decisión:** Imágenes deterministas `https://picsum.photos/seed/{slug}-{n}/800/600` con `alt` descriptivo; reemplazables por fotos reales.
- **Motivo:** Mockup funcional sin asset real; SEO/accesibilidad desde el inicio.

---

## DAG — Decisiones de Agentes Inmobiliarios (Agente 05)

> Rango `DAG-NN`. Cada una referencia los documentos de diseño en `docs/agentes/`.

### DAG-01 — Modelo de datos de agente orientado a Supabase
- **Fecha:** 2026-09-08 · **Tipo:** Arquitectónica / Datos
- **Decisión:** Tabla `agentes` normalizada: `id` (uuid PK), `slug` (único), `nombre`+`apellido`, `email`, `telefono`, `whatsapp` (solo dígitos con código de país), `foto` (3:4), `cargo`, `especialidades` (jsonb), `idiomas` (jsonb), `bio`, `anios_experiencia`, `estadisticas` (jsonb), `zona_cobertura` (jsonb), `redes` (jsonb), `activo`, `orden`, `publicado_en`.
- **Motivo:** Compatibilidad directa con Supabase/backend (D03); JSONB para listas/objetos flexibles sin migraciones.

### DAG-02 — Slug como URL canónica de P-05
- **Decisión:** `P-05` usa `/agentes/:slug`. El slug se genera una vez (`slugify(nombre + apellido)`) y no cambia.
- **Motivo:** Estabilidad de enlaces y SEO (mismo patrón que DPR-07 en propiedades).

### DAG-03 — Especialidades como lista controlada
- **Decisión:** Lista cerrada de especialidades (clave/label/icono): `residencial`, `venta-departamentos`, `alquileres`, `ph`, `comercial`, `inversion`, `obra-nueva`. Cada agente tiene 1–3.
- **Motivo:** Etiquetas, filtros y bio consistentes; se mapean a tipos/operación de propiedades.

### DAG-04 — Zonas de cobertura reutilizan zonas normalizadas
- **Decisión:** `zona_cobertura` usa las mismas claves de zona que `propiedades` (DPR-08). No se inventan zonas.
- **Motivo:** Coherencia de datos y filtros entre agentes y propiedades.

### DAG-05 — Relación 1:N agentes ↔ propiedades
- **Decisión:** `propiedades.agente_id` → `agentes.id` (1:N). "Propiedades del agente" = propiedades `disponible = true` ordenadas por `publicado_en DESC`. Estado vacío con mensaje + CTA (DUX-D28).
- **Motivo:** Definir cómo se listan las propiedades de un agente en `P-05`.

### DAG-06 — Tarjeta `C-02` con 4 variantes
- **Decisión:** Variantes: **compacta** (mini), **estándar** (grid), **destacada** (Home), **perfil** (sidebar de `P-03`, con stats y CTAs). Un CTA primario (WhatsApp) por tarjeta (DUX-D26).
- **Motivo:** Adaptar la presentación según contexto sin duplicar componentes.

### DAG-07 — WhatsApp con mensaje pre-cargado (contexto)
- **Decisión:** `wa.me/{whatsapp}?text={mensaje}` con mensaje que incluye el **nombre del agente** y, si hay propiedad, `titulo`/`codigo`/`zona`. Plantillas por contexto (P-05, P-03, P-04, Home, general).
- **Motivo:** DUX-D29 (WhatsApp canal principal); el contexto mejora la calidad del lead.

### DAG-08 — Formulario de contacto mínimo en P-05
- **Decisión:** `C-04` con ≤4 campos (nombre, teléfono/WhatsApp, e-mail opcional, mensaje). Asunto implícito al agente (`agente_id`) y, si viene de P-03, a la propiedad.
- **Motivo:** DUX-D30 (mínima fricción) + asignación correcta del lead al agente.

### DAG-09 — Datos demo con 5 agentes
- **Decisión:** 5 agentes rioplatenses. `agt-01`…`agt-04` asignados a las propiedades demo (prop-001..prop-010); `agt-05` (director comercial) sin propiedades para demostrar el estado vacío.
- **Motivo:** Poblar el mockup y cubrir el edge case de agente sin cartera.

### DAG-10 — Filtros opcionales en P-04
- **Decisión:** Filtros opcionales por especialidad / idioma / zona de cobertura en el listado de agentes.
- **Motivo:** Refinar la elección de asesor sin agregar fricción (opcional, no bloqueante).

### DAG-11 — Estadísticas de agente
- **Decisión:** `anios_experiencia` a nivel superior (stat primario) + `estadisticas` como jsonb (`operaciones_cerradas`, `propiedades_vendidas`, `clientes_atendidos`, `valor_transaccionado`, `satisfaccion`). Se muestran con `C-19`.
- **Motivo:** Un stat siempre visible + métricas flexibles sin agregar columnas.

---

## DMK — Decisiones de Conversión / Marketing (Agente 06)

> Rango `DMK-NN`. Cada una referencia los documentos de diseño en `docs/marketing/`.

### DMK-01 — Embudo de conversión en 4 etapas
- **Fecha:** 2026-09-08 · **Tipo:** Estrategia
- **Decisión:** Embudo en **4 etapas**: Descubrir → Considerar → Decidir → Convertir. Cada página tiene **un objetivo de conversión (KPI)** que la lleva a la siguiente etapa.
- **Motivo:** Aterrizar la conversión de visitante a cliente con una métrica clara por página.
- **Referencia:** `docs/marketing/embudo.md`.

### DMK-02 — Un CTA primario por vista (aterrizar `DUX-D26`)
- **Decisión:** Cada vista tiene **UN CTA primario**; el resto es secundario/terciario. Inventario completo por página (texto, variante, ubicación, destino).
- **Motivo:** Evitar competencia de acciones y confusión.
- **Referencia:** `docs/marketing/ctas.md`.

### DMK-03 — WhatsApp como canal principal (número institucional placeholder)
- **Decisión:** WhatsApp es el CTA de mayor conversión. **Número institucional placeholder `5491155550000`**; el de cada agente es el campo `whatsapp` de su fila. Presente en header, footer, detalle, agentes, perfil y **flotante mobile**.
- **Motivo:** `DUX-D29`; mínima fricción y máxima conversión.
- **Referencia:** `docs/marketing/whatsapp.md`.

### DMK-04 — Mensajes pre-cargados por contexto
- **Decisión:** Mensajes pre-cargados por contexto (general, por propiedad, por agente, sellers), generados por el Frontend con `encodeURIComponent`. Incluyen `{nombre}` del agente y `{titulo}`/`{codigo}`/`{zona}` de la propiedad cuando aplica.
- **Motivo:** El contexto califica el lead; el usuario no escribe nada.
- **Referencia:** `docs/marketing/whatsapp.md`.

### DMK-05 — Formulario de contacto mínimo (≤4 campos)
- **Decisión:** `C-04` con ≤4 campos (nombre, teléfono/WhatsApp, e-mail opcional, mensaje); estados (default/focus/error/loading/success) y éxito rioplatense.
- **Motivo:** `DUX-D30`; mínima fricción para captar leads.
- **Referencia:** `docs/marketing/formularios.md`.

### DMK-06 — Formulario "Vender mi propiedad" (sellers)
- **Decisión:** Formulario seller con datos del propietario (3) + datos de la propiedad (4). **CTA primario = WhatsApp**; el formulario es el camino formal (secundario).
- **Motivo:** El seller quiere respuesta rápida; el form captura más contexto pero con más esfuerzo.
- **Referencia:** `docs/marketing/formularios.md` §2, `docs/marketing/vender-propiedad.md`.

### DMK-07 — Newsletter de 1 campo
- **Decisión:** Newsletter con **1 campo** (e-mail), botón "Suscribirme" y confirmación. Incluye reglas anti-spam y link a política de privacidad.
- **Motivo:** `DUX-D34`; captura simple.
- **Referencia:** `docs/marketing/formularios.md` §3.

### DMK-08 — Reserva de visita como modal (`C-18`)
- **Decisión:** Reserva de visita como **modal en `P-03`** (`DUX-D32`) con fecha/hora + datos mínimos; alternativa "coordinar por WhatsApp".
- **Motivo:** Intención avanzada sin abandonar la página.
- **Referencia:** `docs/marketing/formularios.md` §4.

### DMK-09 — Modelo de datos `leads` + estados
- **Decisión:** Tabla `leads` orientada a Supabase (id, nombre, telefono, whatsapp, email, mensaje, `tipo`, agente_id, propiedad_id, fecha/hora visita, operacion/tipo/zona interés, origen, canal, estado, fechas). **Estados del lead**: `nuevo, contactado, calificado, visitó, cerrado, perdido`.
- **Motivo:** Persistir todo lo que generan formularios, WhatsApp, newsletter y reservas; compatible con Supabase (`D03`).
- **Referencia:** `docs/marketing/leads.md`.

### DMK-10 — Mecanismos de captación de leads priorizados
- **Decisión:** Orden de prioridad de mecanismos de captación: **WhatsApp > formulario de contacto > reserva de visita > newsletter > pedir más info/fotos**. Se miden con `origen`/`canal`.
- **Motivo:** Enfocar el esfuerzo en los canales de mayor conversión.
- **Referencia:** `docs/marketing/leads.md` §1, `docs/marketing/embudo.md`.

### DMK-11 — Técnicas de conversión
- **Decisión:** Confianza (stats `C-19`, agentes con cara, testimonios `C-12`, garantías, transparencia), urgencia/escasez (badges NUEVO/OPORTUNIDAD/EXCLUSIVO, "solo X disponibles" con datos reales), prueba social y copy rioplatense verbo-primero.
- **Motivo:** Reforzar "acá te resuelven, sin vueltas". Prohibido inventar escasez o usar superlativos vacíos.
- **Referencia:** `docs/marketing/conversion.md`.

### DMK-12 — Landing "Vender mi propiedad" dedicada
- **Decisión:** Usar una **landing dedicada** `/vender` (Opción A) para sellers, con refuerzo en Home (Opción B) que enlaza a ella. Estructura: hero, beneficios, cartera, stats, testimonio, cómo funciona, formulario, FAQ, CTA final.
- **Motivo:** Público distinto (propietario que quiere publicar), mensaje propio y lead de mayor valor.
- **Referencia:** `docs/marketing/vender-propiedad.md`.

### DMK-13 — Número institucional configurable
- **Decisión:** El número institucional de WhatsApp (`5491155550000`) es un **placeholder configurable** en backend (tabla `config`/env), no hardcodeado en componentes.
- **Motivo:** Que el Agente 07 lo centralice; el mockup lo usa como valor demo.
- **Referencia:** `docs/marketing/whatsapp.md`.

---

## DFE — Decisiones de Frontend (Agente 03)

> Rango `DFE-NN`. Cada una referencia los documentos de diseño en `docs/` y el estado del mockup.

### DFE-01 — Ubicación del proyecto en `web/`
- **Fecha:** 2026-09-08 · **Tipo:** Arquitectónica / Estructura
- **Decisión:** `create-next-app` se niega a inicializar en la raíz del repo (existen `docs/`, `historial-prompts/`, `.git`). El proyecto Next.js vive en la subcarpeta **`web/`**.
- **Motivo:** No contaminar la raíz del repo ni la documentación; mantener `docs/` e `historial-prompts/` intactos. La raíz sigue siendo la fuente de verdad de diseño y coordinación.
- **Impacto:** El app se corre desde `web/` (`npm run dev/build`); los datos demo de `lib/data/` son la fuente que luego migra el Agente 07.

### DFE-02 — Stack Next.js 16 (App Router) + TS + Tailwind v4 + lucide-react
- **Decisión:** Next.js 16.3.4 (App Router, Turbopack) + React 19 + TypeScript + **Tailwind CSS v4** (tema vía `@theme` en `globals.css`, sin `tailwind.config`) + **lucide-react** (iconos line).
- **Motivo:** Stack moderno compatible con backend futuro (D03); Tailwind v4 permite mapear tokens de marca de forma nativa con `@theme`.
- **Nota:** Se respetaron las breaking changes de Next 16 (`params`/`searchParams` como `Promise`, helpers globales `PageProps`/`LayoutProps`, Suspense para `useSearchParams`).

### DFE-03 — Tema de marca y fuentes
- **Decisión:** Tokens de `docs/branding/tokens.md` mapeados a `@theme` (colores `brand-*`, `accent-*`, `neutral-*`, semánticos; radios `sm/md/lg/pill`; sombras azules `xs/sm/md/lg`). Fuentes **Sora** (display) e **Inter** (body) cargadas con `next/font/google`.
- **Motivo:** Una sola fuente de verdad de tokens (DBR-07); tipografía premium-moderna (DBR-03).
- **Implementación:** `web/app/globals.css` + `web/app/layout.tsx`.

### DFE-04 — Estructura de archivos y alias
- **Decisión:** `app/` (rutas), `components/` (`ui/`, `layout/`, `propiedades/`, `agentes/`, `conversion/`) y `lib/` (`types`, `constants`, `utils`, `data`). Alias `@/*` → raíz de `web/`. Sin carpeta `src/`.
- **Motivo:** Organización por dominio de negocio; fácil de mantener y mapear al backend.

### DFE-05 — Datos demo tipados
- **Decisión:** `lib/types.ts` define `Propiedad`, `Agente`, `Lead`, `Zona`, etc. `lib/data/propiedades.ts` (10) y `lib/data/agentes.ts` (5) copian los datos de `docs/**/datos-demo.md`, tipados y con helpers de acceso.
- **Motivo:** El mockup consume datos locales tipados; el Agente 07 reemplaza estos helpers por queries a Supabase sin cambiar la interfaz.

### DFE-06 — Imágenes placeholder con `<img>`
- **Decisión:** Se usan `<img>` con placeholders deterministas (`picsum.photos`, `i.pravatar.cc`). Se desactivó la regla ESLint `@next/next/no-img-element`.
- **Motivo:** Evitar configurar `images.remotePatterns`/optimización para un mockup; en producción se reemplazan por fotos reales (DPR-11).

### DFE-07 — Filtros y paginación por URL params
- **Decisión:** P-02 usa URL params (`?q=&operacion=&tipo=&zona=&precio_min=&precio_max=&ambientes_min=&dormitorios_min=&m2_min=&m2_max=&orden=&page=`) (DUX-D31). Filtros en **sidebar sticky** desktop y **drawer** mobile (DUX-D23). Chips removibles de filtros activos.
- **Motivo:** Shareable/SEO/persistencia al volver del detalle; feedback claro (DUX-D28).

### DFE-08 — Conversión y formularios simulados
- **Decisión:** Formularios (contacto, vender, newsletter, visita) simulan envío (loading → success) sin backend. WhatsApp (`wa.me/{numero}?text=`) con mensajes pre-cargados por contexto (general / agente / propiedad / sellers) generados en el cliente (DMK-04).
- **Motivo:** DUX-D29/D30; el Agente 07 conecta la persistencia de leads y centraliza el número institucional (DMK-13).

### DFE-09 — Logo monograma "M"
- **Decisión:** Componente `Logo` con monograma "M" (dos picos + punto dorado) como SVG y wordmark **MORADA** (Sora 600, mayúsculas, tracking amplio). Variantes claro/oscuro.
- **Motivo:** Materializa `docs/branding/logo.md` (DBR-04).

### DFE-10 — CTA sticky en Detalle y Perfil (DUX-D25)
- **Decisión:** P-03 y P-05 usan columna derecha sticky (desktop) con agente + CTAs + formulario; barra fija inferior en mobile con precio + WhatsApp + Contactar/Visita.
- **Motivo:** El CTA de contacto nunca sale de vista en las vistas de conversión.

---

## DBK — Decisiones de Backend / Arquitectura futura (Agente 07)

> Rango `DBK-NN`. Cada una referencia los documentos de diseño en `docs/backend/`.

### DBK-01 — Next.js App Router como servidor + Supabase como backend
- **Fecha:** 2026-09-08 · **Tipo:** Arquitectónica
- **Decisión:** La app Next.js (App Router) actúa como servidor; **Supabase** (Postgres + Auth + Storage + RLS) como infraestructura de datos/auth. Sin servidor propio.
- **Motivo:** Moderno, escalable, sin mantener backend; compatible con D03/DFE-02.
- **Referencia:** `docs/backend/arquitectura.md`.

### DBK-02 — Clientes Supabase y autenticación
- **Decisión:** Cuatro clientes en `web/lib/supabase/`: `client.ts` (browser), `server.ts` (server + cookies), `admin.ts` (service role, server-only), `middleware.ts` (updateSession). **Auth:** email/password + magic link (Supabase Auth).
- **Motivo:** Separar entornos (browser/server), mantener sesión vía cookies y reservar `service_role` solo para servidor.
- **Referencia:** `docs/backend/arquitectura.md`, `docs/backend/auth-roles.md`.

### DBK-03 — Tres roles: admin / asesor / cliente
- **Decisión:** Roles `admin`, `asesor`, `cliente` en tabla `roles` (con `permisos` JSONB) + columna `usuarios.rol`. Frontend replica permisos en `lib/types/roles.ts` para UI; RLS es la defensa real.
- **Motivo:** Matriz simple de permisos que cubre gestión, asesoramiento y cliente público.
- **Referencia:** `docs/backend/auth-roles.md`.

### DBK-04 — `leads` fuente única; `consultas` como vista
- **Decisión:** `leads` es la **fuente única** de captación (form/WhatsApp/newsletter/visita). `consultas` es una **vista derivada** (`tipo in contacto, visita`) para reportes; se promueve a tabla solo si se necesita historial por usuario/thread.
- **Motivo:** Evitar duplicación de esquema; separar "captación" de "consulta formal" sin tablas redundantes.
- **Referencia:** `docs/backend/esquema-sql.md` §4.

### DBK-05 — `clientes` como extensión opcional
- **Decisión:** Tabla `clientes` (1:1 con `usuarios`) para clientes registrados: tipo de interés, zonas preferidas, presupuesto, newsletter, notas.
- **Motivo:** Perfil de cliente logueado (guardados/búsquedas/historial) sin tocar `leads`.
- **Referencia:** `docs/backend/esquema-sql.md` §3.2.

### DBK-06 — RLS: catálogo público, leads anónimo, CRUD admin/asesor
- **Decisión:** Lectura **pública** de `propiedades`, `agentes`, `zonas`, `amenities`, `config`, `roles`. `leads`: **insert anónimo** + lectura/edición asesor/admin. `usuarios`/`clientes`: propio o admin. CRUD admin en catálogo.
- **Motivo:** Sitio público sin login + captura anónima de leads + back-office seguro.
- **Referencia:** `docs/backend/esquema-sql.md` §6.

### DBK-07 — Número institucional de WhatsApp centralizado (env)
- **Decisión:** `NEXT_PUBLIC_WHATSAPP_NUMBER` en env con fallback al valor demo (`5491155550000`). Aplicado en `lib/constants.ts`, `utils.waLinkGeneral()`, `FormularioVender`, `vender/page.tsx`. También se guarda en tabla `config`.
- **Motivo:** Aterrizar `DMK-13` (no hardcodear el número en componentes).
- **Referencia:** `docs/backend/integraciones.md` §1.

### DBK-08 — Lecturas en RSC; mutaciones públicas vía Route Handler; admin vía Server Actions
- **Decisión:** Lecturas en **Server Components** (`lib/queries/*`). Mutaciones públicas de leads vía **Route Handler** `POST /api/leads` (creado). Mutaciones de admin vía **Server Actions** (con verificación de rol).
- **Motivo:** Bundle cliente liviano; escritura pública desacoplada; back-office autenticado.
- **Referencia:** `docs/backend/arquitectura.md` §3.

### DBK-09 — Supabase Storage para imágenes
- **Decisión:** Buckets `propiedades` y `agentes` (públicos). `propiedades.imagenes` y `agentes.foto` guardan URLs públicas. Placeholders (`picsum`/`pravatar`) se reemplazan por fotos reales.
- **Motivo:** Escalar assets sin servidor de archivos; RLS de escritura admin/asesor.
- **Referencia:** `docs/backend/esquema-sql.md` §8, `docs/backend/integraciones.md` §2.

---

## DQA — Decisiones de QA (Agente 08)

> Rango `DQA-NN`. Cada una referencia el estado del mockup y la auditoría contra `docs/`.

### DQA-01 — Guard de agente en P-03 (detalle)
- **Fecha:** 2026-09-08 · **Tipo:** Robustez
- **Decisión:** En `app/propiedades/[slug]/page.tsx`, si el agente asociado a la propiedad no existe / no está activo, no se renderizan `PerfilAgente` ni `DetalleContacto` (que dependen de `agente`); el formulario de contacto sigue visible.
- **Motivo:** Evitar crash (`agente.nombre` sobre `undefined`) cuando los datos reales de Supabase no tengan agente activo para una propiedad. Antes se pasaba `agente={agente!}`.

### DQA-02 — IDs únicos de newsletter
- **Decisión:** El componente `Newsletter` usa `useId()` para el `id` del input y el `htmlFor` del label.
- **Motivo:** En Home el `Newsletter` se renderiza 2 veces (CTA final + Footer) y generaba `id="newsletter-dark"` duplicado → label ambigua y HTML inválido.

### DQA-03 — Logo monograma con tokens
- **Decisión:** El punto dorado del monograma usa `var(--accent-400)` (sobre claro) y `var(--accent-300)` (sobre oscuro), en lugar del hex suelto `#C7A55A`.
- **Motivo:** Cumplir la regla "tokens, nunca hex sueltos" (DBR-07) y la variante reverso de `docs/branding/logo.md` (punto `--accent-300` sobre oscuro).

---

## DVI — Decisiones del Director Visual (Agente 09)

> Rango `DVI-NN`. Revisión global de coherencia visual de la FASE 5 contra `docs/branding/` y `docs/ux-ui/`.

### DVI-01 — Botones pill (radio 999px)
- **Fecha:** 2026-09-08 · **Tipo:** Visual / Coherencia
- **Decisión:** Agregar `rounded-full` a la clase base del componente `Button` (`components/ui/Button.tsx`). Antes los botones no tenían radio definido y caían al valor por defecto del navegador.
- **Motivo:** `docs/branding/estilo.md` §4 y `tokens.md` §7 definen botones **pill** (`--radius-pill: 999px`). La variante `tertiary` (link) no se ve afectada visualmente.
- **Impacto:** Todos los CTAs (primario/secundario/acento/whatsapp) quedan pill, coherentes con la marca.

### DVI-02 — Color de WhatsApp centralizado en tokens
- **Fecha:** 2026-09-08 · **Tipo:** Visual / Mantenibilidad
- **Decisión:** Crear tokens `--whatsapp` (#25D366) y `--whatsapp-strong` (#1DA851) en `globals.css` (`:root` + `@theme inline` como `--color-whatsapp` / `--color-whatsapp-strong`) y reemplazar los hex sueltos `bg-[#25D366]` / `hover:bg-[#1da851]` por `bg-whatsapp` / `hover:bg-whatsapp-strong` en todos los componentes y páginas (Button, ContactoBarra, WhatsAppWidget, PerfilAgente, DetalleContacto, Footer, TarjetaAgente, contacto, vender, agentes/[slug]).
- **Motivo:** Regla de `tokens.md` §8 (tokens, nunca hex sueltos) y `estilo.md` §4 C-13. Centraliza el color del canal principal (DMK-03) para re-tematizarlo sin tocar componentes.
- **Impacto:** Sin cambio visual; mejora mantenibilidad y cumple la regla de tokens.

### DVI-03 — Logo: stroke usa `currentColor`
- **Fecha:** 2026-09-08 · **Tipo:** Visual / Tokens
- **Decisión:** En `components/ui/Logo.tsx`, el trazo del monograma pasa de `onDark ? "#FFFFFF" : "currentColor"` a siempre `currentColor`. El color lo resuelve la clase `text-white` (oscuro) / `text-brand-600` (claro) del contenedor SVG.
- **Motivo:** Eliminar el hex suelto `#FFFFFF` (regla de tokens) manteniendo la variante correcta por fondo (DBR-09 / `logo.md` §3). Complementa `DQA-03` (punto dorado ya usaba tokens).
- **Impacto:** Sin cambio visual; cumple la regla de tokens.

### DVI-04 — Radios fuera de escala normalizados a 16px
- **Fecha:** 2026-09-08 · **Tipo:** Visual / Coherencia
- **Decisión:** Reemplazar `rounded-3xl` (24px) por `rounded-2xl` (16px) en los paneles grandes de CTA/estadísticas de `app/page.tsx`, `app/nosotros/page.tsx` y `app/vender/page.tsx`.
- **Motivo:** `tokens.md` §3 define radios máx. `--radius-lg: 16px` (y `pill`). 24px quedaba fuera de la escala ("no inventar radios fuera de esta escala"). Las tarjetas ya usan `rounded-2xl` (16px).
- **Impacto:** Alinea los paneles de marca con la escala de radios; sin impacto funcional.

---

## Decisiones futuras (plantilla)
- [Próxima decisión relevante aquí]
