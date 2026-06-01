"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cart-store";

export default function CartCount() {
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());

  useEffect(() => setMounted(true), []);

  if (!mounted || itemCount === 0) return null;

  return (
    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
      {itemCount > 9 ? "9+" : itemCount}
    </span>
  );
}
