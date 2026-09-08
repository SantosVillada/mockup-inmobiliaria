import Link from "next/link";
import { cn } from "@/lib/utils";
import { NOMBRE_EMPRESA, TAGLINE } from "@/lib/constants";

export function Monograma({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  const stroke = onDark ? "#FFFFFF" : "currentColor";
  const dot = onDark ? "var(--accent-300)" : "var(--accent-400)";
  return (
    <svg
      viewBox="0 0 32 30"
      className={cn("shrink-0", className)}
      aria-hidden="true"
      role="img"
    >
      <path
        d="M4 26 L12 5 L16 14 L20 5 L28 26"
        fill="none"
        stroke={stroke}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="14.5" r="2.4" fill={dot} />
    </svg>
  );
}

interface LogoProps {
  onDark?: boolean;
  showTagline?: boolean;
  href?: string;
  className?: string;
  size?: "sm" | "md";
}

export default function Logo({ onDark = false, showTagline = false, href = "/", className, size = "md" }: LogoProps) {
  const symbol = (
    <span className="flex items-center gap-2.5">
      <Monograma
        className={cn(size === "sm" ? "h-7 w-7" : "h-8 w-8", onDark ? "text-white" : "text-brand-600")}
        onDark={onDark}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-semibold uppercase tracking-[0.18em]",
            size === "sm" ? "text-base" : "text-lg",
            onDark ? "text-white" : "text-brand-900"
          )}
        >
          {NOMBRE_EMPRESA}
        </span>
        {showTagline && (
          <span className={cn("mt-1 text-[11px] font-body", onDark ? "text-white/70" : "text-neutral-500")}>
            {TAGLINE}
          </span>
        )}
      </span>
    </span>
  );

  return (
    <Link href={href} className={cn("inline-flex items-center", className)} aria-label={`${NOMBRE_EMPRESA} — ${TAGLINE}`}>
      {symbol}
    </Link>
  );
}
