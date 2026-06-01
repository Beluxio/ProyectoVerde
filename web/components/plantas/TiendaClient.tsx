"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import PlantCard from "./PlantCard";
import type { Plant } from "@/lib/types";

const CATEGORIES = [
  { value: "", label: "Todas" },
  { value: "interior", label: "🏠 Interior" },
  { value: "exterior", label: "🌤 Exterior" },
  { value: "suculenta", label: "🪴 Suculentas" },
  { value: "aromatica", label: "🌿 Aromáticas" },
  { value: "medicinal", label: "🌺 Medicinales" },
  { value: "cactus", label: "🌵 Cactus" },
  { value: "helecho", label: "🌱 Helechos" },
];

const DIFFICULTIES = [
  { value: "", label: "Cualquier nivel" },
  { value: "facil", label: "🟢 Fácil" },
  { value: "media", label: "🟡 Media" },
  { value: "dificil", label: "🔴 Difícil" },
];

interface Props {
  plants: Plant[];
  categoria: string;
  dificultad: string;
}

export default function TiendaClient({ plants, categoria, dificultad }: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return plants;
    const q = search.toLowerCase();
    return plants.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.scientific_name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [plants, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Tienda de plantas</h1>
        <p className="text-gray-500 mt-1">
          {filtered.length} {filtered.length === 1 ? "planta encontrada" : "plantas encontradas"}
        </p>
      </div>

      {/* Buscador */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre, especie o característica..."
          className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-2xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="space-y-3 mb-8">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-20">Categoría</span>
          {CATEGORIES.map(({ value, label }) => (
            <Link
              key={value}
              href={`/tienda?${new URLSearchParams({ ...(value && { categoria: value }), ...(dificultad && { dificultad }) }).toString()}`}
              className={`text-sm px-3 py-1.5 rounded-full border transition-all ${
                categoria === value
                  ? "bg-green-600 text-white border-green-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-700"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-20">Nivel</span>
          {DIFFICULTIES.map(({ value, label }) => (
            <Link
              key={value}
              href={`/tienda?${new URLSearchParams({ ...(categoria && { categoria }), ...(value && { dificultad: value }) }).toString()}`}
              className={`text-sm px-3 py-1.5 rounded-full border transition-all ${
                dificultad === value
                  ? "bg-green-600 text-white border-green-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-700"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-green-50 rounded-2xl">
          <p className="text-5xl mb-3">{search ? "🔍" : "🌱"}</p>
          <p className="text-gray-600 font-medium">
            {search ? `Sin resultados para "${search}"` : "No hay plantas con estos filtros"}
          </p>
          <button
            onClick={() => setSearch("")}
            className="text-green-600 text-sm mt-2 hover:underline"
          >
            {search ? "Limpiar búsqueda" : ""}
          </button>
          {!search && (
            <Link href="/tienda" className="text-green-600 text-sm mt-2 hover:underline block">
              Ver todas las plantas
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
