import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppWidget from "@/components/layout/WhatsAppWidget";
import { NOMBRE_EMPRESA, TAGLINE, DESCRIPCION_SITIO } from "@/lib/constants";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: `${NOMBRE_EMPRESA} — ${TAGLINE}`,
    template: `%s · ${NOMBRE_EMPRESA}`,
  },
  description: DESCRIPCION_SITIO,
  keywords: ["inmobiliaria", "propiedades", "casas", "departamentos", "alquileres", "Buenos Aires"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sora.variable} ${inter.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
