"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Icon, { WhatsAppIcon } from "@/components/ui/Icon";
import type { Agente, Propiedad } from "@/lib/types";
import { cn, waLinkPropiedad } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  propiedad: Propiedad;
  agente: Agente;
}

export default function ModalVisita({ open, onClose, propiedad, agente }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [form, setForm] = useState({ fecha: "", hora: "", nombre: "", telefono: "", email: "" });
  const [errores, setErrores] = useState<Record<string, string>>({});

  function validar() {
    const err: Record<string, string> = {};
    const hoy = new Date().toISOString().slice(0, 10);
    if (!form.fecha || form.fecha <= hoy) err.fecha = "Elegí una fecha futura.";
    if (!form.hora) err.hora = "Elegí un horario.";
    if (form.nombre.trim().length < 2) err.nombre = "Ingresá tu nombre.";
    if (form.telefono.trim().length < 6) err.telefono = "Ingresá un teléfono válido.";
    return err;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const err = validar();
    setErrores(err);
    if (Object.keys(err).length) return;
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1000);
  }

  function handleClose() {
    setStatus("idle");
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose} title="Agendar visita">
      {status === "success" ? (
        <div className="text-center" role="status">
          <Icon name="circle-check" size={40} className="mx-auto text-success" />
          <h3 className="mt-4 font-display text-lg font-semibold text-success-strong">¡Listo! Agendamos tu visita.</h3>
          <p className="mt-2 text-sm text-neutral-600">
            Te confirmamos por WhatsApp. Si querés, también podés escribirnos antes.
          </p>
          <Button variant="secondary" size="sm" className="mt-5" onClick={handleClose}>
            Cerrar
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Fecha" id="visita-fecha" error={errores.fecha}>
              <input id="visita-fecha" type="date" min={new Date().toISOString().slice(0, 10)} value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} className={inputClass(!!errores.fecha)} />
            </Field>
            <Field label="Hora" id="visita-hora" error={errores.hora}>
              <input id="visita-hora" type="time" min="09:00" max="19:00" value={form.hora} onChange={(e) => setForm({ ...form, hora: e.target.value })} className={inputClass(!!errores.hora)} />
            </Field>
            <Field label="Nombre" id="visita-nombre" error={errores.nombre} className="sm:col-span-2">
              <input id="visita-nombre" type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Tu nombre" className={inputClass(!!errores.nombre)} />
            </Field>
            <Field label="Teléfono / WhatsApp" id="visita-telefono" error={errores.telefono} className="sm:col-span-2">
              <input id="visita-telefono" type="tel" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="+54 9 11 ..." className={inputClass(!!errores.telefono)} />
            </Field>
          </div>
          <Button type="submit" variant="primary" size="md" disabled={status === "loading"} className="w-full">
            {status === "loading" ? "Agendando…" : "Agendar visita"}
          </Button>
          <div className="text-center">
            <a
              href={waLinkPropiedad(agente, propiedad)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-brand-600 hover:underline"
            >
              <WhatsAppIcon size={16} />
              Preferís coordinar por WhatsApp?
            </a>
          </div>
        </form>
      )}
    </Modal>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-neutral-800 outline-none transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400",
    hasError ? "border-error" : "border-neutral-200"
  );
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
