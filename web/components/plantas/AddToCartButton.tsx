"use client";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import type { Plant } from "@/lib/types";

interface Props {
  plant: Pick<Plant, "id" | "slug" | "name" | "price" | "main_image" | "stock">;
}

export default function AddToCartButton({ plant }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  if (plant.stock === 0) {
    return (
      <button disabled className="w-full bg-gray-200 text-gray-400 font-semibold py-3 rounded-xl cursor-not-allowed">
        Sin stock
      </button>
    );
  }

  const handleAdd = () => {
    addItem({
      id: plant.id,
      slug: plant.slug,
      name: plant.name,
      price: plant.price,
      main_image: plant.main_image,
      stock: plant.stock,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition-all ${
        added
          ? "bg-emerald-500 text-white"
          : "bg-green-600 hover:bg-green-500 text-white"
      }`}
    >
      {added ? (
        <>
          <Check className="w-5 h-5" />
          ¡Agregado al carrito!
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          Agregar al carrito
        </>
      )}
    </button>
  );
}
