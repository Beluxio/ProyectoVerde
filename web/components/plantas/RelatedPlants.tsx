import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PlantCard from "./PlantCard";
import type { Plant } from "@/lib/types";

interface Props {
  currentSlug: string;
  category: string | null;
  plants: Plant[];
}

export default function RelatedPlants({ currentSlug, category, plants }: Props) {
  const related = plants
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-14 pt-10 border-t border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">También te puede gustar</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Más plantas de la categoría{" "}
            <span className="text-green-700 font-medium capitalize">{category}</span>
          </p>
        </div>
        <Link
          href={`/tienda?categoria=${category}`}
          className="hidden sm:inline-flex items-center gap-1 text-sm text-green-700 hover:text-green-600 font-medium transition-colors"
        >
          Ver todas <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {related.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>

      <div className="text-center mt-5 sm:hidden">
        <Link
          href={`/tienda?categoria=${category}`}
          className="text-green-700 text-sm font-medium hover:underline"
        >
          Ver todas las plantas {category} →
        </Link>
      </div>
    </section>
  );
}
