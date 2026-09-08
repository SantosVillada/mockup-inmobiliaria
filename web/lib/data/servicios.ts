export interface Servicio {
  id: string;
  icono: string;
  titulo: string;
  descripcion: string;
  whatsappMensaje: string;
}

export const servicios: Servicio[] = [
  {
    id: "tasacion",
    icono: "trending-up",
    titulo: "Tasación",
    descripcion:
      "Sabé cuánto vale tu propiedad con una tasación seria, fundamentada en datos reales del mercado y de la zona.",
    whatsappMensaje: "Hola, quiero una tasación de mi propiedad.",
  },
  {
    id: "compra-venta",
    icono: "handshake",
    titulo: "Compra y venta",
    descripcion:
      "Publicamos, difundimos y negociamos por vos. Te acompañamos desde la primera visita hasta la firma.",
    whatsappMensaje: "Hola, quiero comprar o vender una propiedad.",
  },
  {
    id: "alquileres",
    icono: "key",
    titulo: "Alquileres",
    descripcion:
      "Conseguí inquilinos confiables y gestioná tu propiedad sin preocuparte por el día a día.",
    whatsappMensaje: "Hola, quiero alquilar o gestionar una propiedad.",
  },
  {
    id: "credito",
    icono: "landmark",
    titulo: "Asesoramiento crediticio",
    descripcion:
      "Te ayudamos a armar tu financiación y a entender cada paso del crédito hipotecario, sin letra chica.",
    whatsappMensaje: "Hola, quiero asesoramiento crediticio.",
  },
  {
    id: "inversion",
    icono: "sparkles",
    titulo: "Inversión",
    descripcion:
      "Analizamos rentabilidad y oportunidades para que tu plata trabaje en el mercado inmobiliario.",
    whatsappMensaje: "Hola, quiero asesoramiento para invertir.",
  },
  {
    id: "obra-nueva",
    icono: "building-2",
    titulo: "Obra nueva",
    descripcion:
      "Accedé a los mejores desarrollos y preventas del mercado, con condiciones y planes exclusivos.",
    whatsappMensaje: "Hola, quiero información sobre obra nueva.",
  },
];
