"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import Drawer from "@/components/ui/Drawer";
import Icon from "@/components/ui/Icon";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { waLinkGeneral } from "@/lib/utils";
import { getFavoritos, favoritosServerSnapshot, FAVORITOS_EVENT } from "@/lib/favoritos";

function subscribeFavoritos(callback: () => void) {
  window.addEventListener(FAVORITOS_EVENT, callback);
  return () => window.removeEventListener(FAVORITOS_EVENT, callback);
}

const NAV = [
  { label: "Inicio", href: "/" },
  { label: "Propiedades", href: "/propiedades" },
  { label: "Servicios", href: "/servicios" },
  { label: "Agentes", href: "/agentes" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const favoritos = useSyncExternalStore(subscribeFavoritos, getFavoritos, favoritosServerSnapshot);
  const favoritosCount = favoritos.length;
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 border-b",
          scrolled
            ? "bg-white/95 backdrop-blur border-neutral-200 shadow-sm"
            : "bg-white border-transparent"
        )}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between px-4 md:px-6">
          <Logo size="sm" />

          <nav className="hidden items-center gap-1 md:flex" aria-label="Navegación principal">
            {NAV.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active ? "text-brand-600 bg-brand-50" : "text-neutral-600 hover:text-brand-600 hover:bg-neutral-100"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/favoritos"
              aria-label={`Favoritos (${favoritosCount})`}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-accent-400"
            >
              <Icon name="heart" size={22} className={cn(favoritosCount > 0 && "fill-current text-brand-600")} />
              {favoritosCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-400 px-1 text-[11px] font-bold text-brand-900">
                  {favoritosCount}
                </span>
              )}
            </Link>
            <a
              href={waLinkGeneral()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Consultar por WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-accent-400"
            >
              <WhatsAppIcon size={22} />
            </a>
            <Button href="/vender" variant="primary" size="sm">
              Vender mi propiedad
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-700 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-accent-400 md:hidden"
          >
            <Icon name="menu" size={22} />
          </button>
        </div>
      </header>

      <Drawer open={open} onClose={() => setOpen(false)} title="Menú">
        <nav className="flex flex-col gap-1" aria-label="Navegación móvil">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-medium text-neutral-800 hover:bg-neutral-100"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/favoritos"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-neutral-800 hover:bg-neutral-100"
          >
            <span className="inline-flex items-center gap-2">
              <Icon name="heart" size={20} />
              Favoritos
            </span>
            {favoritosCount > 0 && (
              <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-accent-400 px-1.5 text-xs font-bold text-brand-900">
                {favoritosCount}
              </span>
            )}
          </Link>
        </nav>
        <div className="mt-6 flex flex-col gap-3">
          <Button href="/vender" variant="primary" className="w-full">
            Vender mi propiedad
          </Button>
          <Button href={waLinkGeneral()} external variant="secondary" className="w-full">
            <WhatsAppIcon size={18} />
            Consultá por WhatsApp
          </Button>
        </div>
      </Drawer>
    </>
  );
}
