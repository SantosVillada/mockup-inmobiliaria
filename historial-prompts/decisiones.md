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

## Decisiones futuras (plantilla)
- [Próxima decisión relevante aquí]
