import { NextResponse } from "next/server";
import { crearLead, type CreateLeadInput } from "@/lib/queries/leads";

const TIPOS_VALIDOS = ["contacto", "visita", "vender", "newsletter"];
const ORIGENES_VALIDOS = [
  "home",
  "propiedades",
  "detalle",
  "agentes",
  "perfil",
  "contacto",
  "nosotros",
  "vender",
];

/**
 * POST /api/leads
 *
 * Endpoint público para crear un lead desde los formularios del sitio.
 * La inserción es permitida de forma anónima gracias a la política RLS
 * `leads_insert_anon`. La lectura/edición quedan restringidas a asesor/admin.
 */
export async function POST(request: Request) {
  let body: Partial<CreateLeadInput>;
  try {
    body = (await request.json()) as Partial<CreateLeadInput>;
  } catch {
    return NextResponse.json({ error: "Body inválido." }, { status: 400 });
  }

  if (!body.nombre || typeof body.nombre !== "string" || body.nombre.trim().length < 2) {
    return NextResponse.json({ error: "Nombre inválido." }, { status: 400 });
  }
  if (!body.telefono || typeof body.telefono !== "string") {
    return NextResponse.json({ error: "Teléfono inválido." }, { status: 400 });
  }
  if (!body.tipo || !TIPOS_VALIDOS.includes(body.tipo)) {
    return NextResponse.json({ error: "Tipo de lead inválido." }, { status: 400 });
  }
  if (!body.origen || !ORIGENES_VALIDOS.includes(body.origen)) {
    return NextResponse.json({ error: "Origen inválido." }, { status: 400 });
  }

  try {
    const lead = await crearLead({
      nombre: body.nombre.trim(),
      telefono: body.telefono.trim(),
      whatsapp: body.whatsapp ?? body.telefono.trim(),
      email: body.email,
      mensaje: body.mensaje,
      tipo: body.tipo,
      agente_id: body.agente_id,
      propiedad_id: body.propiedad_id,
      titulo_propiedad: body.titulo_propiedad,
      fecha_visita: body.fecha_visita,
      hora_visita: body.hora_visita,
      operacion_interes: body.operacion_interes,
      tipo_propiedad: body.tipo_propiedad,
      zona_interes: body.zona_interes,
      origen: body.origen,
      canal: body.canal ?? "formulario",
    });
    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Error al crear el lead.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
