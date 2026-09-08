const KEY = "morada:favoritos";
const EVENT = "morada:favoritos";

let memoria: string[] | null = null;
const VACIO: string[] = [];

function leer(): string[] {
  if (typeof window === "undefined") return VACIO;
  if (memoria === null) {
    try {
      const raw = window.localStorage.getItem(KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      memoria = Array.isArray(parsed) ? parsed : [];
    } catch {
      memoria = [];
    }
  }
  return memoria;
}

function guardar(slugs: string[]) {
  memoria = slugs;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(slugs));
    window.dispatchEvent(new Event(EVENT));
  }
}

export function getFavoritos(): string[] {
  return leer();
}

export function favoritosServerSnapshot(): string[] {
  return VACIO;
}

export function esFavorito(slug: string): boolean {
  return leer().includes(slug);
}

export function toggleFavorito(slug: string): string[] {
  const actual = leer();
  const siguientes = actual.includes(slug)
    ? actual.filter((s) => s !== slug)
    : [...actual, slug];
  guardar(siguientes);
  return siguientes;
}

export const FAVORITOS_EVENT = EVENT;
