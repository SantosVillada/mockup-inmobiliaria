# Integraciones futuras — mockup-inmobiliaria

> WhatsApp, Storage (imágenes), Email, mapa/geolocalización, notificaciones y opcionales (pagos, CRM, chat). Se listan en orden de prioridad para el **plan por fases** (ver `migracion-mockup.md`).

---

## 1. WhatsApp (canal principal)

### 1.1 Número institucional centralizado

- **DMK-13 / DBK-07:** el número institucional ya no se hardcodea; se lee de env (`NEXT_PUBLIC_WHATSAPP_NUMBER`) con fallback al valor demo.
- En Supabase, además, se guarda en la tabla `config` (claves `whatsapp_institucional`, `whatsapp_display`).
- **Ya aplicado en el mockup:** `web/lib/constants.ts` usa `process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5491155550000"`; `utils.waLinkGeneral()`, `FormularioVender` y `vender/page.tsx` usan esa constante.

### 1.2 Enlaces `wa.me`

- Formato: `https://wa.me/{numero}?text={mensaje}` con `encodeURIComponent`.
- **Por agente** usa `agentes.whatsapp`; **general** usa el número institucional.
- Mensajes pre-cargados por contexto: general, vender, por agente, por propiedad (ver `docs/marketing/whatsapp.md`).

### 1.3 Medición / notificaciones (futuro)

- Registrar clic en WhatsApp como `lead` con `canal = 'whatsapp'` (el mensaje pre-cargado ya califica el contexto).
- Opcional: API de WhatsApp Business (Cloud API) para enviar mensajes automáticos / notificar al asesor. Requiere el número verificado.

---

## 2. Almacenamiento de imágenes (Supabase Storage)

- Buckets: `propiedades` y `agentes` (públicos) — creados en `esquema-sql.md` §8.
- `propiedades.imagenes` (jsonb) guarda la **URL pública** de cada archivo; `agentes.foto` guarda la URL.
- **Migración de placeholders:** el mockup usa `picsum.photos` / `i.pravatar.cc`; en producción se suben fotos reales y se actualizan los campos.
- En el panel admin, el upload usa el cliente con `storage.from('propiedades').upload(...)` + `getPublicUrl`.

---

## 3. Email

- **Resend** (recomendado, simple) o **Supabase Email** (built-in).
- Env: `EMAIL_FROM`, `RESEND_API_KEY`.
- Casos de uso:
  - **Doble opt-in** del newsletter (recomendado en `docs/marketing/formularios.md` §3).
  - **Confirmación de visita** agendada (lead `tipo=visita`).
  - **Notificación al asesor** de un nuevo lead (email interno).
  - **Magic link** de login (Supabase Auth ya lo provee).
- Vía Resend API o un Edge Function de Supabase.

---

## 4. Mapa / geolocalización

- `propiedades.latitud` / `longitud` ya están en el modelo.
- El mockup usa un componente `Mapa.tsx` (placeholders). En producción:
  - **Leaflet + OpenStreetMap** (gratis, sin API key) o **Mapbox** (con key).
  - Marcar propiedades en `P-02` con un mapa de resultados.
- La dirección exacta se muestra como referencia; mantener privacidad del número de puerta si se prefiere (como en el mockup).

---

## 5. Notificaciones

- **Email** (asegurar asesor ve nuevos leads).
- **WhatsApp** (opcional, vía Cloud API).
- **In-app** (badge en el panel admin con leads `estado='nuevo'`).
- Se recomienda usar un **Edge Function** o un `trigger` de Postgres + webhook hacia un canal de aviso.

---

## 6. Opcionales (fase avanzada)

| Integración | Descripción | Prioridad |
|---|---|---|
| **Pagos** | MercadoPago (señal / reserva / pub de propiedad) para reservar visitas o publicaciones. | Baja |
| **CRM** | Conectar `leads` con un CRM (HubSpot, Pipedrive) o construir un mini-CRM en `/admin` (filtros por estado, notas, seguimiento). | Media |
| **Chat en vivo** | Widget de chat (Intercom, Crisp) como canal adicional al WhatsApp. | Baja |
| **Calendario** | Reserva de visitas con Google Calendar / Cal.com para sincronizar al asesor. | Media |
| **Analytics** | Medir `origen`/`canal` de leads (ya en el modelo) para optimizar el embudo. | Alta (fase 2) |

---

## 7. Prioridad recomendada

1. **WhatsApp** (ya casi listo) + persistencia de `leads`.
2. **Storage** de imágenes.
3. **Email** (confirmaciones + doble opt-in).
4. **Mapa** real.
5. **Notificaciones / Analytics**.
6. Opcionales (CRM, calendario, pagos, chat).

---

*Relacionado: `docs/backend/esquema-sql.md`, `docs/marketing/whatsapp.md`, `docs/marketing/formularios.md`.*
