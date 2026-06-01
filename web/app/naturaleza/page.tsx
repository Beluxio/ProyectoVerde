import Link from "next/link";
import { getPublishedArticles } from "@/lib/supabase";
import { ArrowRight, Clock } from "lucide-react";

export const revalidate = 3600;

const CATEGORY_LABELS: Record<string, string> = {
  conservacion: "Conservación",
  beneficios: "Beneficios",
  jardineria: "Jardinería",
  biodiversidad: "Biodiversidad",
  medicina_natural: "Medicina Natural",
  fauna_nociva: "Fauna Nociva",
};

const CATEGORY_COLORS: Record<string, string> = {
  conservacion: "bg-red-100 text-red-700",
  beneficios: "bg-green-100 text-green-700",
  jardineria: "bg-emerald-100 text-emerald-700",
  biodiversidad: "bg-teal-100 text-teal-700",
  medicina_natural: "bg-purple-100 text-purple-700",
  fauna_nociva: "bg-orange-100 text-orange-700",
};

export default async function NaturalezaPage() {
  const articles = await getPublishedArticles().catch(() => []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Naturaleza y Concientización 🌍
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed">
          Aprende sobre botánica, conservación y cómo cada planta aporta al equilibrio
          del planeta. Porque salvar las áreas verdes comienza con conocerlas y amarlas.
        </p>
      </div>

      {/* Banner de impacto */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 sm:p-8 text-white mb-10 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <p className="text-3xl font-bold">500,000</p>
            <p className="text-green-100 text-sm">hectáreas de bosque perdidas al año en México</p>
          </div>
          <div>
            <p className="text-3xl font-bold">4.8 m²</p>
            <p className="text-green-100 text-sm">área verde por habitante en ciudades mexicanas (OMS recomienda 9 m²)</p>
          </div>
          <div>
            <p className="text-3xl font-bold">1 planta</p>
            <p className="text-green-100 text-sm">= Tu voto por un México más verde</p>
          </div>
        </div>
      </div>

      {/* Artículos */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/naturaleza/${article.slug}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col"
            >
              {article.cover_image && (
                <div className="aspect-video bg-green-50 relative overflow-hidden">
                  <img src={article.cover_image} alt={article.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-5 flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2">
                  {article.category && (
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[article.category] ?? "bg-gray-100 text-gray-600"}`}>
                      {CATEGORY_LABELS[article.category] ?? article.category}
                    </span>
                  )}
                  {article.read_time && (
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {article.read_time} min
                    </span>
                  )}
                </div>
                <h2 className="font-bold text-gray-900 text-lg leading-snug flex-1">{article.title}</h2>
                {article.excerpt && (
                  <p className="text-sm text-gray-500 line-clamp-2">{article.excerpt}</p>
                )}
                <span className="text-green-600 text-sm font-medium flex items-center gap-1 mt-1">
                  Leer artículo <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-green-50 rounded-2xl">
          <p className="text-5xl mb-3">🌿</p>
          <p className="text-gray-600 font-medium">Pronto publicaremos artículos sobre naturaleza</p>
          <p className="text-sm text-gray-400 mt-1">Configura Supabase y ejecuta seed.sql para ver el contenido</p>
        </div>
      )}
    </div>
  );
}
