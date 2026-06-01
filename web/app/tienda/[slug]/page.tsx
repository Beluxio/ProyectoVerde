import { notFound } from "next/navigation";
import Image from "next/image";
import { getPlantBySlug, getAllPlants } from "@/lib/supabase";
import AddToCartButton from "@/components/plantas/AddToCartButton";
import { Droplets, Sun, Thermometer, Leaf, MapPin, Heart, Bug, Sprout } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  const plants = await getAllPlants().catch(() => []);
  return plants.map((p) => ({ slug: p.slug }));
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
  const plant = await getPlantBySlug(slug);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{plant.name}</h1>

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
