"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIOS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function CarruselTestimonios() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = TESTIMONIOS.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 5000);
    return () => clearInterval(id);
  }, [paused, total]);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {TESTIMONIOS.map((item) => (
            <figure key={item.id} className="w-full shrink-0 px-1">
              <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm md:p-8">
                <div className="flex justify-center gap-1 text-accent-400" aria-label={`${item.rating} de 5 estrellas`}>
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="mt-4 text-lg leading-relaxed text-neutral-800">
                  “{item.cita}”
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.nombre}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-semibold text-brand-900">{item.nombre}</p>
                    <p className="text-sm text-neutral-500">{item.rol}</p>
                  </div>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Testimonio anterior"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-brand-600 hover:bg-brand-50"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-1.5">
          {TESTIMONIOS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Testimonio ${i + 1}`}
              className={cn("h-2.5 rounded-full transition-all", i === index ? "w-6 bg-brand-600" : "w-2.5 bg-neutral-300")}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          aria-label="Testimonio siguiente"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-brand-600 hover:bg-brand-50"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
