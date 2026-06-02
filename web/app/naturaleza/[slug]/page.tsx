import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getArticleBySlug, getPublishedArticles } from "@/lib/supabase";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";

export const runtime = "edge";

export async function generateStaticParams() {
  const articles = await getPublishedArticles().catch(() => []);
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  const description = article.excerpt ?? article.content.slice(0, 155);
  const imageUrl = article.cover_image ?? undefined;

  return {
    title: `${article.title} | ProyectoVerde`,
    description,
    openGraph: {
      title: `${article.title} | ProyectoVerde`,
      description,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: "article",
      publishedTime: article.published_at ?? undefined,
      authors: [article.author],
      locale: "es_MX",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
    },
  };
}

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

function renderMarkdownBasic(content: string): string {
  return content
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-gray-900 mb-4 mt-8">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-gray-800 mb-3 mt-6">$2</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-gray-800 mb-2 mt-4">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal">$2</li>')
    .replace(/(<li.*<\/li>\n?)+/g, (match) => `<ul class="space-y-1 my-3">${match}</ul>`)
    .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed text-gray-700">')
    .replace(/^/, '<p class="mb-4 leading-relaxed text-gray-700">')
    .replace(/$/, "</p>");
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const categoryColor = CATEGORY_COLORS[article.category] ?? "bg-gray-100 text-gray-600";
  const categoryLabel = CATEGORY_LABELS[article.category] ?? article.category;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <Link
        href="/naturaleza"
        className="inline-flex items-center gap-1.5 text-sm text-green-700 hover:text-green-600 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a Naturaleza
      </Link>

      {/* Categoría */}
      <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${categoryColor}`}>
        {categoryLabel}
      </span>

      {/* Título */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
        {article.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
        <span className="flex items-center gap-1.5">
          <User className="w-4 h-4" />
          {article.author}
        </span>
        {article.published_at && (
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {new Date(article.published_at).toLocaleDateString("es-MX", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        )}
        {article.read_time && (
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {article.read_time} min de lectura
          </span>
        )}
      </div>

      {/* Imagen de portada */}
      {article.cover_image && (
        <div className="rounded-2xl overflow-hidden mb-8 aspect-video bg-green-50">
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Contenido */}
      <div
        className="prose prose-green max-w-none"
        dangerouslySetInnerHTML={{ __html: renderMarkdownBasic(article.content) }}
      />

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mt-10 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-2">Etiquetas:</p>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="text-xs bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-10 bg-green-50 rounded-2xl p-6 text-center border border-green-100">
        <p className="text-gray-700 font-medium mb-3">
          ¿Te gustó este artículo? Lleva la naturaleza a tu hogar.
        </p>
        <Link
          href="/tienda"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          Ver plantas disponibles
        </Link>
      </div>
    </div>
  );
}
