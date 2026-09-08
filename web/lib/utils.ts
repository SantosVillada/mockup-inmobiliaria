import type { Agente, Moneda, Operacion, Propiedad, TipoPropiedad } from "@/lib/types";
import { AMENITIES, CARGOS, ESPECIALIDADES, ESTADOS, IDIOMAS, TIPOS, ZONAS } from "@/lib/constants";

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPrecio(precio: number, moneda: Moneda, operacion: Operacion): string {
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: moneda,
    maximumFractionDigits: 0,
  });
  const valor = formatter.format(precio).replace(/\s?ARS/, "");
  const sufijo = operacion === "alquiler" ? " /mes" : "";
  return `${valor}${sufijo}`;
}

export function formatNumero(n: number): string {
  return new Intl.NumberFormat("es-AR").format(n);
}

export function getZonaLabel(slug: string): string {
  return ZONAS.find((z) => z.slug === slug)?.label ?? slug;
}

export function getZonaCiudad(slug: string): string {
  const zona = ZONAS.find((z) => z.slug === slug);
  return zona ? `${zona.label}, ${zona.ciudad}` : slug;
}

export function getTipoLabel(tipo: TipoPropiedad): string {
  return TIPOS.find((t) => t.value === tipo)?.label ?? tipo;
}

export function getCargoLabel(cargo: string): string {
  return CARGOS[cargo as keyof typeof CARGOS] ?? cargo;
}

export function getEspecialidadLabel(clave: string): string {
  return ESPECIALIDADES[clave] ?? clave;
}

export function getIdiomaLabel(clave: string): string {
  return IDIOMAS[clave] ?? clave;
}

export function getAmenityLabel(clave: string): string {
  return AMENITIES[clave]?.label ?? clave;
}

export function getEstadoLabel(estado: string): string {
  return ESTADOS[estado as keyof typeof ESTADOS] ?? "";
}

export function waLink(numero: string, mensaje: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

export function waMensajeGeneral(): string {
  return "Hola, quiero hacer una consulta sobre propiedades.";
}

export function waMensajeVender(): string {
  return "Hola, quiero vender/alquilar mi propiedad. ¿Me asesoran?";
}

export function waMensajeAgente(agente: Agente): string {
  return `Hola ${agente.nombre}, te escribo por el sitio. ¿Podés ayudarme con una consulta?`;
}

export function waMensajePropiedad(agente: Agente, propiedad: Propiedad): string {
  return `Hola ${agente.nombre}, vi la propiedad "${propiedad.titulo}" (${propiedad.codigo}) en ${getZonaLabel(propiedad.zona)}. ¿Podés contarme más?`;
}

export function waLinkGeneral(): string {
  return waLink("5491155550000", waMensajeGeneral());
}

export function waLinkAgente(agente: Agente): string {
  return waLink(agente.whatsapp, waMensajeAgente(agente));
}

export function waLinkPropiedad(agente: Agente, propiedad: Propiedad): string {
  return waLink(agente.whatsapp, waMensajePropiedad(agente, propiedad));
}

export function getAgenteNombreCompleto(agente: Agente): string {
  return `${agente.nombre} ${agente.apellido}`;
}

export function slugify(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ordenarPropiedades(
  propiedades: Propiedad[],
  orden?: string
): Propiedad[] {
  const copia = [...propiedades];
  switch (orden) {
    case "precio_asc":
      return copia.sort((a, b) => a.precio - b.precio);
    case "precio_desc":
      return copia.sort((a, b) => b.precio - a.precio);
    case "recientes":
    default:
      return copia.sort(
        (a, b) => new Date(b.publicado_en).getTime() - new Date(a.publicado_en).getTime()
      );
  }
}

export function filtrarPropiedades(
  propiedades: Propiedad[],
  params: Record<string, string | string[] | undefined>
): Propiedad[] {
  const get = (key: string): string | undefined => {
    const v = params[key];
    return Array.isArray(v) ? v[0] : v;
  };

  const q = get("q")?.toLowerCase();
  const operacion = get("operacion");
  const tipo = get("tipo");
  const zona = get("zona");
  const ciudad = get("ciudad");
  const precioMin = get("precio_min");
  const precioMax = get("precio_max");
  const ambientesMin = get("ambientes_min");
  const dormitoriosMin = get("dormitorios_min");
  const m2Min = get("m2_min");
  const m2Max = get("m2_max");
  const agente = get("agente");

  let resultado = propiedades.filter((p) => {
    if (q) {
      const texto = `${p.titulo} ${p.zona} ${p.ciudad} ${p.direccion} ${p.descripcion}`.toLowerCase();
      if (!texto.includes(q)) return false;
    }
    if (operacion && p.operacion !== operacion) return false;
    if (tipo) {
      const tipos = tipo.split(",").filter(Boolean);
      if (!tipos.includes(p.tipo)) return false;
    }
    if (zona) {
      const zonas = zona.split(",").filter(Boolean);
      if (!zonas.includes(p.zona)) return false;
    }
    if (ciudad && p.ciudad.toLowerCase() !== ciudad.toLowerCase()) return false;
    if (precioMin && p.precio < Number(precioMin)) return false;
    if (precioMax && p.precio > Number(precioMax)) return false;
    if (ambientesMin && p.ambientes < Number(ambientesMin)) return false;
    if (dormitoriosMin && p.dormitorios < Number(dormitoriosMin)) return false;
    if (m2Min && p.superficie_total_m2 < Number(m2Min)) return false;
    if (m2Max && p.superficie_total_m2 > Number(m2Max)) return false;
    if (agente && p.agente_id !== agente) return false;
    return true;
  });

  resultado = ordenarPropiedades(resultado, get("orden"));
  return resultado;
}
