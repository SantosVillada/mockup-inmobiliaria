# Datos demo de agentes — mockup-inmobiliaria

> **5 agentes de ejemplo** para el mockup, con nombres, cargos, especialidades, idiomas, fotos placeholder y la **asignación de las propiedades demo** (`agt-01`…`agt-04`) definidas en [`docs/propiedades/datos-demo.md`](../propiedades/datos-demo.md).
> Estructura según [`modelo-datos.md`](./modelo-datos.md).

## 0. Consideraciones

- **Nombre mostrado:** `nombre + apellido`. El **slug** usa ambos.
- **Fotos placeholder:** `https://i.pravatar.cc/600x800?img={n}` (retrato determinista). **En producción se reemplazan por fotos reales**; el `alt` describe la foto esperada.
- **`whatsapp`:** solo dígitos con código de país `54911...` (Argentina). Se usa en `wa.me/{whatsapp}`.
- **Especialidades / idiomas / zonas:** claves de las listas controladas (ver [`modelo-datos.md`](./modelo-datos.md) §3, §5, §7).
- **`agente_id`:** coincide con el `agente_id` de las propiedades demo (`agt-01`…`agt-04`). El agente `agt-05` es el director y **no tiene propiedades asignadas** en el mockup (demuestra el estado vacío de `P-05`).

## 1. Resumen (tabla)

| ID | Nombre | Cargo | Especialidades | Idiomas | Zona de cobertura | Propiedades asignadas |
|---|---|---|---|---|---|---|
| `agt-01` | Sofía Domínguez | Asesor inmobiliario | residencial, venta-departamentos, alquileres | espanol, ingles | palermo, caballito, barrio-norte | prop-001, prop-005, prop-009 |
| `agt-02` | Martín Aguirre | Asesor senior | venta-departamentos, ph, obra-nueva | espanol | belgrano, recoleta, vicente-lopez | prop-002, prop-006, prop-010 |
| `agt-03` | Valentina Paz | Asesor inmobiliario | ph, residencial, alquileres | espanol, portugues | san-telmo, nunez, la-plata | prop-003, prop-007 |
| `agt-04` | Julián Otero | Especialista en inversión | inversion, venta-departamentos, comercial | espanol, ingles | puerto-madero, vicente-lopez | prop-004, prop-008 |
| `agt-05` | Carolina Ferrer | Director comercial | inversion, obra-nueva, residencial | espanol, ingles, italiano | (todas) | — (sin propiedades en demo) |

## 2. Registros (formato JSON de ejemplo)

> Para que el Agente 03 los use tal cual (data local o seed del backend).

### Agente 1 — Sofía Domínguez
```json
{
  "id": "agt-01",
  "slug": "sofia-dominguez",
  "nombre": "Sofía",
  "apellido": "Domínguez",
  "email": "sofia.dominguez@morada.com.ar",
  "telefono": "+54 9 11 5555 1001",
  "whatsapp": "5491155551001",
  "foto": "https://i.pravatar.cc/600x800?img=47",
  "cargo": "asesor",
  "especialidades": ["residencial", "venta-departamentos", "alquileres"],
  "idiomas": ["espanol", "ingles"],
  "bio": "Soy Sofía y hace 6 años que acompañó a personas a encontrar su lugar en la ciudad. Me especializo en departamentos y alquileres en Palermo, Caballito y Barrio Norte. Me gusta que la búsqueda sea simple y sin vueltas: escucho qué necesitás, te muestro opciones concretas y te acompañó hasta la firma. Si querés vender o alquilar tu propiedad, también te ayudo a hacerlo en el mejor momento.",
  "anios_experiencia": 6,
  "estadisticas": { "operaciones_cerradas": 84, "propiedades_vendidas": 51, "clientes_atendidos": 190, "satisfaccion": 97 },
  "zona_cobertura": ["palermo", "caballito", "barrio-norte"],
  "redes": { "linkedin": "https://linkedin.com/in/sofia-dominguez", "instagram": "https://instagram.com/sofia.dominguez" },
  "activo": true,
  "orden": 1,
  "publicado_en": "2026-01-10T09:00:00Z"
}
```

### Agente 2 — Martín Aguirre
```json
{
  "id": "agt-02",
  "slug": "martin-aguirre",
  "nombre": "Martín",
  "apellido": "Aguirre",
  "email": "martin.aguirre@morada.com.ar",
  "telefono": "+54 9 11 5555 1002",
  "whatsapp": "5491155551002",
  "foto": "https://i.pravatar.cc/600x800?img=12",
  "cargo": "asesor-senior",
  "especialidades": ["venta-departamentos", "ph", "obra-nueva"],
  "idiomas": ["espanol"],
  "bio": "Soy Martín, asesor senior con más de 12 años en el mercado inmobiliario porteño. Trabajo sobre todo en Belgrano, Recoleta y el norte, donde conozco cada zona de memoria. Me dedico a casas, PHs y obra nueva. Mi prioridad es que compres con tranquilidad: te cuento todo lo que hay que saber, sin letra chica, y negocio por vos.",
  "anios_experiencia": 12,
  "estadisticas": { "operaciones_cerradas": 156, "propiedades_vendidas": 118, "clientes_atendidos": 340, "satisfaccion": 98 },
  "zona_cobertura": ["belgrano", "recoleta", "vicente-lopez"],
  "redes": { "linkedin": "https://linkedin.com/in/martin-aguirre" },
  "activo": true,
  "orden": 2,
  "publicado_en": "2026-02-05T10:00:00Z"
}
```

### Agente 3 — Valentina Paz
```json
{
  "id": "agt-03",
  "slug": "valentina-paz",
  "nombre": "Valentina",
  "apellido": "Paz",
  "email": "valentina.paz@morada.com.ar",
  "telefono": "+54 9 11 5555 1003",
  "whatsapp": "5491155551003",
  "foto": "https://i.pravatar.cc/600x800?img=32",
  "cargo": "asesor",
  "especialidades": ["ph", "residencial", "alquileres"],
  "idiomas": ["espanol", "portugues"],
  "bio": "Hola, soy Valentina. Amo los PHs y las casas con historia. Trabajo en San Telmo, Núñez y la zona sur, donde hay propiedades con un encanto que no se repite. Además de vender, hago muchas alquileres: si buscás algo para mudarte ya, o querés poner tu propiedad en alquiler, hablamos. Me gusta responder rápido y hacerte la vida más fácil.",
  "anios_experiencia": 8,
  "estadisticas": { "operaciones_cerradas": 97, "propiedades_vendidas": 60, "clientes_atendidos": 230, "satisfaccion": 96 },
  "zona_cobertura": ["san-telmo", "nunez", "la-plata"],
  "redes": { "instagram": "https://instagram.com/valentina.paz" },
  "activo": true,
  "orden": 3,
  "publicado_en": "2026-03-01T11:00:00Z"
}
```

### Agente 4 — Julián Otero
```json
{
  "id": "agt-04",
  "slug": "julian-otero",
  "nombre": "Julián",
  "apellido": "Otero",
  "email": "julian.otero@morada.com.ar",
  "telefono": "+54 9 11 5555 1004",
  "whatsapp": "5491155551004",
  "foto": "https://i.pravatar.cc/600x800?img=59",
  "cargo": "especialista-inversion",
  "especialidades": ["inversion", "venta-departamentos", "comercial"],
  "idiomas": ["espanol", "ingles"],
  "bio": "Soy Julián y me dedico a inversión inmobiliaria. Analizo rentabilidad, obra nueva y oportunidades comerciales, sobre todo en Puerto Madero y el norte. Si querés comprar para invertir o entender el mercado antes de decidir, te preparo el análisis completo. Hablamos en pesos o en dólares, como te resulte más claro.",
  "anios_experiencia": 10,
  "estadisticas": { "operaciones_cerradas": 132, "propiedades_vendidas": 89, "clientes_atendidos": 210, "satisfaccion": 99 },
  "zona_cobertura": ["puerto-madero", "vicente-lopez"],
  "redes": { "linkedin": "https://linkedin.com/in/julian-otero" },
  "activo": true,
  "orden": 4,
  "publicado_en": "2026-04-12T14:00:00Z"
}
```

### Agente 5 — Carolina Ferrer (Director Comercial)
```json
{
  "id": "agt-05",
  "slug": "carolina-ferrer",
  "nombre": "Carolina",
  "apellido": "Ferrer",
  "email": "carolina.ferrer@morada.com.ar",
  "telefono": "+54 9 11 5555 1005",
  "whatsapp": "5491155551005",
  "foto": "https://i.pravatar.cc/600x800?img=44",
  "cargo": "director-comercial",
  "especialidades": ["inversion", "obra-nueva", "residencial"],
  "idiomas": ["espanol", "ingles", "italiano"],
  "bio": "Soy Carolina, directora comercial del equipo. Coordino a los asesores y superviso cada operación para que todo salga impecable. Si tenés un proyecto grande, buscás una propiedad de alto valor o querés vender algo especial, estoy a un mensaje de distancia. Con 15 años de experiencia, sé cómo se resuelven las operaciones complejas.",
  "anios_experiencia": 15,
  "estadisticas": { "operaciones_cerradas": 240, "propiedades_vendidas": 175, "clientes_atendidos": 420, "satisfaccion": 98 },
  "zona_cobertura": ["palermo", "recoleta", "belgrano", "puerto-madero", "vicente-lopez"],
  "redes": { "linkedin": "https://linkedin.com/in/carolina-ferrer" },
  "activo": true,
  "orden": 5,
  "publicado_en": "2026-05-20T16:00:00Z"
}
```

> **Nota:** `agt-05` no tiene propiedades asignadas en el mockup para demostrar el **estado vacío** de la sección de propiedades del perfil (DUX-D28). En producción tendrá cartera.

## 3. Asignación de propiedades demo (`agente_id`)

| Agente | Propiedades asignadas (de `docs/propiedades/datos-demo.md`) |
|---|---|
| `agt-01` Sofía Domínguez | `prop-001` (Depto Palermo Soho) · `prop-005` (Local Caballito) · `prop-009` (Mono Barrio Norte) |
| `agt-02` Martín Aguirre | `prop-002` (Casa Belgrano) · `prop-006` (Depto Recoleta alquiler) · `prop-010` (Casa Vicente López) |
| `agt-03` Valentina Paz | `prop-003` (PH San Telmo) · `prop-007` (Casa Núñez alquiler) |
| `agt-04` Julián Otero | `prop-004` (Depto Puerto Madero) · `prop-008` (Terreno Vicente López) |
| `agt-05` Carolina Ferrer | — (ninguna en demo) |

- Esta asignación **ya está reflejada** en el campo `agente_id` de cada propiedad demo (ver [`docs/propiedades/datos-demo.md`](../propiedades/datos-demo.md)).
- **Coherencia:** cada agente cubre las zonas de sus propiedades (p. ej. `agt-01` tiene propiedades en Palermo/Caballito/Barrio Norte y su `zona_cobertura` coincide).

## 4. Notas de uso para el Agente 03

1. **`P-04` (grid de agentes):** mostrar los 5, ordenados por `orden` asc. Usar tarjeta `C-02` estándar.
2. **`P-01` (destacados):** mostrar 3–4 agentes (`orden` 1–4) con la variante **destacada** de `C-02`.
3. **`P-05` (perfil):** cada `slug` mapea a su agente. `C-16` + grid de `C-01` con sus propiedades activas (ver §3).
4. **`P-03` (detalle):** el `agente_id` de la propiedad resuelve al agente → tarjeta `C-02` variante **perfil** (ver [`tarjeta.md`](./tarjeta.md) §3.4).
5. **Estado vacío:** `agt-05` (Carolina) no tiene propiedades → demostrar el mensaje de estado vacío del grid (DUX-D28).
6. **WhatsApp:** usar `whatsapp` (dígitos) en `wa.me/{whatsapp}` con el mensaje pre-cargado (ver [`contacto.md`](./contacto.md) §3).

---

*Datos demo basados en [`modelo-datos.md`](./modelo-datos.md). Decisiones: `DAG-*` en `historial-prompts/decisiones.md`.*
