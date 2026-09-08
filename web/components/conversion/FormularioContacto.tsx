"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface Props {
  asunto?: string;
  placeholderMensaje?: string;
  className?: string;
  compacto?: boolean;
}

type Status = "idle" | "loading" | "success";

export default function FormularioContacto({
  asunto,
  placeholderMensaje,
  className,
  compacto = false,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ nombre: "", telefono: "", email: "", mensaje: asunto ?? "" });
  const [errores, setErrores] = useState<Record<string, string>>({});

  function validar() {
    const err: Record<string, string> = {};
    if (form.nombre.trim().length < 2) err.nombre = "Ingresá tu nombre.";
    if (form.telefono.trim().length < 6) err.telefono = "Ingresá un teléfono válido.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = "Ingresá un e-mail válido.";
    if (form.mensaje.trim().length < 3) err.mensaje = "Contanos brevemente qué buscás.";
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

  if (status === "success") {
    return (
      <div className={cn("rounded-2xl border border-success-soft bg-success-soft p-6 text-center", className)} role="status">
        <Icon name="circle-check" size={36} className="mx-auto text-success" />
        <h3 className="mt-3 font-display text-lg font-semibold text-success-strong">¡Recibimos tu consulta!</h3>
        <p className="mt-2 text-sm text-neutral-600">
          Te contactamos a la brevedad. Mientras tanto, podés seguir explorando propiedades.
        </p>
        <Button href="/propiedades" variant="secondary" size="sm" className="mt-4">
          Seguir explorando propiedades
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("space-y-4", className)}>
      <div className={cn("grid gap-4", !compacto && "sm:grid-cols-2")}>
        <Field
          label="Nombre"
          id="contacto-nombre"
          error={errores.nombre}
          input={
            <input
              id="contacto-nombre"
              type="text"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              placeholder="Tu nombre"
              aria-invalid={!!errores.nombre}
              className={inputClass(!!errores.nombre)}
            />
          }
        />
        <Field
          label="Teléfono / WhatsApp"
          id="contacto-telefono"
          error={errores.telefono}
          input={
            <input
              id="contacto-telefono"
              type="tel"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              placeholder="+54 9 11 ..."
              aria-invalid={!!errores.telefono}
              className={inputClass(!!errores.telefono)}
            />
          }
        />
      </div>
      <Field
        label="E-mail (opcional)"
        id="contacto-email"
        error={errores.email}
        input={
          <input
            id="contacto-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="tu@email.com"
            aria-invalid={!!errores.email}
            className={inputClass(!!errores.email)}
          />
        }
      />
      <Field
        label="Mensaje"
        id="contacto-mensaje"
        error={errores.mensaje}
        input={
          <textarea
            id="contacto-mensaje"
            rows={4}
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
            placeholder={placeholderMensaje ?? "Contanos qué buscás: zona, tipo, presupuesto…"}
            aria-invalid={!!errores.mensaje}
            className={cn(inputClass(!!errores.mensaje), "resize-none")}
          />
        }
      />
      <Button type="submit" variant="primary" size="md" disabled={status === "loading"} className="w-full">
        {status === "loading" ? "Enviando…" : "Enviar consulta"}
      </Button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-neutral-800 outline-none transition placeholder:text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400",
    hasError ? "border-error" : "border-neutral-200"
  );
}

function Field({
  label,
  id,
  error,
  input,
}: {
  label: string;
  id: string;
  error?: string;
  input: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-neutral-700">
        {label}
      </label>
      {input}
      {error && <p className="mt-1 text-xs text-error-strong">{error}</p>}
    </div>
  );
}
