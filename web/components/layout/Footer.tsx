import Link from "next/link";
import { Leaf, Send } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const INSTAGRAM_URL = "https://instagram.com/proyectoverde_mx";
const TELEGRAM_URL = "https://t.me/proyectoverde";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-green-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Marca */}
        <div>
          <div className="flex items-center gap-2 font-bold text-xl text-white mb-3">
            <Leaf className="w-5 h-5" />
            ProyectoVerde
          </div>
          <p className="text-sm text-green-300 leading-relaxed">
            Llevamos la naturaleza a tu hogar. Plantas, cuidados y conciencia ambiental para un México más verde.
          </p>
          {/* Redes sociales */}
          <div className="flex gap-3 mt-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-green-800 rounded-lg hover:bg-green-700 transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-green-800 rounded-lg hover:bg-green-700 transition-colors"
              aria-label="Canal de Telegram"
            >
              <Send className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold text-white mb-3">Explorar</h3>
          <ul className="space-y-2 text-sm text-green-300">
            <li><Link href="/tienda" className="hover:text-white transition-colors">Tienda de plantas</Link></li>
            <li><Link href="/naturaleza" className="hover:text-white transition-colors">Artículos de naturaleza</Link></li>
            <li><Link href="/chatbot" className="hover:text-white transition-colors">VerdBot — Chatbot botánico</Link></li>
            <li>
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Canal de Telegram
              </a>
            </li>
          </ul>
        </div>

        {/* Canal Telegram widget */}
        <div>
          <h3 className="font-semibold text-white mb-3">Únete a la comunidad</h3>
          <p className="text-sm text-green-300 mb-3">
            Recibe consejos de cuidado, datos curiosos sobre plantas y alertas de nuevas llegadas.
          </p>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#2AABEE] hover:bg-[#1a9dde] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
            Unirse al canal de Telegram
          </a>
        </div>
      </div>

      <div className="border-t border-green-800 px-4 sm:px-6 py-4 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-green-500">
        <p>© {new Date().getFullYear()} ProyectoVerde — México</p>
        <p>
          Hecho con 💚 para concientizar y compartir el amor por la naturaleza
        </p>
      </div>
    </footer>
  );
}
