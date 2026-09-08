import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Propiedad } from "@/lib/types";
import { ESTADOS } from "@/lib/constants";

type Variant = "brand" | "brand-light" | "warning" | "accent" | "neutral" | "success";

const styles: Record<Variant, string> = {
  brand: "bg-brand-600 text-white",
  "brand-light": "bg-brand-500 text-white",
  warning: "bg-warning-soft text-warning",
  accent: "bg-accent-100 text-accent-600",
  neutral: "bg-neutral-200 text-neutral-600",
  success: "bg-success-soft text-success-strong",
};

interface BadgeProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  size?: "sm" | "md";
}

export function Badge({ children, variant = "brand", className, size = "md" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-semibold uppercase tracking-wide rounded-full",
        size === "sm" ? "px-2.5 py-0.5 text-[11px]" : "px-3 py-1 text-xs",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function BadgeOperacion({ propiedad }: { propiedad: Propiedad }) {
  return (
    <Badge variant={propiedad.operacion === "venta" ? "brand" : "brand-light"}>
      {propiedad.operacion === "venta" ? "Venta" : "Alquiler"}
    </Badge>
  );
}

export function BadgeEstado({ propiedad }: { propiedad: Propiedad }) {
  const label = ESTADOS[propiedad.estado];
  if (!label) return null;
  let variant: Variant = "neutral";
  if (propiedad.estado === "exclusivo") variant = "accent";
  if (propiedad.estado === "nuevo" || propiedad.estado === "oportunidad") variant = "warning";
  return <Badge variant={variant}>{label}</Badge>;
}
