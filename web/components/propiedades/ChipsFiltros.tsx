"use client";

import { X } from "lucide-react";

export interface Chip {
  key: string;
  label: string;
}

export default function ChipsFiltros({ chips, onRemove, onLimpiar }: { chips: Chip[]; onRemove: (key: string) => void; onLimpiar: () => void }) {
  if (chips.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <span key={chip.key} className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-600">
          {chip.label}
          <button
            type="button"
            onClick={() => onRemove(chip.key)}
            aria-label={`Quitar filtro ${chip.label}`}
            className="inline-flex h-5 w-5 items-center justify-center rounded-full text-brand-600 hover:bg-brand-100"
          >
            <X size={13} />
          </button>
        </span>
      ))}
      {chips.length > 1 && (
        <button type="button" onClick={onLimpiar} className="text-sm text-neutral-500 underline hover:text-brand-600">
          Limpiar todos
        </button>
      )}
    </div>
  );
}
