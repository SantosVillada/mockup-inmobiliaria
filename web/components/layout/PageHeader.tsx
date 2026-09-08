import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb: { label: string; href?: string }[];
  onDark?: boolean;
  children?: ReactNode;
  className?: string;
}

export default function PageHeader({ title, subtitle, breadcrumb, onDark = false, children, className }: PageHeaderProps) {
  return (
    <section className={cn("border-b", onDark ? "border-white/10 bg-brand-800 text-white" : "border-neutral-200 bg-white")}>
      <Container className={cn("py-8 md:py-12", className)}>
        <Breadcrumb items={breadcrumb} />
        <div className="mt-5">
          <h1
            className={cn(
              "font-display font-semibold tracking-tight text-[clamp(2rem,4vw,3rem)] leading-tight",
              onDark ? "text-white" : "text-brand-900"
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p className={cn("mt-3 max-w-2xl text-base leading-relaxed", onDark ? "text-white/70" : "text-neutral-600")}>
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </Container>
    </section>
  );
}
