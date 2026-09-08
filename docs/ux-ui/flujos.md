# Flujos de navegación e interacción — mockup-inmobiliaria

> Define **cómo navega el usuario** y **cómo interactúa** con cada patrón. Complementa `sitemap.md` y `componentes.md`.

---

## 1. Flujo principal (el recorrido más importante)

Objetivo: **llegar → buscar → ver propiedad → contactar/WhatsApp.**

```
1. LLEGAR
   - Usuario entra por Home (P-01) o por enlace externo (ej. publicidad / Google).
   - Ve el HERO + buscador (C-15). Decide su intención.

2. BUSCAR
   - Usa el buscador del hero → cae en Propiedades (P-02) con filtros pre-cargados.
   - O usa el menú "Propiedades" → P-02 y filtra con C-03.
   - Ajusta filtros (operación, zona, precio, ambientes, m²) y revisa resultados (C-01).

3. VER PROPIEDAD
   - Toca una tarjeta (C-01) → P-03 Detalle.
   - Recorre la galería (C-11), lee ficha técnica, ubicación y agente.
   - Compare con "similares" si lo necesita.

4. CONTACTAR / CONVERTIR
   - Acción directa: "WhatsApp" (C-13) → abre wa.me con mensaje pre-cargado.
   - Acción por formulario: "Contactar"/"Enviar consulta" (C-04) → success.
   - Acción intermedia: "Agendar visita" (modal C-18).
   - CTA sticky (C-17) siempre visible en P-03 (DUX-D25).

   ✔ CONTACTO DIRECTIVO → WhatsApp
   ✔ CONTACTO FORMATIVO  → Formulario
   ✔ CONTACTO PROGRAMADO → Reservar visita
```

### Variante "Voy a vender / soy propietario"
```
Home → CTA header "Vender mi propiedad" → P-06 contacto (o landing) → formulario
```
- Este flujo apunta a captar **sellers** (no solo compradores) → conversión de origen de propiedades. Lo profundiza el Agente 06.

---

## 2. Flujo de búsqueda y filtros (P-02)

```
Entrar a P-02
   → Vista default: lista completa (orden por relevancia/recientes).
   → Abrir/ver filtros (C-03):
        desktop → sidebar sticky
        mobile  → drawer (C-14) con botón "Filtros"
   → Seleccionar operación / tipo / zona / precio / ambientes / m²
   → "Aplicar" → se refresca la lista, se muestran chips (C-08) de filtros activos
   → Quitar un filtro → click en "×" del chip → se actualiza lista
   → "Limpiar" → restablece todo
   → Resultado: 0 → estado EMPTY (mensaje + botón limpiar); 1+ → grid con paginación (C-09)
```

**Patrón de interacción:** feedback en tiempo real de resultados (contador); los filtros **persisten** al ir y volver del detalle (o al menos al volver, se mantiene la última búsqueda en sesión). El Agente 03 puede implementar con URL params (`?tipo=venta&zona=...`) → **shareable / SEO-friendly**.

---

## 3. Flujo de galería (P-03)

```
Detalle → Galería C-11
   → Imagen principal grande.
   → Navegar con flechas / miniaturas / swipe (mobile).
   → Contador "1/8" + paginación de puntos.
   → (future) 360°/video.
   → "Pedir más fotos" → CTA a contacto (C-04).
```
**Patrón:** la galería se puede ampliar (lightbox/modal) en desktop; en mobile usa swipe nativo.

---

## 4. Flujo de formulario de contacto (P-06 / P-03 / P-05)

```
Abrir formulario (C-04)
   → Campos mínimos (nombre, teléfono/WhatsApp, e-mail opcional, mensaje).
   → Validación inline (empty → error, formato e-mail/teléfono → error).
   → Enviar → estado loading → success (mensaje "Recibimos tu consulta, te contactamos a la brevedad").
   → CTA post-success: "Seguir explorando propiedades" / "Volver a inicio".
```

**Patrón anti-fricción (base):**
- Preguntar lo mínimo indispensable (4 campos).
- WhatsApp como alternativa de 1 clic (sin formulario).
- En P-03, el formulario/CTA está en la columna sticky (DUX-D25) para no perder la acción.
- Mensajes de error en español, claros, junto al campo.

---

## 5. Flujo de newsletter (footer / modal)

```
Footer (C-06) o Modal (C-18)
   → Campo e-mail + "Suscribirme".
   → Validación e-mail → error/empty.
   → Éxito → "¡Listo! Te avisaremos de nuevas propiedades."
```
**Patrón:** mínimo 1 campo. Regla anti-spam y privacidad (link a política) — lo refuerza Agente 06.

---

## 6. Flujo WhatsApp (transversal, alta conversión)

```
Cualquier C-13 (header, footer, sticky de P-03, P-06, P-05)
   → abre wa.me/<número>?text=<mensaje pre-cargado>
   → el mensaje ya incluye el contexto (ej. "Hola, quiero info sobre {propiedad}").
```
**Patrón:** siempre con **mensaje pre-cargado** (menos fricción). Número y plantilla los define el backend/setup (Agente 07). Es el CTA de **mayor conversión** en inmobiliarias.

---

## 7. Flujo de navegación general (menú / breadcrumb)

```
Header C-05
   desktop: nav directa
   mobile: hamburguesa → drawer C-14 (nav + CTA)
Breadcrumb C-07 (interiores) → permite volver atrás sin perder contexto.
```

---

## 8. Flujo de perfil de agente (P-05)

```
Agentes (P-04) → C-02 → P-05 perfil
   → ver bio/experiencia/estadísticas
   → "WhatsApp" (C-13) o "Formulario" (C-04)
   → ver propiedades de ese agente (grid C-01)
```

---

## 9. Flujo de reserva de visita (P-03, modal)

```
CTA "Agendar visita" → Modal C-18
   → fecha/hora + datos de contacto (mini C-04)
   → confirmación
```
- Es una **intención más avanzada** que el simple contacto → se recomienda como modal para no salir de la página. (Si el backend lo permite, lo integra Agente 07.)

---

## 10. Patrones transversales de interacción

| Patrón | Regla |
|--------|-------|
| **CTA visible** | En toda vista con conversión hay un CTA primario visible sin scroll (DUX-D26). |
| **Feedback** | Toda acción tiene respuesta visual (hover, loading, toast/success, estado empty). |
| **Accesibilidad** | Teclado, focus visible, ARIA en modales/drawers/gallería. |
| **Persistencia de filtros** | Mantener estado de búsqueda al volver (URL params recomendado). |
| **Responsive** | Mobile-first; tap targets ≥ 44px; texto legible sin zoom. |
| **Consistencia** | Mismas convenciones de botones, chips, iconos en todo el sitio. |
| **Reducción de fricción** | 1 campo = 1 clic menos; pre-cargar mensajes y contexto. |

---

## DUX — Decisiones de flujo (resumen)

| ID | Decisión |
|----|----------|
| D29 | WhatsApp es el CTA de mayor conversión → mensaje pre-cargado, presente en header/footer/detalle/flotante mobile. |
| D30 | Formulario de contacto mínimo (≤4 campos), validación inline, success claro. |
| D31 | Filtros persistentes vía URL params (shareable / SEO). |
| D32 | "Agendar visita" como modal en P-03 (no abandona la página). |
| D33 | En P-03, CTA sticky siempre visible (barra inferior en mobile, columna en desktop). |
| D34 | Newsletter con 1 campo y confirmación de éxito. |

---

> **Próximo paso:** Agente 02 — Branding. Luego Agente 03 — Frontend implementará estos flujos.
