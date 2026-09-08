import type {
  CargoAgente,
  EstadoPropiedad,
  Operacion,
  TipoPropiedad,
  Zona,
} from "@/lib/types";

export const NOMBRE_EMPRESA = "MORADA";
export const TAGLINE = "Encontrá tu morada.";
export const DESCRIPCION_SITIO =
  "Inmobiliaria premium: casas, departamentos y locales en las mejores zonas. Te acompañamos de punta a punta.";

export const INSTITUCIONAL_WHATSAPP = "5491155550000";
export const INSTITUCIONAL_WHATSAPP_DISPLAY = "+54 9 11 5555 0000";

export const EMAIL_INSTITUCIONAL = "hola@morada.com.ar";
export const TELEFONO_INSTITUCIONAL = "+54 9 11 5555 0000";
export const DIRECCION_INSTITUCIONAL = "Av. Alvear 1800, Recoleta, Buenos Aires";
export const HORARIOS = "Lun a Vie 9:00–19:00 · Sáb 9:00–13:00";

export const ZONAS: Zona[] = [
  { slug: "palermo", label: "Palermo", ciudad: "Buenos Aires" },
  { slug: "recoleta", label: "Recoleta", ciudad: "Buenos Aires" },
  { slug: "belgrano", label: "Belgrano", ciudad: "Buenos Aires" },
  { slug: "nunez", label: "Núñez", ciudad: "Buenos Aires" },
  { slug: "puerto-madero", label: "Puerto Madero", ciudad: "Buenos Aires" },
  { slug: "caballito", label: "Caballito", ciudad: "Buenos Aires" },
  { slug: "san-telmo", label: "San Telmo", ciudad: "Buenos Aires" },
  { slug: "barrio-norte", label: "Barrio Norte", ciudad: "Buenos Aires" },
  { slug: "vicente-lopez", label: "Vicente López", ciudad: "Vicente López (GBA Norte)" },
  { slug: "la-plata", label: "La Plata", ciudad: "La Plata" },
];

export const TIPOS: { value: TipoPropiedad; label: string }[] = [
  { value: "casa", label: "Casa" },
  { value: "departamento", label: "Departamento" },
  { value: "ph", label: "PH" },
  { value: "local", label: "Local" },
  { value: "terreno", label: "Terreno" },
];

export const OPERACIONES: { value: Operacion; label: string }[] = [
  { value: "venta", label: "Venta" },
  { value: "alquiler", label: "Alquiler" },
];

export const ESTADOS: Record<EstadoPropiedad, string> = {
  nuevo: "NUEVO",
  exclusivo: "EXCLUSIVO",
  oportunidad: "OPORTUNIDAD",
  reservado: "RESERVADO",
  vendido: "VENDIDO",
  default: "",
};

export const CARGOS: Record<CargoAgente, string> = {
  asesor: "Asesor inmobiliario",
  "asesor-senior": "Asesor senior",
  "especialista-inversion": "Especialista en inversión",
  broker: "Broker / Martillero público",
  "director-comercial": "Director comercial",
};

export const ESPECIALIDADES: Record<string, string> = {
  residencial: "Residencial",
  "venta-departamentos": "Venta de departamentos",
  alquileres: "Alquileres",
  ph: "PHs",
  comercial: "Locales y terrenos",
  inversion: "Inversión",
  "obra-nueva": "Obra nueva",
};

export const IDIOMAS: Record<string, string> = {
  espanol: "Español",
  ingles: "Inglés",
  portugues: "Portugués",
  italiano: "Italiano",
  frances: "Francés",
  aleman: "Alemán",
};

export const AMENITIES: Record<string, { label: string; icon: string }> = {
  balcon: { label: "Balcón", icon: "sun" },
  terraza: { label: "Terraza", icon: "sun" },
  patio: { label: "Patio", icon: "tree-deciduous" },
  jardin: { label: "Jardín", icon: "tree-pine" },
  parrilla: { label: "Parrilla / Quincho", icon: "flame" },
  piscina: { label: "Piscina", icon: "waves" },
  cochera: { label: "Cochera / Garaje", icon: "car" },
  baulera: { label: "Baulera", icon: "package" },
  deposito: { label: "Depósito", icon: "archive" },
  ascensor: { label: "Ascensor", icon: "arrow-up-down" },
  porteria: { label: "Portería / Seguridad 24hs", icon: "shield-check" },
  sum: { label: "Salón de usos múltiples", icon: "users" },
  gym: { label: "Gimnasio", icon: "dumbbell" },
  "piscina-comun": { label: "Pileta común", icon: "waves" },
  aire: { label: "Aire acondicionado", icon: "snowflake" },
  calefaccion: { label: "Calefacción", icon: "thermometer" },
  placares: { label: "Placares", icon: "door-open" },
  amoblado: { label: "Amoblado", icon: "sofa" },
  "cocina-integrada": { label: "Cocina integrada", icon: "utensils" },
  lavadero: { label: "Lavadero", icon: "washing-machine" },
  perchero: { label: "Perchero / vestidor", icon: "shirt" },
  alarma: { label: "Alarma", icon: "siren" },
  camaras: { label: "Cámaras de seguridad", icon: "camera" },
  "porton-electrico": { label: "Portón eléctrico", icon: "lock" },
  wifi: { label: "Internet / fibra", icon: "wifi" },
  domotica: { label: "Domótica", icon: "cpu" },
};

export const TESTIMONIOS = [
  {
    id: "t-1",
    nombre: "Mariana L.",
    rol: "Compró un departamento en Palermo",
    cita:
      "Nos acompañaron de punta a punta. Buscamos, visitamos y firmamos sin vueltas. Siempre supimos qué estaba pasando.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=5",
    zona: "Palermo",
  },
  {
    id: "t-2",
    nombre: "Jorge y Carla",
    rol: "Vendieron su casa en Belgrano",
    cita:
      "La tasación fue seria y el resultado, mejor de lo esperado. Publicaron, difundieron y cerraron en pocos meses.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=13",
    zona: "Belgrano",
  },
  {
    id: "t-3",
    nombre: "Lucía M.",
    rol: "Alquiló un PH en San Telmo",
    cita:
      "Respondieron por WhatsApp al toque. Conseguimos el PH justo y nos acompañaron hasta la entrega de llaves.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=32",
    zona: "San Telmo",
  },
  {
    id: "t-4",
    nombre: "Diego P.",
    rol: "Inversor en Puerto Madero",
    cita:
      "Julián nos armó el análisis completo de rentabilidad. Comprar para invertir fue mucho más simple de lo que pensaba.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=59",
    zona: "Puerto Madero",
  },
];
