"use client";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/lib/favorites-store";

interface Props {
  plantId: string;
  className?: string;
}

export default function FavoriteButton({ plantId, className = "" }: Props) {
  const [mounted, setMounted] = useState(false);
  const { toggle, isFavorite } = useFavoritesStore();

  useEffect(() => setMounted(true), []);

  const fav = mounted && isFavorite(plantId);

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(plantId); }}
      aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
      className={`p-2 rounded-full transition-all ${
        fav
          ? "bg-red-50 text-red-500 hover:bg-red-100"
          : "bg-white/80 text-gray-400 hover:text-red-400 hover:bg-white"
      } ${className}`}
    >
      <Heart className={`w-5 h-5 transition-all ${fav ? "fill-red-500" : ""}`} />
    </button>
  );
}
