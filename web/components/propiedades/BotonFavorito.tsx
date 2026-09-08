"use client";

import { useSyncExternalStore, type MouseEvent } from "react";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { getFavoritos, toggleFavorito, favoritosServerSnapshot, FAVORITOS_EVENT } from "@/lib/favoritos";

function subscribe(callback: () => void) {
  window.addEventListener(FAVORITOS_EVENT, callback);
  return () => window.removeEventListener(FAVORITOS_EVENT, callback);
}

interface Props {
  slug: string;
  className?: string;
}

export default function BotonFavorito({ slug, className }: Props) {
  const favoritos = useSyncExternalStore(subscribe, getFavoritos, favoritosServerSnapshot);
  const activo = favoritos.includes(slug);

  function handleClick(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorito(slug);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={activo}
      aria-label={activo ? "Quitar de favoritos" : "Guardar en favoritos"}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-colors",
        activo ? "text-brand-600" : "text-neutral-500 hover:text-brand-600",
        className
      )}
    >
      <Icon name="heart" size={18} strokeWidth={activo ? 2.2 : 1.8} className={cn(activo && "fill-current")} />
    </button>
  );
}
