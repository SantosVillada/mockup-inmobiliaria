"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { waLinkGeneral } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STICKY_PAGES = [/^\/propiedades\/.+/, /^\/agentes\/.+/];

export default function WhatsAppWidget() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 150);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hidden = STICKY_PAGES.some((re) => re.test(pathname));
  if (hidden) return null;

  return (
    <a
      href={waLinkGeneral()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultá por WhatsApp"
      className={cn(
        "fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-all duration-300 hover:bg-whatsapp-strong hover:scale-105 md:hidden",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      )}
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
