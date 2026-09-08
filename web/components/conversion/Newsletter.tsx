"use client";

import { useId, useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

export default function Newsletter({ onDark = false }: { onDark?: boolean }) {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setStatus("error");
      setError("Ingresá un e-mail válido.");
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 900);
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-2xl border p-4 text-sm",
          onDark ? "border-white/20 bg-white/10 text-white" : "border-success-soft bg-success-soft text-success-strong"
        )}
        role="status"
      >
        <p className="flex items-center gap-2 font-medium">
          <Icon name="circle-check" size={18} />
          ¡Listo! Te avisamos de las nuevas propiedades antes que nadie.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <label htmlFor={inputId} className="sr-only">
        E-mail
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={inputId}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="tu@email.com"
          aria-invalid={status === "error"}
          className={cn(
            "w-full rounded-full border px-4 py-2.5 text-sm outline-none transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400",
            onDark
              ? "border-white/25 bg-white/10 text-white placeholder:text-white/50"
              : "border-neutral-200 bg-white text-neutral-800 placeholder:text-neutral-400",
            status === "error" && "border-error"
          )}
        />
        <Button type="submit" variant={onDark ? "accent" : "primary"} size="sm" disabled={status === "loading"} className="shrink-0">
          {status === "loading" ? "Enviando…" : "Suscribirme"}
        </Button>
      </div>
      {status === "error" && <p className="mt-2 text-sm text-error-strong">{error}</p>}
      <p className={cn("mt-2 text-xs", onDark ? "text-white/60" : "text-neutral-500")}>
        Recibí las nuevas propiedades antes que nadie. Nunca spam. Podés darte de baja cuando quieras.
      </p>
    </form>
  );
}
