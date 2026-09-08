import { cn } from "@/lib/utils";

interface StatProps {
  value: string;
  label: string;
  onDark?: boolean;
  className?: string;
}

export default function Stat({ value, label, onDark = false, className }: StatProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <span
        className={cn(
          "font-display font-semibold leading-none tracking-tight text-[clamp(2rem,4vw,2.75rem)]",
          onDark ? "text-white" : "text-brand-600"
        )}
      >
        {value}
      </span>
      <span className={cn("mt-2 text-sm", onDark ? "text-white/70" : "text-neutral-500")}>{label}</span>
    </div>
  );
}
