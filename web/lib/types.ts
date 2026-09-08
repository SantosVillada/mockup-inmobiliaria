export type Operacion = "venta" | "alquiler";

export type TipoPropiedad = "casa" | "departamento" | "ph" | "local" | "terreno";

export type EstadoPropiedad =
  | "nuevo"
  | "exclusivo"
  | "oportunidad"
  | "reservado"
  | "vendido"
  | "default";

export type Moneda = "ARS" | "USD" | "UYU";

export type CargoAgente =
  | "asesor"
  | "asesor-senior"
  | "especialista-inversion"
  | "broker"
  | "director-comercial";

export type TipoLead = "contacto" | "visita" | "vender" | "newsletter";

export type EstadoLead =
  | "nuevo"
  | "contactado"
  | "calificado"
  | "visito"
  | "cerrado"
  | "perdido";

export interface Imagen {
  url: string;
  alt: string;
  orden: number;
}

export interface Propiedad {
  id: string;
  slug: string;
  codigo: string;
  titulo: string;
  descripcion: string;
  precio: number;
  moneda: Moneda;
  operacion: Operacion;
  tipo: TipoPropiedad;
  zona: string;
  ciudad: string;
  direccion: string;
  ambientes: number;
  dormitorios: number;
  banos: number;
  superficie_total_m2: number;
  superficie_cubierta_m2?: number | null;
  antiguedad_anios?: number | null;
  disponible: boolean;
  estado: EstadoPropiedad;
  destacado: boolean;
  caracteristicas: string[];
  latitud?: number | null;
  longitud?: number | null;
  agente_id: string;
  publicado_en: string;
  imagenes: Imagen[];
}

export interface EstadisticasAgente {
  operaciones_cerradas?: number;
  propiedades_vendidas?: number;
  clientes_atendidos?: number;
  valor_transaccionado?: string;
  satisfaccion?: number;
}

export interface RedesAgente {
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  web?: string;
}

export interface Agente {
  id: string;
  slug: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  whatsapp: string;
  foto: string;
  cargo: CargoAgente;
  especialidades: string[];
  idiomas: string[];
  bio: string;
  anios_experiencia: number;
  estadisticas?: EstadisticasAgente;
  zona_cobertura: string[];
  redes?: RedesAgente;
  activo: boolean;
  orden: number;
  publicado_en: string;
}

export interface Lead {
  id: string;
  nombre: string;
  telefono: string;
  whatsapp?: string;
  email?: string;
  mensaje?: string;
  tipo: TipoLead;
  agente_id?: string | null;
  propiedad_id?: string | null;
  titulo_propiedad?: string;
  fecha_visita?: string;
  hora_visita?: string;
  operacion_interes?: Operacion;
  tipo_propiedad?: TipoPropiedad;
  zona_interes?: string;
  origen: string;
  canal: "whatsapp" | "formulario";
  estado: EstadoLead;
  creado_en: string;
}

export interface Zona {
  slug: string;
  label: string;
  ciudad: string;
}

export interface Testimonio {
  id: string;
  nombre: string;
  rol: string;
  cita: string;
  rating: number;
  avatar: string;
  zona?: string;
}
