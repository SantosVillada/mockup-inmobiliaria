# Datos demo de propiedades — mockup-inmobiliaria

> **10 propiedades de ejemplo** para el mockup, con datos realistas en **español rioplatense** y variando operación/tipo/zona/precio. El Agente 03 (Frontend) usa estos datos para poblar `P-01`, `P-02`, `P-03` y `P-05`. Estructura según [`modelo-datos.md`](./modelo-datos.md).

## 0. Consideraciones

- **Moneda:** `ARS` (Pesos Argentinos). El campo `moneda` es configurable (ver modelo-datos).
- **Precio:** venta = valor total; **alquiler = precio mensual** ("por mes").
- **Imágenes placeholder:** se usan `https://picsum.photos/seed/{slug}-{n}/800/600` (deterministas). **En producción se reemplazan por fotos reales**; el `alt` describe la foto real esperada.
- **`agente_id`:** valores demo (`agt-01`…`agt-04`). La definición de agentes la hace el **Agente 05**.
- **`publicado_en`:** se usa para ordenar por "más recientes" y badge NUEVO.

## 1. Resumen (tabla)

| # | Título | Operación | Tipo | Zona | Precio | m² | Amb/Dorm/Baño | Estado | Destacado |
|---|--------|-----------|------|------|--------|----|---------------|--------|-----------|
| 1 | Departamento 2 ambientes en Palermo Soho | venta | departamento | Palermo | $ 320.000.000 | 85 | 3/2/2 | NUEVO | ✅ |
| 2 | Casa familiar con jardín en Belgrano | venta | casa | Belgrano | $ 890.000.000 | 400 (280 cub) | 5/4/3 | EXCLUSIVO | ✅ |
| 3 | PH con terraza en San Telmo | venta | ph | San Telmo | $ 145.000.000 | 70 | 3/2/1 | OPORTUNIDAD | — |
| 4 | Departamento premium con vista al río en Puerto Madero | venta | departamento | Puerto Madero | $ 1.450.000.000 | 180 | 4/3/3 | EXCLUSIVO | ✅ |
| 5 | Local comercial en Caballito | alquiler | local | Caballito | $ 1.900.000 /mes | 120 | 2/0/1 | — | — |
| 6 | Departamento amoblado en Recoleta | alquiler | departamento | Recoleta | $ 780.000 /mes | 55 | 2/1/1 | — | — |
| 7 | Casa con jardín en Núñez | alquiler | casa | Núñez | $ 1.400.000 /mes | 180 | 4/3/2 | — | — |
| 8 | Terreno en Vicente López | venta | terreno | Vicente López | $ 380.000.000 | 850 | — | — | — |
| 9 | Departamento 1 ambiente en Barrio Norte | venta | departamento | Barrio Norte | $ 95.000.000 | 48 | 1/1/1 | OPORTUNIDAD | — |
| 10 | Casa moderna 5 dormitorios en Vicente López | venta | casa | Vicente López | $ 1.250.000.000 | 600 (420 cub) | 6/5/4 | NUEVO | ✅ |

## 2. Registros (formato JSON de ejemplo)

> Para que el Agente 03 los use tal cual (data local o seed del backend).

### Propiedad 1 — Departamento en Palermo Soho
```json
{
  "id": "prop-001",
  "slug": "depto-2-ambientes-palermo-soho",
  "codigo": "REF-MOR-001",
  "titulo": "Departamento 2 ambientes en Palermo Soho",
  "descripcion": "Departamento luminoso a estrenar en el corazón de Palermo Soho. Living amplio, cocina integrada con isla, dos dormitorios con placares y dos baños completos. A pasos de Plaza Serrano, con todos los servicios y la vida nocturna que hace única a la zona. Cochera y baulera opcionales.",
  "precio": 320000000,
  "moneda": "ARS",
  "operacion": "venta",
  "tipo": "departamento",
  "zona": "palermo",
  "ciudad": "Buenos Aires",
  "direccion": "Gorriti al 4800, Palermo",
  "ambientes": 3,
  "dormitorios": 2,
  "banos": 2,
  "superficie_total_m2": 85,
  "superficie_cubierta_m2": 70,
  "antiguedad_anios": 8,
  "disponible": true,
  "estado": "nuevo",
  "destacado": true,
  "caracteristicas": ["balcon", "cochera", "placares", "aire", "wifi", "porteria"],
  "latitud": -34.5887,
  "longitud": -58.4319,
  "agente_id": "agt-01",
  "publicado_en": "2026-08-20T10:00:00Z",
  "imagenes": [
    { "url": "https://picsum.photos/seed/palermo-soho-1/800/600", "alt": "Living principal del departamento en Palermo Soho", "orden": 1 },
    { "url": "https://picsum.photos/seed/palermo-soho-2/800/600", "alt": "Cocina integrada con isla", "orden": 2 },
    { "url": "https://picsum.photos/seed/palermo-soho-3/800/600", "alt": "Dormitorio principal con placares", "orden": 3 },
    { "url": "https://picsum.photos/seed/palermo-soho-4/800/600", "alt": "Baño completo en mármol", "orden": 4 }
  ]
}
```

### Propiedad 2 — Casa familiar en Belgrano
```json
{
  "id": "prop-002",
  "slug": "casa-familiar-belgrano",
  "codigo": "REF-MOR-002",
  "titulo": "Casa familiar con jardín en Belgrano",
  "descripcion": "Casa clásica de categoría en Belgrano R. Lote de 400 m² con 280 m² cubiertos. Cuatro dormitorios, tres baños, living comedor con ventanales al jardín, parrilla y cochera para dos autos. Ideal para familias que buscan espacio, privacidad y una zona de primer nivel, cerca de colegios y del bajo Belgrano.",
  "precio": 890000000,
  "moneda": "ARS",
  "operacion": "venta",
  "tipo": "casa",
  "zona": "belgrano",
  "ciudad": "Buenos Aires",
  "direccion": "Melian al 2800, Belgrano",
  "ambientes": 5,
  "dormitorios": 4,
  "banos": 3,
  "superficie_total_m2": 400,
  "superficie_cubierta_m2": 280,
  "antiguedad_anios": 35,
  "disponible": true,
  "estado": "exclusivo",
  "destacado": true,
  "caracteristicas": ["jardin", "parrilla", "cochera", "patio", "calefaccion", "placares"],
  "latitud": -34.5600,
  "longitud": -58.4560,
  "agente_id": "agt-02",
  "publicado_en": "2026-07-15T09:00:00Z",
  "imagenes": [
    { "url": "https://picsum.photos/seed/belgrano-casa-1/800/600", "alt": "Fachada de la casa en Belgrano", "orden": 1 },
    { "url": "https://picsum.photos/seed/belgrano-casa-2/800/600", "alt": "Jardín trasero con parrilla", "orden": 2 },
    { "url": "https://picsum.photos/seed/belgrano-casa-3/800/600", "alt": "Living comedor con ventanales al jardín", "orden": 3 },
    { "url": "https://picsum.photos/seed/belgrano-casa-4/800/600", "alt": "Dormitorio principal en suite", "orden": 4 }
  ]
}
```

### Propiedad 3 — PH con terraza en San Telmo
```json
{
  "id": "prop-003",
  "slug": "ph-san-telmo-luz",
  "codigo": "REF-MOR-003",
  "titulo": "PH con terraza en San Telmo",
  "descripcion": "PH de estilo con entrada independiente y terraza propia en San Telmo. Tres ambientes, dos dormitorios y un baño. Recientemente refaccionado, con mucha luz y detalles de época conservados. A pasos de Defensa y del Mercado de San Telmo, en una de las zonas con más encanto de la ciudad.",
  "precio": 145000000,
  "moneda": "ARS",
  "operacion": "venta",
  "tipo": "ph",
  "zona": "san-telmo",
  "ciudad": "Buenos Aires",
  "direccion": "Carlos Calvo al 1200, San Telmo",
  "ambientes": 3,
  "dormitorios": 2,
  "banos": 1,
  "superficie_total_m2": 70,
  "superficie_cubierta_m2": 60,
  "antiguedad_anios": 50,
  "disponible": true,
  "estado": "oportunidad",
  "destacado": false,
  "caracteristicas": ["terraza", "patio", "calefaccion"],
  "latitud": -34.6220,
  "longitud": -58.3710,
  "agente_id": "agt-03",
  "publicado_en": "2026-08-01T11:00:00Z",
  "imagenes": [
    { "url": "https://picsum.photos/seed/san-telmo-ph-1/800/600", "alt": "Fachada del PH en San Telmo", "orden": 1 },
    { "url": "https://picsum.photos/seed/san-telmo-ph-2/800/600", "alt": "Living con techos altos y detalles de época", "orden": 2 },
    { "url": "https://picsum.photos/seed/san-telmo-ph-3/800/600", "alt": "Terraza propia", "orden": 3 }
  ]
}
```

### Propiedad 4 — Departamento premium en Puerto Madero
```json
{
  "id": "prop-004",
  "slug": "depto-puerto-madero-vista",
  "codigo": "REF-MOR-004",
  "titulo": "Departamento premium con vista al río en Puerto Madero",
  "descripcion": "Departamento de categoría en torre premium de Puerto Madero, con vista frontal al río. Tres dormitorios en suite, living comedor amplio, cocina de diseño con isla, y un piso completo de amenities: pileta, gym, SUM y seguridad 24 hs. Cochera y baulera incluidas. Una de las mejores ubicaciones de la ciudad.",
  "precio": 1450000000,
  "moneda": "ARS",
  "operacion": "venta",
  "tipo": "departamento",
  "zona": "puerto-madero",
  "ciudad": "Buenos Aires",
  "direccion": "Aimé Painé al 1500, Puerto Madero",
  "ambientes": 4,
  "dormitorios": 3,
  "banos": 3,
  "superficie_total_m2": 180,
  "superficie_cubierta_m2": 150,
  "antiguedad_anios": 3,
  "disponible": true,
  "estado": "exclusivo",
  "destacado": true,
  "caracteristicas": ["piscina-comun", "gym", "sum", "porteria", "domotica", "wifi", "cochera"],
  "latitud": -34.6137,
  "longitud": -58.3660,
  "agente_id": "agt-04",
  "publicado_en": "2026-08-25T14:00:00Z",
  "imagenes": [
    { "url": "https://picsum.photos/seed/madero-1/800/600", "alt": "Vista al río desde el living", "orden": 1 },
    { "url": "https://picsum.photos/seed/madero-2/800/600", "alt": "Cocina de diseño con isla", "orden": 2 },
    { "url": "https://picsum.photos/seed/madero-3/800/600", "alt": "Dormitorio principal en suite", "orden": 3 },
    { "url": "https://picsum.photos/seed/madero-4/800/600", "alt": "Pileta del piso de amenities", "orden": 4 }
  ]
}
```

### Propiedad 5 — Local comercial en Caballito
```json
{
  "id": "prop-005",
  "slug": "local-comercial-caballito",
  "codigo": "REF-MOR-005",
  "titulo": "Local comercial en Caballito",
  "descripcion": "Local comercial a la calle sobre una de las avenidas más transitadas de Caballito. 120 m² con vidriera amplia, depósito y baño. Ideal para gastronomía, retail o showroom. Muy buena visibilidad y paso de gente constante. Se alquila por mes.",
  "precio": 1900000,
  "moneda": "ARS",
  "operacion": "alquiler",
  "tipo": "local",
  "zona": "caballito",
  "ciudad": "Buenos Aires",
  "direccion": "Av. Rivadavia al 5400, Caballito",
  "ambientes": 2,
  "dormitorios": 0,
  "banos": 1,
  "superficie_total_m2": 120,
  "superficie_cubierta_m2": 110,
  "antiguedad_anios": 15,
  "disponible": true,
  "estado": "default",
  "destacado": false,
  "caracteristicas": ["deposito", "alarma", "porton-electrico"],
  "latitud": -34.6190,
  "longitud": -58.4420,
  "agente_id": "agt-01",
  "publicado_en": "2026-08-10T09:30:00Z",
  "imagenes": [
    { "url": "https://picsum.photos/seed/caballito-local-1/800/600", "alt": "Vidriera del local en Caballito", "orden": 1 },
    { "url": "https://picsum.photos/seed/caballito-local-2/800/600", "alt": "Interior del local", "orden": 2 },
    { "url": "https://picsum.photos/seed/caballito-local-3/800/600", "alt": "Depósito trasero", "orden": 3 }
  ]
}
```

### Propiedad 6 — Departamento amoblado en Recoleta
```json
{
  "id": "prop-006",
  "slug": "depto-recoleta-alquiler",
  "codigo": "REF-MOR-006",
  "titulo": "Departamento amoblado en Recoleta",
  "descripcion": "Departamento amoblado de 2 ambientes en Recoleta, ideal para profesionales o parejas. Listo para mudarse: equipado con aire acondicionado, internet y todo lo necesario. Edificio con ascensor y portería. A pasos de la Facultad de Medicina, de subtes y de los parques. Se alquila por mes.",
  "precio": 780000,
  "moneda": "ARS",
  "operacion": "alquiler",
  "tipo": "departamento",
  "zona": "recoleta",
  "ciudad": "Buenos Aires",
  "direccion": "Av. Santa Fe al 1700, Recoleta",
  "ambientes": 2,
  "dormitorios": 1,
  "banos": 1,
  "superficie_total_m2": 55,
  "superficie_cubierta_m2": 50,
  "antiguedad_anios": 25,
  "disponible": true,
  "estado": "default",
  "destacado": false,
  "caracteristicas": ["amoblado", "ascensor", "porteria", "aire", "wifi"],
  "latitud": -34.5902,
  "longitud": -58.3972,
  "agente_id": "agt-02",
  "publicado_en": "2026-08-30T12:00:00Z",
  "imagenes": [
    { "url": "https://picsum.photos/seed/recoleta-depto-1/800/600", "alt": "Living amoblado del departamento", "orden": 1 },
    { "url": "https://picsum.photos/seed/recoleta-depto-2/800/600", "alt": "Dormitorio con placares", "orden": 2 },
    { "url": "https://picsum.photos/seed/recoleta-depto-3/800/600", "alt": "Cocina equipada", "orden": 3 }
  ]
}
```

### Propiedad 7 — Casa con jardín en Núñez
```json
{
  "id": "prop-007",
  "slug": "casa-nunez-alquiler",
  "codigo": "REF-MOR-007",
  "titulo": "Casa con jardín en Núñez",
  "descripcion": "Casa con jardín en Núñez, a una cuadra del paseo de la costa. Tres dormitorios, dos baños, living comedor amplio, parrilla y cochera. Ideal para familias que quieren vivir con aire y verde sin alejarse de la ciudad. Se alquila por mes.",
  "precio": 1400000,
  "moneda": "ARS",
  "operacion": "alquiler",
  "tipo": "casa",
  "zona": "nunez",
  "ciudad": "Buenos Aires",
  "direccion": "Av. del Libertador al 6900, Núñez",
  "ambientes": 4,
  "dormitorios": 3,
  "banos": 2,
  "superficie_total_m2": 180,
  "superficie_cubierta_m2": 160,
  "antiguedad_anios": 20,
  "disponible": true,
  "estado": "default",
  "destacado": false,
  "caracteristicas": ["jardin", "parrilla", "cochera", "calefaccion"],
  "latitud": -34.5390,
  "longitud": -58.4550,
  "agente_id": "agt-03",
  "publicado_en": "2026-09-01T08:00:00Z",
  "imagenes": [
    { "url": "https://picsum.photos/seed/nunez-casa-1/800/600", "alt": "Fachada de la casa en Núñez", "orden": 1 },
    { "url": "https://picsum.photos/seed/nunez-casa-2/800/600", "alt": "Jardín con parrilla", "orden": 2 },
    { "url": "https://picsum.photos/seed/nunez-casa-3/800/600", "alt": "Living comedor", "orden": 3 }
  ]
}
```

### Propiedad 8 — Terreno en Vicente López
```json
{
  "id": "prop-008",
  "slug": "terreno-vicente-lopez",
  "codigo": "REF-MOR-008",
  "titulo": "Terreno en Vicente López",
  "descripcion": "Terreno de 850 m² en Vicente López, en zona residencial de alta categoría. Excelente para desarrollar una vivienda a medida o un emprendimiento de baja densidad. Ubicación privilegiada cerca de la costa, colegios y acceso rápido a la ciudad.",
  "precio": 380000000,
  "moneda": "ARS",
  "operacion": "venta",
  "tipo": "terreno",
  "zona": "vicente-lopez",
  "ciudad": "Vicente López",
  "direccion": "Av. del Libertador al 1300, Vicente López",
  "ambientes": 0,
  "dormitorios": 0,
  "banos": 0,
  "superficie_total_m2": 850,
  "superficie_cubierta_m2": null,
  "antiguedad_anios": null,
  "disponible": true,
  "estado": "default",
  "destacado": false,
  "caracteristicas": [],
  "latitud": -34.5200,
  "longitud": -58.4770,
  "agente_id": "agt-04",
  "publicado_en": "2026-08-15T10:00:00Z",
  "imagenes": [
    { "url": "https://picsum.photos/seed/vl-terreno-1/800/600", "alt": "Vista general del terreno en Vicente López", "orden": 1 },
    { "url": "https://picsum.photos/seed/vl-terreno-2/800/600", "alt": "Entorno residencial del terreno", "orden": 2 }
  ]
}
```

### Propiedad 9 — Departamento 1 ambiente en Barrio Norte
```json
{
  "id": "prop-009",
  "slug": "depto-barrio-norte-oportunidad",
  "codigo": "REF-MOR-009",
  "titulo": "Departamento 1 ambiente en Barrio Norte",
  "descripcion": "Monoambiente luminoso en Barrio Norte, ideal como inversión o primera vivienda. A estrenar en su categoría: pleno centro, a pasos de subtes y de toda la oferta comercial. Muy buena rentabilidad en alquiler. Edificio con ascensor.",
  "precio": 95000000,
  "moneda": "ARS",
  "operacion": "venta",
  "tipo": "departamento",
  "zona": "barrio-norte",
  "ciudad": "Buenos Aires",
  "direccion": "Av. Callao al 900, Barrio Norte",
  "ambientes": 1,
  "dormitorios": 1,
  "banos": 1,
  "superficie_total_m2": 48,
  "superficie_cubierta_m2": 42,
  "antiguedad_anios": 30,
  "disponible": true,
  "estado": "oportunidad",
  "destacado": false,
  "caracteristicas": ["placares", "ascensor", "calefaccion"],
  "latitud": -34.5970,
  "longitud": -58.3960,
  "agente_id": "agt-01",
  "publicado_en": "2026-08-05T09:00:00Z",
  "imagenes": [
    { "url": "https://picsum.photos/seed/bn-mono-1/800/600", "alt": "Monoambiente luminoso", "orden": 1 },
    { "url": "https://picsum.photos/seed/bn-mono-2/800/600", "alt": "Zona de cocina", "orden": 2 }
  ]
}
```

### Propiedad 10 — Casa moderna en Vicente López
```json
{
  "id": "prop-010",
  "slug": "casa-vicente-lopez-nueva",
  "codigo": "REF-MOR-010",
  "titulo": "Casa moderna 5 dormitorios en Vicente López",
  "descripcion": "Casa moderna de obra nueva en Vicente López, con 420 m² cubiertos sobre lote de 600 m². Cinco dormitorios, cuatro baños, pileta, parrilla y domótica integral. Amoblamiento de diseño y terminaciones premium. A estrenar, en la mejor zona residencial del norte.",
  "precio": 1250000000,
  "moneda": "ARS",
  "operacion": "venta",
  "tipo": "casa",
  "zona": "vicente-lopez",
  "ciudad": "Vicente López",
  "direccion": "Av. del Libertador al 1500, Vicente López",
  "ambientes": 6,
  "dormitorios": 5,
  "banos": 4,
  "superficie_total_m2": 600,
  "superficie_cubierta_m2": 420,
  "antiguedad_anios": 0,
  "disponible": true,
  "estado": "nuevo",
  "destacado": true,
  "caracteristicas": ["piscina", "jardin", "parrilla", "cochera", "domotica", "aire", "calefaccion", "wifi"],
  "latitud": -34.5200,
  "longitud": -58.4800,
  "agente_id": "agt-02",
  "publicado_en": "2026-09-05T15:00:00Z",
  "imagenes": [
    { "url": "https://picsum.photos/seed/vl-casa-nueva-1/800/600", "alt": "Fachada moderna de la casa", "orden": 1 },
    { "url": "https://picsum.photos/seed/vl-casa-nueva-2/800/600", "alt": "Pileta y parrilla", "orden": 2 },
    { "url": "https://picsum.photos/seed/vl-casa-nueva-3/800/600", "alt": "Living con doble altura", "orden": 3 },
    { "url": "https://picsum.photos/seed/vl-casa-nueva-4/800/600", "alt": "Dormitorio principal en suite", "orden": 4 }
  ]
}
```

## 3. Notas de uso para el Agente 03

1. **Home (`P-01`) destacadas:** usar las propiedades con `destacado: true` (1, 2, 4, 10) → 4 tarjetas destacadas.
2. **Listado (`P-02`):** mostrar las 10 (con filtros aplicables por operación/tipo/zona/precio). Orden default: `publicado_en` desc (más recientes).
3. **Detalle (`P-03`):** cada slug mapea a su propiedad.
4. **Similares (`P-03`):** mismas `tipo` y `zona` (o rango de precio) que la propiedad actual.
5. **Agentes (`agente_id`):** `agt-01`…`agt-04` → los definirá el Agente 05. Por ahora, mapear a placeholders.
6. **Búsqueda por zona/tiles de Home:** pre-cargar `?zona=...` y `?tipo=...` según `zona`/`tipo` (ver [`filtros-busqueda.md`](./filtros-busqueda.md) §4).

---

*Datos demo basados en [`modelo-datos.md`](./modelo-datos.md). Decisiones: `DPR-*` en `historial-prompts/decisiones.md`.*
