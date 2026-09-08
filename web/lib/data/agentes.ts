import type { Agente } from "@/lib/types";

export const agentes: Agente[] = [
  {
    id: "agt-01",
    slug: "sofia-dominguez",
    nombre: "Sofía",
    apellido: "Domínguez",
    email: "sofia.dominguez@morada.com.ar",
    telefono: "+54 9 11 5555 1001",
    whatsapp: "5491155551001",
    foto: "https://i.pravatar.cc/600x800?img=47",
    cargo: "asesor",
    especialidades: ["residencial", "venta-departamentos", "alquileres"],
    idiomas: ["espanol", "ingles"],
    bio: "Soy Sofía y hace 6 años que acompaño a personas a encontrar su lugar en la ciudad. Me especializo en departamentos y alquileres en Palermo, Caballito y Barrio Norte. Me gusta que la búsqueda sea simple y sin vueltas: escucho qué necesitás, te muestro opciones concretas y te acompaño hasta la firma. Si querés vender o alquilar tu propiedad, también te ayudo a hacerlo en el mejor momento.",
    anios_experiencia: 6,
    estadisticas: {
      operaciones_cerradas: 84,
      propiedades_vendidas: 51,
      clientes_atendidos: 190,
      satisfaccion: 97,
    },
    zona_cobertura: ["palermo", "caballito", "barrio-norte"],
    redes: {
      linkedin: "https://linkedin.com/in/sofia-dominguez",
      instagram: "https://instagram.com/sofia.dominguez",
    },
    activo: true,
    orden: 1,
    publicado_en: "2026-01-10T09:00:00Z",
  },
  {
    id: "agt-02",
    slug: "martin-aguirre",
    nombre: "Martín",
    apellido: "Aguirre",
    email: "martin.aguirre@morada.com.ar",
    telefono: "+54 9 11 5555 1002",
    whatsapp: "5491155551002",
    foto: "https://i.pravatar.cc/600x800?img=12",
    cargo: "asesor-senior",
    especialidades: ["venta-departamentos", "ph", "obra-nueva"],
    idiomas: ["espanol"],
    bio: "Soy Martín, asesor senior con más de 12 años en el mercado inmobiliario porteño. Trabajo sobre todo en Belgrano, Recoleta y el norte, donde conozco cada zona de memoria. Me dedico a casas, PHs y obra nueva. Mi prioridad es que compres con tranquilidad: te cuento todo lo que hay que saber, sin letra chica, y negocio por vos.",
    anios_experiencia: 12,
    estadisticas: {
      operaciones_cerradas: 156,
      propiedades_vendidas: 118,
      clientes_atendidos: 340,
      satisfaccion: 98,
    },
    zona_cobertura: ["belgrano", "recoleta", "vicente-lopez"],
    redes: { linkedin: "https://linkedin.com/in/martin-aguirre" },
    activo: true,
    orden: 2,
    publicado_en: "2026-02-05T10:00:00Z",
  },
  {
    id: "agt-03",
    slug: "valentina-paz",
    nombre: "Valentina",
    apellido: "Paz",
    email: "valentina.paz@morada.com.ar",
    telefono: "+54 9 11 5555 1003",
    whatsapp: "5491155551003",
    foto: "https://i.pravatar.cc/600x800?img=32",
    cargo: "asesor",
    especialidades: ["ph", "residencial", "alquileres"],
    idiomas: ["espanol", "portugues"],
    bio: "Hola, soy Valentina. Amo los PHs y las casas con historia. Trabajo en San Telmo, Núñez y la zona sur, donde hay propiedades con un encanto que no se repite. Además de vender, hago muchas alquileres: si buscás algo para mudarte ya, o querés poner tu propiedad en alquiler, hablamos. Me gusta responder rápido y hacerte la vida más fácil.",
    anios_experiencia: 8,
    estadisticas: {
      operaciones_cerradas: 97,
      propiedades_vendidas: 60,
      clientes_atendidos: 230,
      satisfaccion: 96,
    },
    zona_cobertura: ["san-telmo", "nunez", "la-plata"],
    redes: { instagram: "https://instagram.com/valentina.paz" },
    activo: true,
    orden: 3,
    publicado_en: "2026-03-01T11:00:00Z",
  },
  {
    id: "agt-04",
    slug: "julian-otero",
    nombre: "Julián",
    apellido: "Otero",
    email: "julian.otero@morada.com.ar",
    telefono: "+54 9 11 5555 1004",
    whatsapp: "5491155551004",
    foto: "https://i.pravatar.cc/600x800?img=59",
    cargo: "especialista-inversion",
    especialidades: ["inversion", "venta-departamentos", "comercial"],
    idiomas: ["espanol", "ingles"],
    bio: "Soy Julián y me dedico a inversión inmobiliaria. Analizo rentabilidad, obra nueva y oportunidades comerciales, sobre todo en Puerto Madero y el norte. Si querés comprar para invertir o entender el mercado antes de decidir, te preparo el análisis completo. Hablamos en pesos o en dólares, como te resulte más claro.",
    anios_experiencia: 10,
    estadisticas: {
      operaciones_cerradas: 132,
      propiedades_vendidas: 89,
      clientes_atendidos: 210,
      satisfaccion: 99,
    },
    zona_cobertura: ["puerto-madero", "vicente-lopez"],
    redes: { linkedin: "https://linkedin.com/in/julian-otero" },
    activo: true,
    orden: 4,
    publicado_en: "2026-04-12T14:00:00Z",
  },
  {
    id: "agt-05",
    slug: "carolina-ferrer",
    nombre: "Carolina",
    apellido: "Ferrer",
    email: "carolina.ferrer@morada.com.ar",
    telefono: "+54 9 11 5555 1005",
    whatsapp: "5491155551005",
    foto: "https://i.pravatar.cc/600x800?img=44",
    cargo: "director-comercial",
    especialidades: ["inversion", "obra-nueva", "residencial"],
    idiomas: ["espanol", "ingles", "italiano"],
    bio: "Soy Carolina, directora comercial del equipo. Coordino a los asesores y superviso cada operación para que todo salga impecable. Si tenés un proyecto grande, buscás una propiedad de alto valor o querés vender algo especial, estoy a un mensaje de distancia. Con 15 años de experiencia, sé cómo se resuelven las operaciones complejas.",
    anios_experiencia: 15,
    estadisticas: {
      operaciones_cerradas: 240,
      propiedades_vendidas: 175,
      clientes_atendidos: 420,
      satisfaccion: 98,
    },
    zona_cobertura: ["palermo", "recoleta", "belgrano", "puerto-madero", "vicente-lopez"],
    redes: { linkedin: "https://linkedin.com/in/carolina-ferrer" },
    activo: true,
    orden: 5,
    publicado_en: "2026-05-20T16:00:00Z",
  },
];

export function getAgenteBySlug(slug: string): Agente | undefined {
  return agentes.find((a) => a.slug === slug && a.activo);
}

export function getAgenteById(id: string): Agente | undefined {
  return agentes.find((a) => a.id === id && a.activo);
}

export function getAgentesActivos(): Agente[] {
  return agentes
    .filter((a) => a.activo)
    .sort((a, b) => a.orden - b.orden);
}

export function getAgentesDestacados(): Agente[] {
  return getAgentesActivos().slice(0, 4);
}
