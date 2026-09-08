"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  page: number;
  totalPages: number;
  totalItems: number;
  from: number;
  to: number;
  onPageChange: (page: number) => void;
}

export default function Paginacion({ page, totalPages, totalItems, from, to, onPageChange }: Props) {
  if (totalPages <= 1 && totalItems <= 9) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center gap-4 py-8 sm:flex-row sm:justify-between">
      <p className="text-sm text-neutral-500">
        Mostrando <span className="font-medium text-neutral-800">{from}–{to}</span> de{" "}
        <span className="font-medium text-neutral-800">{totalItems}</span> propiedades
      </p>
      <nav aria-label="Paginación" className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          aria-label="Página anterior"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-600 hover:bg-brand-50 disabled:cursor-not-allowed disabled:text-neutral-300"
        >
          <ChevronLeft size={18} />
        </button>
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition",
              p === page ? "bg-brand-600 text-white" : "text-neutral-600 hover:bg-neutral-100"
            )}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          aria-label="Página siguiente"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-600 hover:bg-brand-50 disabled:cursor-not-allowed disabled:text-neutral-300"
        >
          <ChevronRight size={18} />
        </button>
      </nav>
    </div>
  );
}
