import Link from "next/link";
import { Leaf, Heart, MessageCircle, ShieldCheck, ArrowRight } from "lucide-react";
import { getFeaturedPlants, getPublishedArticles } from "@/lib/supabase";
import PlantCard from "@/components/plantas/PlantCard";
import NewsletterForm from "@/components/ui/NewsletterForm";

const STATS = [
  { value: "50+", label: "Especies disponibles" },
  { value: "100%", label: "Plantas sanas y certificadas" },
  { value: "4.9★", label: "Satisfacción del cliente" },
  { value: "24h", label: "Respuesta de VerdBot" },
];

const FEATURES = [
  {
    icon: <Leaf className="w-7 h-7 text-green-600" />,
    title: "Plantas cuidadas con amor",
    desc: "Cada planta viene con guía de cuidado personalizada y seleccionada de viveros de confianza.",
  },
  {
    icon: <Heart className="w-7 h-7 text-rose-500" />,
    title: "Beneficios para tu bienestar",
    desc: "Aprende cómo cada planta mejora tu salud mental, purifica el aire y aporta beneficios medicinales.",
  },
  {
    icon: <MessageCircle className="w-7 h-7 text-blue-500" />,
    title: "VerdBot siempre disponible",
    desc: "Nuestro chatbot experto en botánica responde tus dudas sobre cuidados, plagas y plantas medicinales.",
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-emerald-600" />,
    title: "Comprometidos con el planeta",
    desc: "Parte de nuestras ventas se destina a iniciativas de reforestación y defensa de áreas verdes en México.",
  },
];

export default async function HomePage() {
  const [featuredPlants, articles] = await Promise.all([
    getFeaturedPlants().catch(() => []),
    getPublishedArticles().catch(() => []),
  ]);

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
              🌱 México más verde
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Lleva la{" "}
              <span className="text-green-600">naturaleza</span>{" "}
              a tu hogar
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Plantas en maceta pequeñas, con toda la información sobre sus cuidados,
              beneficios psicológicos, usos medicinales y su importancia para el planeta.
              Porque amar las plantas es amar la vida.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tienda"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-md"
              >
                Ver plantas
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/chatbot"
                className="inline-flex items-center gap-2 border-2 border-green-600 text-green-700 hover:bg-green-50 font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Hablar con VerdBot
              </Link>
            </div>
          </div>

          <div className="hidden md:flex justify-center items-center">
            <div className="relative w-72 h-72">
              <div className="absolute inset-0 bg-green-200 rounded-full opacity-30 animate-pulse" />
              <div className="absolute inset-6 bg-green-300 rounded-full opacity-20" />
              <div className="w-full h-full flex items-center justify-center text-9xl">
                🌿
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,32 C360,0 1080,0 1440,32 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-bold text-green-700">{value}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLANTAS DESTACADAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Plantas destacadas</h2>
            <p className="text-gray-500 mt-1">Las favoritas de nuestra comunidad</p>
          </div>
          <Link
            href="/tienda"
            className="hidden sm:inline-flex items-center gap-1 text-green-700 font-medium hover:text-green-600 transition-colors"
          >
            Ver todas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {featuredPlants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-green-50 rounded-2xl text-gray-500">
            <p className="text-5xl mb-3">🌱</p>
            <p className="font-medium">Próximamente nuestro catálogo</p>
            <p className="text-sm mt-1">Configura Supabase para ver las plantas disponibles</p>
          </div>
        )}
      </section>

      {/* FEATURES */}
      <section className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">¿Por qué ProyectoVerde?</h2>
            <p className="text-gray-500 mt-2">Más que plantas, una comunidad que ama la naturaleza</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
                <div className="mb-3">{icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONCIENTIZACIÓN CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-gradient-to-r from-green-700 to-emerald-600 rounded-3xl p-8 sm:p-12 text-white text-center">
          <span className="text-5xl mb-4 block">🌍</span>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            México pierde 500,000 hectáreas de bosque al año
          </h2>
          <p className="text-green-100 text-lg mb-6 max-w-2xl mx-auto">
            Las ciudades mexicanas tienen apenas 4.8 m² de área verde por habitante.
            La OMS recomienda mínimo 9 m². Cada planta en tu hogar es un voto
            por un México más verde.
          </p>
          <Link
            href="/naturaleza"
            className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors"
          >
            Leer sobre conservación
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ARTÍCULOS RECIENTES */}
      {articles.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Del blog de naturaleza</h2>
            <p className="text-gray-500 mb-8">Aprende, inspírate y únete al movimiento verde</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {articles.slice(0, 2).map((article) => (
                <Link
                  key={article.id}
                  href={`/naturaleza/${article.slug}`}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                    {article.category?.replace("_", " ")}
                  </span>
                  <h3 className="font-bold text-gray-900 text-lg mt-1 mb-2 leading-snug">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-sm text-gray-500 line-clamp-2">{article.excerpt}</p>
                  )}
                  <span className="text-green-600 text-sm font-medium mt-3 flex items-center gap-1">
                    Leer más <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* NEWSLETTER */}
      <section className="bg-gradient-to-br from-green-800 to-emerald-700 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-4xl mb-4 block">🌿</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Únete a la comunidad verde
          </h2>
          <p className="text-green-200 mb-8 leading-relaxed">
            Recibe consejos de cuidado de plantas, artículos sobre naturaleza,
            novedades del catálogo y contenido exclusivo. Sin spam, solo verde.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
