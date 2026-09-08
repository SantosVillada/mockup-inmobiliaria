"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Imagen } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function Galeria({ imagenes, titulo }: { imagenes: Imagen[]; titulo: string }) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const total = imagenes.length;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  if (total === 0) return null;

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={imagenes[index]?.url}
          alt={imagenes[index]?.alt ?? titulo}
          width={1200}
          height={900}
          className="aspect-[4/3] w-full object-cover"
          onClick={() => setLightbox(true)}
        />
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-brand-800 shadow-sm hover:bg-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-brand-800 shadow-sm hover:bg-white"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
        <span className="absolute bottom-3 right-3 rounded-full bg-brand-900/70 px-3 py-1 text-xs font-medium text-white">
          {index + 1}/{total}
        </span>
      </div>

      {total > 1 && (
        <div className="mt-3 flex gap-2">
          <div className="hidden flex-1 gap-2 md:flex">
            {imagenes.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver imagen ${i + 1}`}
                className={cn(
                  "h-16 w-16 overflow-hidden rounded-lg border-2 transition",
                  i === index ? "border-accent-400" : "border-transparent opacity-70 hover:opacity-100"
                )}
              >
                <img src={img.url} alt={img.alt} width={64} height={64} className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
          <div className="flex flex-1 items-center justify-center gap-1.5 md:hidden">
            {imagenes.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ir a imagen ${i + 1}`}
                className={cn("h-2.5 rounded-full transition-all", i === index ? "w-6 bg-brand-600" : "w-2.5 bg-neutral-300")}
              />
            ))}
          </div>
        </div>
      )}

      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-900/90 p-4" role="dialog" aria-modal="true" aria-label="Galería ampliada">
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Cerrar galería"
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X size={22} />
          </button>
          <img
            src={imagenes[index]?.url}
            alt={imagenes[index]?.alt ?? titulo}
            width={1200}
            height={900}
            className="max-h-[85vh] w-auto max-w-full rounded-xl object-contain"
          />
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Imagen anterior"
                className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Imagen siguiente"
                className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
            {index + 1}/{total}
          </span>
        </div>
      )}
    </div>
  );
}
