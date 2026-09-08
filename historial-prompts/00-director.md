# DIRECTOR — mockup-inmobiliaria

Log del Director General. Aquí se registran: instrucciones dadas a los agentes, resultados recibidos, decisiones del proyecto, problemas encontrados, soluciones aplicadas y próximos pasos.

---

## Registro 001 — Inicialización de la coordinación

### Prompt / Instrucción
Instrucción original del director (este documento): coordinar el desarrollo completo del mockup de una inmobiliaria mediante agentes especializados. Primera tarea: revisar el proyecto, crear `historial-prompts/`, registrar esta instrucción, definir roadmap y preparar instrucciones para el Agente UX/UI. **No** desarrollar aún la interfaz completa.

### Fecha
2026-09-08

### Objetivo
Establecer la coordinación del proyecto (memoria persistente, roadmap y orden de trabajo) antes de crear componentes visuales.

### Resultado
- Se verificó el estado del proyecto.
- Se creó `historial-prompts/` y sus archivos.
- Se definió el roadmap inicial.
- Se prepararon las instrucciones para el Agente UX/UI.

### Estado inicial del proyecto (revisión)
- Ruta: `C:\Users\Santos\Documents\Proyectos\mockup-inmobiliaria`
- Estado: **carpeta vacía** (0 archivos, no existe `historial-prompts/`).
- Repositorio GitHub de referencia: `https://github.com/SantosVillada/mockup-inmobiliaria.git`
- Herramientas disponibles en el entorno: **git / node / npm / gh NO instalados** en PATH. Por lo tanto no se pudo inicializar el repo local ni clonar.

### Decisiones tomadas
- **D01:** Iniciar el proyecto desde cero (la carpeta está vacía).
- **D02:** Construir primero la capa de coordinación (`historial-prompts/`) antes de cualquier desarrollo visual.
- **D03:** No usar todavía un stack tecnológico definitivo; el roadmap lo resolverá el Agente Frontend + Agente Backend en la Fase 3. Se mantiene la premisa de que el mockup sea compatible con un backend futuro (Supabase u otro).
- **D04:** El entorno no tiene git en PATH → se recomienda a quien continúe instalar Git y/o inicializar el repo local. El Director registra este bloqueo (no crítico para la coordinación).

### Problemas encontrados
- No hay Git disponible en el entorno → no se puede inicializar/clonar el repositorio en esta sesión.

### Soluciones aplicadas
- Documentar el bloqueo en el historial para que el siguiente agente lo resuelva (instalar Git o usar el cliente GitHub).
- Trabajar sobre el sistema de archivos local.

### Próximo paso
Ejecutar la **FASE 1**: enviar instrucciones al **Agente UX/UI** (ver sección siguiente) para definir estructura visual, experiencia de usuario, navegación, jerarquía visual, responsive y layout. Al recibir su entrega, revisarla antes de pasar a Branding.

### Estado
COMPLETADO (inicialización de coordinación). Pendiente: FASE 1.

---

## Instrucciones para el Agente UX/UI (próximo a intervenir)

Ver también `01-ux-ui.md` para el registro de este agente.

### Mandato
1. **NO** crear todavía la implementación (HTML/CSS/JS) ni el código de componentes.
2. Definir la **arquitectura de la información** y la **estructura visual** del sitio.
3. Definir **sitemap / páginas** (p. ej. Home, Propiedades, Detalle de propiedad, Agentes, Contacto, etc.).
4. Definir **layout general** (header, hero, secciones, footer), **jerarquía visual**, **grid** y **breakpoints** responsive.
5. Definir **componentes** clave (tarjetas de propiedad, tarjetas de agente, formularios, CTA, etc.) con su propósito y contenido.
6. Definir **flujo de navegación** y **patrones de interacción** (búsqueda, filtros, contacto, WhatsApp).
7. Definir **UX** orientado a conversión (el Agente 06 profundizará en CTAs/formularios; acá se sienta la base).
8. Entregar como documento de diseño (markdown) en el proyecto, p. ej. `docs/ux-ui/` o similar, sin tocar código aún.

### Entregable esperado
- Documento de diseño UX/UI.
- Sitemap y wireframe/estructura textual de cada página.
- Inventario de componentes y de estados (desktop/mobile).
- Lista de páginas/componentes que deberá construir el Agente 03 (Frontend).

### Registro
- Registrar todo en `01-ux-ui.md`.
- Actualizar `decisiones.md` con las decisiones de UX relevantes.

### Criterio de aceptación para avanzar a Branding
- Sitemap definido.
- Layout y sistema de grid definidos.
- Inventario de componentes definido.
- Estructura responsive definida.
- Sin bloqueos críticos.

### Estado
PENDIENTE — el Agente UX/UI debe intervenir.
