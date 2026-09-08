# AGENTE 01 — UX/UI

Registro del Agente de UX/UI.

> **Regla de finalización (obligatoria):** Antes de cerrar, preguntá al usuario:
> 1. ¿Push de los últimos cambios a GitHub? (Sí / No)
> 2. ¿A la rama `main` o a una nueva rama? (indicar nombre si es nueva)

## Prompt / Instrucción
FASE 1 — Actuar como **AGENTE 01 — UX/UI** del proyecto **mockup-inmobiliaria**. NO escribir código (HTML/CSS/JS). Definir y documentar: sitemap/páginas, layout general, jerarquía visual, sistema de grid y breakpoints, componentes clave, flujos de navegación e interacción, principios UX orientados a conversión, y estados responsive/de componentes. Entregar como documentos de diseño en markdown dentro de `docs/ux-ui/`. Actualizar el historial y las decisiones. NO hacer push.

## Fecha
2026-09-08

## Objetivo
Sentar la **arquitectura de información** y la **estructura visual** del sitio (diseño, no código), para que el Agente 03 (Frontend) pueda construir sin re-preguntar decisiones.

## Resultado
- Se creó la carpeta `docs/ux-ui/` y 5 documentos de diseño.
- **Sitemap:** 7 páginas (Home, Propiedades, Detalle, Agentes, Perfil Agente, Contacto, Nosotros). Se justificó incluir y excluir páginas (Testimonios y FAQ como secciones, Blog pospuesto, dashboard/login fuera de alcance).
- **Layout:** shell de página, header sticky, footer único, grid de 12 columnas, breakpoints (mobile/tablet/desktop/large), jerarquía visual (primario/secundario/terciario), regla de un CTA primario por vista, estructura de secciones del Home.
- **Componentes:** inventario `C-01`–`C-20` (tarjetas de propiedad, tarjetas de agente, barra de búsqueda/filtros, formulario de contacto, CTA, modal/popup, sliders/gallería, carrusel de testimonios, badges, paginación, breadcrumb, drawer, footer, header, WhatsApp, stats, iconos) con propósito, contenido, ubicación y estados.
- **Flujos:** flujo principal (llegar→buscar→ver→contactar/WhatsApp), búsqueda/filtros, galería, formulario, newsletter, WhatsApp, navegación, perfil de agente, reserva de visita, y patrones transversales.
- Se registraron decisiones UX `DUX-D20` a `DUX-D34` en `decisiones.md`.

## Archivos modificados
- `docs/ux-ui/README.md` (creado)
- `docs/ux-ui/sitemap.md` (creado)
- `docs/ux-ui/layout.md` (creado)
- `docs/ux-ui/componentes.md` (creado)
- `docs/ux-ui/flujos.md` (creado)
- `historial-prompts/01-ux-ui.md` (actualizado)
- `historial-prompts/decisiones.md` (actualizado)

## Decisiones tomadas
- **DUX-D20** Header sticky siempre visible.
- **DUX-D21** Footer único en todas las páginas.
- **DUX-D22** Mobile-first.
- **DUX-D23** Filtros P-02: sidebar sticky en desktop, drawer en mobile.
- **DUX-D24** Galería: carrusel en mobile, mosaico en desktop.
- **DUX-D25** Sticky CTA de contacto en P-03 (barra inferior mobile / columna desktop).
- **DUX-D26** Un CTA primario por vista.
- **DUX-D27** Precio y operación siempre visibles en tarjetas.
- **DUX-D28** Estados de loading/vacío/error siempre definidos (sin pantallas en blanco).
- **DUX-D29** WhatsApp como CTA de mayor conversión, con mensaje pre-cargado.
- **DUX-D30** Formulario de contacto mínimo (≤4 campos), validación inline, success claro.
- **DUX-D31** Filtros persistentes vía URL params (shareable / SEO).
- **DUX-D32** "Agendar visita" como modal en P-03.
- **DUX-D33** CTA sticky siempre visible en P-03.
- **DUX-D34** Newsletter con 1 campo y confirmación de éxito.
- **Estructura:** 7 páginas en el primer mockup; Testimonios/FAQ como secciones; Blog pospuesto.

## Próximo paso
Ejecutar la siguiente etapa de la **FASE 1**: **Agente 02 — Branding**, que definirá paleta de color, tipografías y estilo visual (aterrizando la "calidad visual / modernidad / exclusividad"). Al recibir su entrega, el Director la revisa antes de pasar a la FASE 2 (Propiedades/Agentes/Marketing).

## Estado
COMPLETADO
