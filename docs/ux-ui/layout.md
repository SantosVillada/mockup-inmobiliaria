# Layout, grid, breakpoints y jerarquía — mockup-inmobiliaria

> Define el **esqueleto visual** del sitio. Complementa a `sitemap.md` (qué páginas) y `componentes.md` (con qué bloques).
> Convención de decisiones: `DUX-NN`.

---

## 1. Estructura general de una página (shell)

Toda página comparte este **layout de página**:

```
┌──────────────────────────────────────────────────────────┐
│  HEADER  (sticky)  logo · nav · CTA                     │
├──────────────────────────────────────────────────────────┤
│  (P-01) HERO                                          │ │  ← hero (solo Home, o bandas superiores
│  (P-02/P-03/etc.) BREADCRUMB / título de página       │ │    en páginas interiores)
│                                                        │
│      CONTENIDO PRINCIPAL  ................................  │
│                                                        │
├──────────────────────────────────────────────────────────┤
│  FOOTER  (nav, contacto, WhatsApp, redes, newsletter)  │
└──────────────────────────────────────────────────────────┘
```

- **Header:** fijo (`position: sticky/fixed`), aparece siempre. En `P-03` se suma una **barra de contacto**.
- **Contenido:** contenido principal que cambia por página.
- **Footer:** presente en todas las páginas.

### DUX-D20 — Header sticky
El header se mantiene fijo al scrollear para que **nunca** se pierda la navegación ni el CTA. En desktop alto ~72px; en mobile solo muestra logo + hamburguesa (el CTA pasa a la barra inferior o al menú). Ver `componentes.md` → `C-05`.

### DUX-D21 — Footer unificado
Un solo footer en todos los sitios, con anclas para navegación, contacto, redes y newsletter → `C-06`.

---

## 2. Sistema de grid

- **Columna base:** 12 columnas flexibles.
- **Gutter horizontal:** 16px en mobile; 24px en tablet/desktop.
- **Contenedor (container):** ancho máximo **1240px** centrado, con padding lateral de 16–24px según breakpoint.
- **Sistema:** colores de grilla clase `col-{n}` de 1 a 12; en mobile todo colapsa a 1 columna y se apilan.

### Alineación de textos
- Mobile: títulos y textos **izquierda** (mejor legibilidad en pantalla angosta).
- Desktop: centrado solo para bloques de hero/CTA; izquierda para contenido funcional.

---

## 3. Breakpoints responsive

| Nombre | Ancho | Columnas | Objetivo | Reorganización |
|--------|-------|----------|----------|----------------|
| **Mobile** | 320 – 639px | 1 (apilado) | Móviles | Tarjetas a 1 columna; filtros en drawer; menú hamburguesa; headline grande (clamp). |
| **Tablet** | 640 – 1023px | 2 | Tablets | Tarjetas a 2 columnas; menú horizontal compacto; sidebar de filtros visible; form de contacto en 2 columnas. |
| **Desktop** | 1024 – 1439px | 3 | Laptops/desktop | Tarjetas a 3 columnas; grid completo; header con nav completo; galería grande. |
| **Large** | 1440px+ | 4 | Monitores grandes | Tarjetas a 4 columnas (grid amplio); se usa en Home/P-02. |

### DUX-D22 — Mobile-first
Se diseña **primero para mobile**, luego se escala hacia arriba. Todo componente debe funcionar en 1 columna antes de optimizar desktop.

### DUX-D23 — Filtros en P-02
- **Desktop (≥1024px):** filtros en **sidebar sticky** a la izquierda (grid 4/8 o 3/9).
- **Mobile (<1024px):** filtros en **panel deslizante (drawer)** que se abre con un botón flotante "Filtros". Ver `C-03`.

### DUX-D24 — Galería de detalle
- Mobile: carrusel a 1 imagen visible (swipe).
- Tablet/Desktop: galería en mosaico / miniaturas laterales; el carrusel principal ocupa mayor ancho. Ver `C-11`.

### DUX-D25 — Sticky CTA en Detalle (P-03)
En mobile, una **barra fija inferior** con el precio + botón "Contactar" / "WhatsApp". En desktop, el CTA vive en la columna derecha sticky.

---

## 4. Jerarquía visual y niveles

### Niveles de atención
| Nivel | Rol | Dónde | Cómo se logra |
|-------|-----|-------|----------------|
| **Primario** | Acción principal | CTAs de contacto/WhatsApp/ver propiedades; precios; botones primarios | Mayor contraste (color/énfasis), tamaño de botón, posición dominante |
| **Secundario** | Navegación / soporte | Links de menú, tarjetas sin CTAs fuertes, información clave | Contraste medio, menos peso |
| **Terciario** | Información de apoyo | texto pequeño, footer, badges, metadata | Bajo contraste, tamaño menor |

### Regla de CTAs (jerarquía de acciones)
En cada **sección/página** hay **un CTA primario** y, como mucho, **un CTA secundario**:
- **Primario:** "Contactar", "Ver propiedad", "Consultar por WhatsApp", "Agendar visita".
- **Secundario:** "Ver todas las propiedades", "Conocer agentes", "Ir a Nosotros".

### DUX-D26 — Un CTA primario por vista
Evitar competir CTAs. El primario siempre responde a la pregunta "¿qué quiero que haga el usuario en esta pantalla?". Los demás son secundarios o terciarios.

### Reglas de tipografía
- **Título de sección:** display, grande, con un **subtítulo** breve en peso normal (equilibra peso visual).
- **Cuerpo:** legible, menor contraste. No más de 1 fuente de display + 1 de cuerpo (decidirá Agente 02 Branding).
- **No más de 3 tamaños con el mismo peso/página** para no saturar.

### Reglas de color (base conceptual — define el Agente 02)
- **Color primario** para CTAs (alta conversión).
- **Color neutro** (fondo) para superficies.
- **Énfasis sutil** (acento secundario) para eyebrows, badges, detalles.
- **Semántico:** verde (disponible/suceso), ámbar (alerta/destacado), rojo (error/no disponible).

### DUX-D27 — Metadatos de propiedades
`Precio` e `info de operación (venta/alquiler)` deben ser **siempre visibles** en tarjetas (P-02) y en detalle (P-03), sin requerir hover → transparencia y agilidad.

---

## 5. Estructura de secciones del Home (P-01)

Orden pensado para: **captar → mostrar → confiar → convertir.**

1. **Navbar** (`C-05`) — logo + nav + CTA, sticky (DUX-D20).
2. **Hero principal** — headline claro + CTA primario "Ver propiedades". Alto impacto visual (imagen/fondo).
3. **Buscador de propiedades** (`C-15` / `C-03` simplificado) — zona / operación / precio → P-02 con filtros pre-cargados.
4. **Propiedades destacadas** — grid de 3–6 tarjetas `C-01`.
5. **Categorías** (`C-21`) — tiles por tipo (Departamentos, Casas, PH, Locales, Terrenos) que pre-cargan el filtro en P-02.
6. **Propiedades recientes** — grid de tarjetas `C-01` ordenadas por fecha de publicación (más recientes primero).
7. **"Encontrá tu próximo hogar"** (`C-24`) — banda dual: buscador/CTA de compra + CTA de venta (sellers, va a P-06/vender).
8. **Agentes destacados** — grid de tarjetas `C-02` (3–4).
9. **Beneficios de trabajar con la inmobiliaria** — 4–6 beneficios (icono + título + texto) + estadísticas `C-19` (confianza).
10. **CTA de contacto** — dirigir a contacto/WhatsApp (C-17 + C-13) + newsletter (`C-18`).
11. **Footer** (`C-06`).

Cada sección usa una **unidad visual repetida** (misma altura de título, espaciado consistente 64–96px entre secciones) → ritmo y coherencia.

> **Nota de responsividad:** las secciones 4, 6 y 9 usan grillas que colapsan a 1 columna en mobile (DUX-D22); la sección 7 se apila (imagen + copy + CTAs) en mobile y se muestra en 2 columnas en desktop.

---

## 6. Estructura de páginas interiores (banda superior)

Páginas P-02, P-03, P-04, P-05, P-06, P-07, P-08, P-09 usan esta cabecera de página:
- **Breadcrumb** (`C-07`) — ubicación.
- **Título H1 + subtítulo** corto.
- Filtros o controles contextuales según la página (P-02 filtros, P-09 barra de acciones de favoritos).

---

## 7. Espaciado y ritmo

- **Espaciado vertical entre secciones:** 64px (mobile) / 96px (desktop).
- **Gutter entre tarjetas:** 16px (mobile) / 24px (tablet+) / 24px (desktop).
- **Padding del contenedor:** 16px mobile, 24px tablet/desktop.

---

## 8. Resumen de decisiones de layout (DUX)

| ID | Decisión |
|----|----------|
| D20 | Header sticky siempre visible. |
| D21 | Footer único en todas las páginas. |
| D22 | Mobile-first. |
| D23 | Filtros P-02: sidebar sticky en desktop, drawer en mobile. |
| D24 | Galería: carrusel en mobile, mosaico en desktop. |
| D25 | Sticky CTA de contacto en P-03 (mobile: barra inferior; desktop: columna). |
| D26 | Un CTA primario por vista. |
| D27 | Precio y operación siempre visibles. |
| D35 | Página de Servicios dedicada (autoridad + lead). |
| D36 | Favoritos con persistencia local (localStorage) en mockup; grid + estado vacío. |
| D37 | Sección "Categorías" en Home (tiles por tipo → pre-cargan filtro en P-02). |
| D38 | Sección "Propiedades recientes" en Home (grid por fecha de publicación). |
| D39 | Sección "Encontrá tu próximo hogar" (banda dual compra/venta). |
| D40 | Beneficios de la inmobiliaria como sección de 4–6 ítems + stats. |

> Próximo paso: el **Agente 02 — Branding** definirá paleta exacta, tipografías y estilo visual para aterrizar estos principios.
