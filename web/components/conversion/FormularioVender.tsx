"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Button from "@/components/ui/Button";
import Icon, { WhatsAppIcon } from "@/components/ui/Icon";
import { TIPOS, OPERACIONES, ZONAS, INSTITUCIONAL_WHATSAPP } from "@/lib/constants";
import { cn, waLink } from "@/lib/utils";

type Status = "idle" | "loading" | "success";

export default function FormularioVender({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    operacion: "venta",
    tipo: "departamento",
    zona: "",
    descripcion: "",
  });
  const [errores, setErrores] = useState<Record<string, string>>({});

  function validar() {
    const err: Record<string, string> = {};
    if (form.nombre.trim().length < 2) err.nombre = "Ingresá tu nombre.";
    if (form.telefono.trim().length < 6) err.telefono = "Ingresá un teléfono válido.";
    if (form.zona.trim().length < 2) err.zona = "Indicá la zona.";
    return err;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const err = validar();
    setErrores(err);
    if (Object.keys(err).length) return;
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1100);
  }

  if (status === "success") {
    return (
      <div className={cn("rounded-2xl border border-success-soft bg-success-soft p-8 text-center", className)} role="status">
        <Icon name="circle-check" size={40} className="mx-auto text-success" />
        <h3 className="mt-4 font-display text-xl font-semibold text-success-strong">¡Gracias por confiar en nosotros!</h3>
        <p className="mt-2 text-sm text-neutral-600">
          Un asesor te va a contactar para coordinar la publicación de tu propiedad.
        </p>
        <Button href="/" variant="secondary" size="sm" className="mt-5">
          Volver al inicio
        </Button>
      </div>
    );
  }

  const waMsg = `Hola, quiero publicar mi propiedad en ${form.zona || "mi zona"}. ¿Cómo lo hacemos?`;
  const waHref = waLink(INSTITUCIONAL_WHATSAPP, waMsg);

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("space-y-6", className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre" id="vender-nombre" error={errores.nombre} className="sm:col-span-2">
          <input id="vender-nombre" type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Tu nombre" className={inputClass(!!errores.nombre)} />
        </Field>
        <Field label="Teléfono / WhatsApp" id="vender-telefono" error={errores.telefono}>
          <input id="vender-telefono" type="tel" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="+54 9 11 ..." className={inputClass(!!errores.telefono)} />
        </Field>
        <Field label="E-mail (opcional)" id="vender-email">
          <input id="vender-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="tu@email.com" className={inputClass(false)} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Operación" id="vender-operacion">
          <select id="vender-operacion" value={form.operacion} onChange={(e) => setForm({ ...form, operacion: e.target.value })} className={selectClass()}>
            {OPERACIONES.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Tipo de propiedad" id="vender-tipo">
          <select id="vender-tipo" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} className={selectClass()}>
            {TIPOS.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Zona / Ciudad" id="vender-zona" error={errores.zona} className="sm:col-span-2">
          <input id="vender-zona" list="vender-zonas" value={form.zona} onChange={(e) => setForm({ ...form, zona: e.target.value })} placeholder="Ej. Palermo, Belgrano…" className={inputClass(!!errores.zona)} />
          <datalist id="vender-zonas">
            {ZONAS.map((z) => (
              <option key={z.slug} value={z.label}>{z.ciudad}</option>
            ))}
          </datalist>
        </Field>
        <Field label="Descripción breve (opcional)" id="vender-descripcion" className="sm:col-span-2">
          <textarea id="vender-descripcion" rows={3} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} placeholder="Contanos sobre tu propiedad…" className={cn(inputClass(false), "resize-none")} />
        </Field>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" variant="primary" size="lg" disabled={status === "loading"} className="flex-1">
          {status === "loading" ? "Publicando…" : "Publicar mi propiedad"}
        </Button>
        <Button href={waHref} external variant="secondary" size="lg" className="flex-1">
          <WhatsAppIcon size={18} />
          Consultá por WhatsApp
        </Button>
      </div>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400",
    hasError ? "border-error" : "border-neutral-200"
  );
}

function selectClass() {
  return "w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-800 outline-none transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400";
}

function Field({ label, id, error, className, children }: { label: string; id: string; error?: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-neutral-700">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-error-strong">{error}</p>}
    </div>
  );
}
