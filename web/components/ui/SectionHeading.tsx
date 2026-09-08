import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  onDark = false,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-8 md:mb-10", align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow && (
        <span
          className={cn(
            "mb-2 inline-block text-sm font-medium",
            onDark ? "text-accent-300" : "text-accent-600"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-display font-semibold tracking-tight text-[clamp(1.5rem,3vw,2.25rem)] leading-tight",
          onDark ? "text-white" : "text-brand-900"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-3 max-w-2xl text-base leading-relaxed", onDark ? "text-white/70" : "text-neutral-600", align === "center" && "mx-auto")}>
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
