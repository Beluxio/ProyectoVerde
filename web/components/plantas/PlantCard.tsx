import Link from "next/link";
import { ShoppingCart, Droplets } from "lucide-react";
import type { Plant } from "@/lib/types";
import PlantImage from "./PlantImage";

const DIFFICULTY_STYLES: Record<string, string> = {
  facil: "bg-green-100 text-green-700",
  media: "bg-yellow-100 text-yellow-700",
  dificil: "bg-red-100 text-red-700",
};

const DIFFICULTY_LABEL: Record<string, string> = {
  facil: "Fácil",
  media: "Media",
  dificil: "Difícil",
};

interface PlantCardProps {
  plant: Pick<Plant, "id" | "slug" | "name" | "scientific_name" | "price" | "stock" | "care_difficulty" | "main_image" | "category" | "tags" | "description" | "care_water" | "care_light">;
}

export default function PlantCard({ plant }: PlantCardProps) {
  const inStock = plant.stock > 0;

  return (
    <Link
      href={`/tienda/${plant.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 flex flex-col"
    >
      {/* Imagen */}
      <div className="relative aspect-square bg-green-50 overflow-hidden">
        <PlantImage
          src={plant.main_image}
          alt={plant.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {!inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-800 text-sm font-semibold px-3 py-1 rounded-full">
              Sin stock
            </span>
          </div>
        )}
        {plant.care_difficulty && (
          <span className={`absolute top-2 left-2 text-xs font-medium px-2 py-0.5 rounded-full ${DIFFICULTY_STYLES[plant.care_difficulty]}`}>
            {DIFFICULTY_LABEL[plant.care_difficulty]}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
            {plant.name}
          </h3>
          {plant.scientific_name && (
            <p className="text-xs text-gray-400 italic">{plant.scientific_name}</p>
          )}
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 flex-1">
          {plant.description}
        </p>

        {/* Cuidados rápidos */}
        <div className="flex gap-3 text-xs text-gray-500">
          {plant.care_water && (
            <span className="flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-blue-400" />
              {plant.care_water.split(".")[0]}
            </span>
          )}
        </div>

        {/* Precio y CTA */}
        <div className="flex items-center justify-between mt-1">
          <span className="font-bold text-lg text-green-700">
            ${plant.price.toFixed(2)}
            <span className="text-xs font-normal text-gray-400 ml-1">MXN</span>
          </span>
          {inStock && (
            <span className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white text-sm px-3 py-1.5 rounded-lg transition-colors">
              <ShoppingCart className="w-4 h-4" />
              Ver
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
