export const runtime = "edge";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWindow from "@/components/chatbot/ChatWindow";
import WhatsAppButton from "@/components/social/WhatsAppButton";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProyectoVerde — Plantas para tu hogar y el planeta",
  description:
    "Venta de plantas en maceta pequeñas con información sobre cuidados, beneficios psicológicos y usos medicinales. Concientizando por un México más verde.",
  keywords: ["plantas", "macetas", "interior", "jardín", "botánica", "México", "plantas medicinales"],
  openGraph: {
    title: "ProyectoVerde",
    description: "Llevamos la naturaleza a tu hogar",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Widgets flotantes disponibles en todas las páginas */}
        <ChatWindow />
        <WhatsAppButton />
      </body>
    </html>
  );
}
