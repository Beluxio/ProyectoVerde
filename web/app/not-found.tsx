export const runtime = "edge";

import Link from "next/link";
import { Leaf, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl mb-6 animate-bounce">🌵</div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-2">Esta página no existe</p>
      <p className="text-gray-400 mb-8 max-w-sm">
        Parece que esta planta no está en nuestro catálogo, o quizás se fue a otro macetero.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          <Leaf className="w-4 h-4" />
          Ir al inicio
        </Link>
        <Link
          href="/tienda"
          className="inline-flex items-center gap-2 border-2 border-green-600 text-green-700 hover:bg-green-50 font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          Ver plantas
        </Link>
      </div>
    </div>
  );
}
