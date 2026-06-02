import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getPlantBySlug } from "@/lib/supabase";
import AddToCartButton from "@/components/plantas/AddToCartButton";
import PlantImage from "@/components/plantas/PlantImage";
import RelatedPlants from "@/components/plantas/RelatedPlants";
import FavoriteButton from "@/components/plantas/FavoriteButton";
import { Droplets, Sun, Thermometer, Leaf, MapPin, Heart, Bug, Sprout } from "lucide-react";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const plant = await getPlantBySlug(slug);
  if (!plant) return {};

  const description = `${plant.description.slice(0, 155)}...`;
  const imageUrl = plant.main_image ?? undefined;

  return {
    title: `${plant.name} | ProyectoVerde`,
    description,
    openGraph: {
      title: `${plant.name} — $${plant.price.toFixed(2)} MXN | ProyectoVerde`,
      description,
      images: imageUrl ? [{ url: imageUrl, width: 600, height: 600 }] : [],
      type: "website",
      locale: "es_MX",
    },
    twitter: {
      card: "summary_large_image",
      title: `${plant.name} | ProyectoVerde`,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

const TABS = [
  { id: "cuidados", label: "🌿 Cuidados" },
  { id: "beneficios", label: "💚 Beneficios" },
  { id: "medicina", label: "🌺 Medicina natural" },
  { id: "origen", label: "🗺️ Dónde encontrarla" },
  { id: "plagas", label: "🪲 Plagas y remedios" },
];

export default async function PlantDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [plant, allPlants] = await Promise.all([
    getPlantBySlug(slug),
    getAllPlants(),
  ]);
  if (!plant) notFound();

  const images = plant.images?.length ? plant.images : plant.main_image ? [plant.main_image] : [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <a href="/tienda" className="hover:text-green-600">Tienda</a>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{plant.name}</span>
      </nav>

      {/* Sección principal */}
      <div className="grid md:grid-cols-2 gap-10 mb-12">
        {/* Imágenes */}
        <div className="space-y-3">
          <div className="relative aspect-square bg-green-50 rounded-2xl overflow-hidden">
            {images[0] ? (
              <Image
                src={images[0]}
                alt={plant.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">🌿</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.slice(1).map((img, i) => (
                <div key={i} className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-green-50">
                  <Image src={img} alt={`${plant.name} ${i + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info y compra */}
        <div>
          {plant.scientific_name && (
            <p className="text-sm text-gray-400 italic mb-1">{plant.scientific_name}</p>
          )}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{plant.name}</h1>
            <FavoriteButton plantId={plant.id} className="mt-1 flex-shrink-0 border border-gray-100 shadow-sm" />
          </div>

          {/* Tags */}
          {plant.tags && plant.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {plant.tags.map((tag) => (
                <span key={tag} className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                  {tag.replace(/_/g, " ")}
                </span>
              ))}
            </div>
          )}

          <p className="text-gray-600 leading-relaxed mb-6">{plant.description}</p>

          {/* Precio y compra */}
          <div className="bg-green-50 rounded-2xl p-5 mb-6">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl font-bold text-green-700">${plant.price.toFixed(2)}</span>
              <span className="text-gray-500">MXN</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              {plant.stock > 0 ? `✅ En stock (${plant.stock} disponibles)` : "❌ Sin stock por el momento"}
            </p>
            <AddToCartButton plant={plant} />
            {/* Compartir por WhatsApp */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `🌿 Mira esta planta en ProyectoVerde:\n*${plant.name}* (${plant.scientific_name ?? ""})\n${plant.description.slice(0, 120)}...\n\n💰 $${plant.price.toFixed(2)} MXN\n\n🔗 https://beluxio.org/tienda/${plant.slug}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full flex items-center justify-center gap-2 border-2 border-green-200 text-green-700 hover:bg-green-50 font-medium py-2.5 rounded-xl transition-colors text-sm"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Compartir por WhatsApp
            </a>
          </div>

          {/* Resumen de cuidados */}
          <div className="grid grid-cols-2 gap-3">
            {plant.care_difficulty && (
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-100 rounded-xl p-3">
                <Sprout className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Dificultad: <strong>{plant.care_difficulty}</strong></span>
              </div>
            )}
            {plant.care_temp_min != null && (
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-100 rounded-xl p-3">
                <Thermometer className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>{plant.care_temp_min}°C – {plant.care_temp_max}°C</span>
              </div>
            )}
            {plant.category && (
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-100 rounded-xl p-3">
                <Leaf className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="capitalize">{plant.category}</span>
              </div>
            )}
            {plant.size && (
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-100 rounded-xl p-3">
                <span className="text-base">📏</span>
                <span className="capitalize">Tamaño {plant.size}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs de información detallada */}
      <PlantTabs plant={plant} />

      {/* Plantas relacionadas */}
      <RelatedPlants
        currentSlug={plant.slug}
        category={plant.category}
        plants={allPlants}
      />
    </div>
  );
}

function PlantTabs({ plant }: { plant: Awaited<ReturnType<typeof getPlantBySlug>> }) {
  if (!plant) return null;

  return (
    <div className="rounded-2xl overflow-hidden space-y-2 mt-2">

      {/* Cuidados — verde oscuro */}
      <details className="group" open>
        <summary className="flex items-center justify-between px-6 py-4 cursor-pointer bg-green-700 hover:bg-green-600 transition-colors rounded-xl">
          <span className="font-semibold text-white text-base">🌿 Guía de cuidados</span>
          <span className="text-green-200 group-open:rotate-180 transition-transform text-lg">▾</span>
        </summary>
        <div className="px-6 py-5 grid sm:grid-cols-2 gap-5 text-sm bg-green-700 text-white rounded-b-xl -mt-2 pt-6">
          {plant.care_water && (
            <div className="flex gap-3 items-start">
              <Droplets className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" />
              <div><p className="font-semibold text-green-100 mb-0.5">Riego</p><p className="text-green-50 leading-relaxed">{plant.care_water}</p></div>
            </div>
          )}
          {plant.care_light && (
            <div className="flex gap-3 items-start">
              <Sun className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" />
              <div><p className="font-semibold text-green-100 mb-0.5">Luz</p><p className="text-green-50 leading-relaxed">{plant.care_light}</p></div>
            </div>
          )}
          {plant.care_substrate && (
            <div className="flex gap-3 items-start">
              <span className="text-base mt-0.5">🪴</span>
              <div><p className="font-semibold text-green-100 mb-0.5">Sustrato</p><p className="text-green-50 leading-relaxed">{plant.care_substrate}</p></div>
            </div>
          )}
          {plant.care_humidity && (
            <div className="flex gap-3 items-start">
              <span className="text-base mt-0.5">💧</span>
              <div><p className="font-semibold text-green-100 mb-0.5">Humedad</p><p className="text-green-50 leading-relaxed">{plant.care_humidity}</p></div>
            </div>
          )}
          {plant.care_fertilizer && (
            <div className="flex gap-3 items-start">
              <span className="text-base mt-0.5">🌱</span>
              <div><p className="font-semibold text-green-100 mb-0.5">Fertilización</p><p className="text-green-50 leading-relaxed">{plant.care_fertilizer}</p></div>
            </div>
          )}
        </div>
      </details>

      {/* Beneficios — esmeralda */}
      {plant.psychological_benefits && (
        <details className="group">
          <summary className="flex items-center justify-between px-6 py-4 cursor-pointer bg-emerald-700 hover:bg-emerald-600 transition-colors rounded-xl">
            <span className="font-semibold text-white text-base">💚 Beneficios para tu bienestar</span>
            <span className="text-emerald-200 group-open:rotate-180 transition-transform text-lg">▾</span>
          </summary>
          <div className="px-6 py-5 bg-emerald-700 text-white rounded-b-xl -mt-2 pt-6 leading-relaxed text-sm">
            <Heart className="w-5 h-5 text-rose-300 mb-3" />
            <p className="text-emerald-50">{plant.psychological_benefits}</p>
          </div>
        </details>
      )}

      {/* Medicina natural — teal */}
      {plant.medicinal_uses && (
        <details className="group">
          <summary className="flex items-center justify-between px-6 py-4 cursor-pointer bg-teal-700 hover:bg-teal-600 transition-colors rounded-xl">
            <span className="font-semibold text-white text-base">🌺 Usos medicinales naturales</span>
            <span className="text-teal-200 group-open:rotate-180 transition-transform text-lg">▾</span>
          </summary>
          <div className="px-6 py-5 bg-teal-700 text-white rounded-b-xl -mt-2 pt-6 text-sm space-y-3">
            <p className="text-teal-50 leading-relaxed">{plant.medicinal_uses}</p>
            <p className="text-xs text-amber-200 bg-amber-900/40 rounded-lg p-3 border border-amber-400/30">
              ⚠️ Consulta a un profesional de la salud antes de usar plantas medicinales con fines terapéuticos.
            </p>
          </div>
        </details>
      )}

      {/* Origen geográfico — azul verdoso */}
      {plant.geographical_origin && (
        <details className="group">
          <summary className="flex items-center justify-between px-6 py-4 cursor-pointer bg-cyan-800 hover:bg-cyan-700 transition-colors rounded-xl">
            <span className="font-semibold text-white text-base">🗺️ Dónde encontrarla en la naturaleza</span>
            <span className="text-cyan-200 group-open:rotate-180 transition-transform text-lg">▾</span>
          </summary>
          <div className="px-6 py-5 bg-cyan-800 text-white rounded-b-xl -mt-2 pt-6 text-sm space-y-3">
            <div className="flex gap-3 items-start">
              <MapPin className="w-5 h-5 text-cyan-300 mt-0.5 flex-shrink-0" />
              <p className="text-cyan-50 leading-relaxed">{plant.geographical_origin}</p>
            </div>
            {plant.fun_facts && (
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <p className="text-white"><span className="font-semibold">💡 Dato curioso:</span> {plant.fun_facts}</p>
              </div>
            )}
          </div>
        </details>
      )}

      {/* Plagas — verde olivo */}
      {plant.harmful_pests && (
        <details className="group">
          <summary className="flex items-center justify-between px-6 py-4 cursor-pointer bg-olive-700 bg-green-900 hover:bg-green-800 transition-colors rounded-xl">
            <span className="font-semibold text-white text-base">🪲 Plagas comunes y remedios</span>
            <span className="text-green-300 group-open:rotate-180 transition-transform text-lg">▾</span>
          </summary>
          <div className="px-6 py-5 bg-green-900 text-white rounded-b-xl -mt-2 pt-6 text-sm space-y-4">
            <div className="flex gap-3 items-start">
              <Bug className="w-5 h-5 text-red-300 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-100 mb-1">Plagas frecuentes</p>
                <p className="text-green-50 leading-relaxed">{plant.harmful_pests}</p>
              </div>
            </div>
            {plant.recommended_repellents && (
              <div className="flex gap-3 items-start">
                <span className="text-base mt-0.5">🌿</span>
                <div>
                  <p className="font-semibold text-green-100 mb-1">Remedios recomendados (orgánicos primero)</p>
                  <p className="text-green-50 leading-relaxed">{plant.recommended_repellents}</p>
                </div>
              </div>
            )}
            <p className="text-xs text-green-200 bg-white/10 rounded-lg p-3 border border-white/20">
              💬 ¿Tu planta tiene una plaga? Pregúntale a VerdBot en el chat — te ayudará a identificarla y tratarla.
            </p>
          </div>
        </details>
      )}
    </div>
  );
}
