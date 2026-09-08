# Estrategia de Conversión / Marketing — mockup-inmobiliaria

> Documento de diseño (NO código). Define **cómo se convierte un visitante en cliente**: embudo, CTAs, WhatsApp, formularios, leads, técnicas de conversión y el flujo para **sellers** (propietarios que quieren vender/alquilar).
> Base para el **Agente 03 (Frontend)** y el **Agente 07 (Backend / Supabase)**.
> Convención de decisiones: `DMK-NN`.

---

## Índice de documentos

| Archivo | Qué contiene |
|---|---|
| [`README.md`](./README.md) | Este índice + resumen ejecutivo + reglas. |
| [`embudo.md`](./embudo.md) | Embudo de conversión (etapas) y **objetivos de conversión por página**. |
| [`ctas.md`](./ctas.md) | **Inventario de CTAs** de todo el sitio (texto, variante, ubicación, destino). Aterriza `DUX-D26`. |
| [`whatsapp.md`](./whatsapp.md) | Estrategia de **WhatsApp** (`C-13`): dónde va, número institucional y **mensajes pre-cargados** por contexto + flotante. |
| [`formularios.md`](./formularios.md) | Formularios: **contacto** (`C-04`), **vender mi propiedad** (sellers), **newsletter** (`C-15`), **reserva de visita** (`C-18`). |
| [`leads.md`](./leads.md) | **Modelo de datos de `leads`** + **estados del lead** (para backend futuro). |
| [`conversion.md`](./conversion.md) | **Técnicas de conversión**: confianza, urgencia/escasez, prueba social, copy de CTAs. |
| [`vender-propiedad.md`](./vender-propiedad.md) | **Landing / sección "Vender mi propiedad"** (flujo sellers): estructura y justificación. |

---

## Resumen ejecutivo

**Objetivo de negocio:** convertir a un visitante (comprador/locatario **o** propietario que quiere vender) en un **lead contactado**, priorizando **WhatsApp** como canal de mayor conversión y un único **CTA primario por vista** (`DUX-D26`).

**Principios rectores (aterrizan el tono de Branding `DBR-06`):**
1. **Verbo primero.** Todo CTA empieza por una acción ("Encontrá", "Consultá", "Vendé", "Agendá").
2. **Un CTA primario por vista.** El resto es secundario/terciario (`DUX-D26`).
3. **WhatsApp primero.** Mínima fricción, mensaje pre-cargado con contexto (`DUX-D29`).
4. **Formularios mínimos.** Máximo 4 campos para contacto; 1 campo para newsletter (`DUX-D30`, `DUX-D34`).
5. **Transparencia.** Precio y operación siempre visibles; sin letra chica (`DUX-D27`).
6. **Cercanía rioplatense.** Hablamos como personas, no como corporativo.

**Público y su "viaje" (mapea al embudo):**

| Persona | Intención | Etapa dominante | Canal preferido |
|---|---|---|---|
| **Buyer / renter** | Comprar / alquilar | Descubrir → Considerar → Decidir → Convertir | WhatsApp, formulario, visita |
| **Seller** | Vender / alquilar su propiedad | Considerar → Decidir → Convertir | "Vender mi propiedad" → WhatsApp / formulario |

---

## Decisiones de este agente (ID `DMK-NN`)

| ID | Decisión |
|----|----------|
| DMK-01 | Definir 4 etapas de embudo: **Descubrir → Considerar → Decidir → Convertir**, con **un objetivo de conversión (KPI) por página**. |
| DMK-02 | Aterrizar `DUX-D26`: **un CTA primario por vista**; inventario completo de CTAs por página con variante (primario/secundario/terciario). |
| DMK-03 | WhatsApp como **canal principal** (`DUX-D29`): header, footer, flotante mobile, detalle, agentes, perfil. **Número institucional placeholder** `5491155550000`. |
| DMK-04 | **Mensajes pre-cargados por contexto** (general, por propiedad, por agente), generados por el Frontend con `encodeURIComponent`. |
| DMK-05 | Formulario de contacto `C-04` con **≤4 campos**; estados (default/focus/error/loading/success) y mensajes de éxito en rioplatense. |
| DMK-06 | **Formulario "Vender mi propiedad"** para sellers: campos mínimos + datos de la propiedad; destino a **WhatsApp** (primario) o formulario (secundario). |
| DMK-07 | **Newsletter** con **1 campo** (e-mail) + confirmación (`DUX-D34`); reglas anti-spam y privacidad. |
| DMK-08 | **Reserva de visita** como **modal `C-18`** en `P-03` (`DUX-D32`): fecha/hora + datos mínimos. |
| DMK-09 | **Modelo de datos `leads`** orientado a Supabase; **estados del lead**: `nuevo, contactado, calificado, visitó, cerrado, perdido`. |
| DMK-10 | Mecanismos de captación de leads **priorizados**: WhatsApp > formulario > reserva de visita > newsletter > pedir más info/fotos. |
| DMK-11 | **Técnicas de conversión**: confianza (stats, agentes con cara, testimonios, garantías), urgencia/escasez (badges OPORTUNIDAD / NUEVO / EXCLUSIVO, "solo X disponibles"), prueba social. |
| DMK-12 | **Landing "Vender mi propiedad"** dedicada (sellers) con estructura y CTA principal a WhatsApp. |
| DMK-13 | Número institucional de WhatsApp como **placeholder configurable** en backend (`Agente 07`). |

---

## Reglas de uso para los agentes siguientes

1. **Agente 03 (Frontend):** leer `ctas.md` (inventario), `whatsapp.md` (mensajes pre-cargados y dónde va el flotante), `formularios.md` (campos/estados/success) y `conversion.md` (copy). Implementar **un CTA primario por vista** y los estados de los formularios.
2. **Agente 07 (Backend):** leer `leads.md` (modelo de datos y estados) y `formularios.md` (qué se envía por formulario). Crear tabla `leads`, RLS y endpoints de captura.
3. **Nada de este directorio es código de producción** — son decisiones y especificaciones.

---

*Relacionado: `docs/ux-ui/` (layout, componentes, flujos), `docs/branding/` (tono, estilo, tokens), `docs/propiedades/`, `docs/agentes/`. Decisiones: `DMK-*` en `historial-prompts/decisiones.md`.*
