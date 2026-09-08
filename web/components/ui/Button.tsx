import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "tertiary" | "accent" | "whatsapp";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  ariaLabel?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm",
  accent:
    "bg-accent-400 text-brand-900 hover:bg-accent-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
  secondary:
    "border-[1.5px] border-brand-600 text-brand-600 bg-transparent hover:bg-brand-50 hover:-translate-y-0.5 active:translate-y-0",
  tertiary:
    "text-brand-600 bg-transparent hover:underline decoration-accent-400 underline-offset-4",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#1da851] hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm md:px-6 md:py-3",
  lg: "px-6 py-3 text-base md:px-8 md:py-3.5",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  className,
  disabled,
  type = "button",
  onClick,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    if (external || href.startsWith("#")) {
      return (
        <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={classes} aria-label={ariaLabel}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
