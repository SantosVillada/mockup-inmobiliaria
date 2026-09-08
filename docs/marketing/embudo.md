# Embudo de conversión — mockup-inmobiliaria

> Define **cómo se convierte un visitante en cliente** en 4 etapas, qué página/acción corresponde a cada una, y el **objetivo de conversión (KPI)** de cada página.
> Complementa `docs/ux-ui/flujos.md` (flujo de navegación) y `docs/ux-ui/sitemap.md` (páginas).

---

## 1. Las 4 etapas del embudo

```
DESCUBRIR  →  CONSIDERAR  →  DECIDIR  →  CONVERTIR
 (llega y    (evalúa y      (elige y     (contacta /
  entiende)    compara)       decide)      se convierte)
```

| Etapa | Qué hace el usuario | Página(s) protagonistas | Acción clave | KPI de la etapa |
|---|---|---|---|---|
| **1. Descubrir** | Llega al sitio y entiende qué es; empieza a buscar. | **P-01 Home** · **P-02 Propiedades** | Buscar / filtrar / ver tarjetas | % que inicia una búsqueda o hace clic a un detalle. |
| **2. Considerar** | Evalúa opciones concretas y genera confianza. | **P-03 Detalle** · **P-04 Agentes** · **P-05 Perfil** · **P-07 Nosotros** | Leer detalle, comparar, conocer al agente | % que pasa de listado a detalle; tiempo en detalle; scroll hasta CTAs. |
| **3. Decidir** | Elige el canal de contacto (toma la decisión). | **P-03 Detalle** · **P-05 Perfil** | Click en WhatsApp / form / agendar visita | % que hace clic en un CTA de contacto. |
| **4. Convertir** | Deja sus datos o abre WhatsApp → **se genera el lead**. | **P-06 Contacto** · formularios · newsletter · WhatsApp | Enviar consulta / suscribirse / iniciar chat | **Nº de leads** y tasa de conversión a lead. |

> **Regla:** cada página tiene **UN CTA primario** que la lleva a la siguiente etapa del embudo. Los CTAs nunca deben "saltar" etapas innecesariamente, salvo el CTA de **WhatsApp**, que es atajo directo a Convertir en cualquier momento.

---

## 2. Objetivos de conversión por página (KPI)

| ID Página | Página | Objetivo de conversión (KPI) | CTA primario que lo logra | Métrica a medir |
|---|---|---|---|---|
| **P-01** | Home | **Iniciar la búsqueda o avanzar a propiedades.** | "Ver propiedades" (hero) / buscador `C-15` | % clic en "Ver propiedades" / envío del mini-buscador. |
| **P-02** | Propiedades | **Llegar a un detalle (P-03).** | "Ver detalles" (tarjeta `C-01`) | % de tarjetas clickeadas → detalle. |
| **P-03** | Detalle | **Contactar / WhatsApp / agendar visita.** | "Consultá por WhatsApp" (sticky) | % clic CTA primario; nº de leads de visita. |
| **P-04** | Agentes | **Ir a un perfil o contactar directo.** | "Ver perfil" / WhatsApp (tarjeta `C-02`) | % clic a perfil; clics a WhatsApp. |
| **P-05** | Perfil Agente | **Contactar a ese agente.** | "Consultá por WhatsApp" | % clic WhatsApp / envío de formulario. |
| **P-06** | Contacto | **Recibir una consulta (lead) o abrir WhatsApp.** | "Enviar consulta" / WhatsApp | Nº de formularios enviados; clics a WhatsApp. |
| **P-07** | Nosotros | **Generar confianza y derivar a Propiedades/Contacto.** | "Ver propiedades" (CTA de cierre) | % clic en CTA de cierre. |

### Matriz: página → etapa → KPI (resumen para el Agente 03/07)

| Página | Etapa | KPI primario | CTA primario | Dato que manda al backend |
|---|---|---|---|---|
| P-01 Home | Descubrir | Clic "Ver propiedades" | Ver propiedades | `origen=home` en el lead. |
| P-02 Propiedades | Descubrir | Clic a detalle | Ver detalles | `origen=propiedades`. |
| P-03 Detalle | Considerar→Decidir | Clic WhatsApp / visita | Consultá por WhatsApp | `propiedad_id` + `origen=detalle`. |
| P-04 Agentes | Considerar | Clic a perfil / WhatsApp | Ver perfil | `agente_id` + `origen=agentes`. |
| P-05 Perfil | Decidir | Clic WhatsApp / form | Consultá por WhatsApp | `agente_id` + `origen=perfil`. |
| P-06 Contacto | Convertir | Form enviado / WhatsApp | Enviar consulta | `origen=contacto`. |
| P-07 Nosotros | Considerar | Clic a propiedades | Ver propiedades | `origen=nosotros`. |

---

## 3. Cómo fluye el usuario (recorrido esperado)

### 3.1 Buyer / Renter (comprador o locatario)

```
Home (P-01) → [buscador / "Ver propiedades"] → Propiedades (P-02)
   → filtra → hace clic en tarjeta → Detalle (P-03)
      → lee galería/ficha/agente → decide:
          ✓ "Consultá por WhatsApp"  → lead inmediato (conversión rápida)
          ✓ "Contactar" (form C-04)  → lead (conversión formal)
          ✓ "Agendar visita" (modal) → lead (intención avanzada)
   → "propiedades similares" si quiere comparar → otro P-03
```

### 3.2 Seller (propietario que quiere vender/alquilar)

```
Home / header → "Vender mi propiedad" → Landing sellers (sección dedicada)
   → entiende el servicio → CTA:
       ✓ "Vendé tu propiedad por WhatsApp" → lead inmediato
       ✓ "Dejá tus datos" (form seller)    → lead formal
   → vuelve a "Ver propiedades" si también busca comprar
```

### 3.3 Usuario que llega por una "persona" (confianza)

```
Home → "Agentes destacados" → Agentes (P-04) → Perfil (P-05)
   → conoce al asesor → "Consultá por WhatsApp" / "Contactar"
   → ve sus propiedades → Detalle (P-03)
```

---

## 4. Puntos de fricción a eliminar (reglas de conversión)

1. **Nunca un CTA primario compite con otro primario** en la misma vista (`DUX-D26`).
2. **El CTA primario siempre es visible sin scroll** en vistas de conversión (`DUX-D20` header sticky, `DUX-D25/D33` CTA sticky en P-03).
3. **WhatsApp con mensaje pre-cargado** — el usuario no escribe nada (`DUX-D29`, `DMK-04`).
4. **Formularios mínimos** — 4 campos máximo de contacto, 1 campo newsletter (`DUX-D30`, `DUX-D34`).
5. **Sin páginas en construcción** — todo estado vacío tiene mensaje + acción (`DUX-D28`).
6. **Transparencia** — precio/operación siempre visibles; no pedir datos sensibles antes de la conversión (`DUX-D27`).

---

## 5. Vistas y el CTA primario que las gobierna (para el Agente 03)

| Vista | CTA primario (uno solo) | Secundarios permitidos | Terciarios |
|---|---|---|---|
| Header (todas) | "Vender mi propiedad" | "Consultar" (solo si no hay primario de página) | Links de nav |
| Hero Home | "Ver propiedades" | "Vender mi propiedad" | Buscar (C-15) |
| P-03 sticky | "Consultá por WhatsApp" | "Contactar" · "Agendar visita" | "Pedir más fotos" |
| P-05 header | "Consultá por WhatsApp" | "Contactar" · "Ver propiedades" | — |
| P-06 | "Enviar consulta" | WhatsApp | Suscribirme (footer) |
| Footer | WhatsApp (general) | "Suscribirme" (newsletter) | Links de nav |

> Ver inventario completo en [`ctas.md`](./ctas.md).

---

*Relacionado: [`ctas.md`](./ctas.md) (inventario), [`whatsapp.md`](./whatsapp.md) (canal principal), [`conversion.md`](./conversion.md) (técnicas). Decisiones: `DMK-01`, `DMK-02` en `historial-prompts/decisiones.md`.*
