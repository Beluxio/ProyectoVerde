"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import CartCount from "./CartCount";

const NAV_LINKS = [
  { href: "/tienda", label: "Tienda" },
  { href: "/naturaleza", label: "Naturaleza" },
  { href: "/chatbot", label: "VerdBot 🌿" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-green-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-green-700 hover:text-green-600 transition-colors">
          <Leaf className="w-6 h-6" />
          ProyectoVerde
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm font-medium transition-colors hover:text-green-600 ${
                  pathname.startsWith(href)
                    ? "text-green-700 border-b-2 border-green-500 pb-0.5"
                    : "text-gray-600"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/carrito"
            className="relative p-2 text-gray-600 hover:text-green-600 transition-colors"
            aria-label="Carrito de compras"
          >
            <ShoppingCart className="w-6 h-6" />
            <CartCount />
          </Link>

          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-green-100 px-4 py-3 space-y-2">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block py-2 text-gray-700 font-medium hover:text-green-600"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
