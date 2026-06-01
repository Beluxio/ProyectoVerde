"use client";
import { useCartStore } from "@/lib/cart-store";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, Leaf } from "lucide-react";
import Link from "next/link";
import PlantImage from "@/components/plantas/PlantImage";

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, total, itemCount, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h1>
        <p className="text-gray-500 mb-6">Agrega algunas plantas para comenzar</p>
        <Link
          href="/tienda"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <Leaf className="w-4 h-4" />
          Ver plantas
        </Link>
      </div>
    );
  }

  const subtotal = total();
  const shipping = subtotal >= 500 ? 0 : 99;
  const grandTotal = subtotal + shipping;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Carrito ({itemCount()} {itemCount() === 1 ? "artículo" : "artículos"})
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ plant, quantity }) => (
            <div key={plant.id} className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex gap-4 shadow-sm">
              {/* Imagen */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-green-50 flex-shrink-0">
                <PlantImage src={plant.main_image} alt={plant.name} fill className="object-cover" />
              </div>

              {/* Info + controles */}
              <div className="flex-1 min-w-0 flex flex-col justify-between gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link href={`/tienda/${plant.slug}`} className="font-semibold text-gray-900 hover:text-green-700 transition-colors">
                      {plant.name}
                    </Link>
                    <p className="text-green-700 font-bold text-lg">${plant.price.toFixed(2)} <span className="text-xs text-gray-400 font-normal">MXN c/u</span></p>
                  </div>
                  <button
                    onClick={() => removeItem(plant.id)}
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    aria-label="Eliminar"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Cantidad + subtotal */}
                <div className="flex items-center justify-between">
                  {/* Controles de cantidad — grandes y visibles */}
                  <div className="flex items-center gap-0 bg-gray-50 border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => updateQuantity(plant.id, quantity - 1)}
                      className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors text-xl font-bold"
                      aria-label="Reducir cantidad"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-12 text-center text-lg font-bold text-gray-900 select-none">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(plant.id, quantity + 1)}
                      disabled={quantity >= plant.stock}
                      className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-green-50 hover:text-green-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Subtotal del item */}
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Subtotal</p>
                    <p className="text-xl font-bold text-gray-900">${(plant.price * quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1.5 mt-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Vaciar carrito
          </button>
        </div>

        {/* Resumen */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">
            <h2 className="font-bold text-gray-900 text-lg mb-4">Resumen del pedido</h2>

            <div className="space-y-2 text-sm text-gray-600 mb-5">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)} MXN</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span className={`font-medium ${shipping === 0 ? "text-green-600" : "text-gray-700"}`}>
                  {shipping === 0 ? "🎉 Gratis" : `$${shipping.toFixed(2)} MXN`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-green-600 bg-green-50 rounded-lg p-2">
                  Agrega ${(500 - subtotal).toFixed(2)} más para envío gratis
                </p>
              )}
              <div className="border-t-2 border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-lg">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)} MXN</span>
              </div>
            </div>

            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "525500000000"}?text=${encodeURIComponent(
                `Hola! Quiero realizar el siguiente pedido de ProyectoVerde 🌱\n\n${items.map((i) => `• ${i.plant.name} x${i.quantity} = $${(i.plant.price * i.quantity).toFixed(2)}`).join("\n")}\n\nEnvío: ${shipping === 0 ? "Gratis" : "$" + shipping}\nTotal: $${grandTotal.toFixed(2)} MXN`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-3.5 rounded-xl transition-colors mb-3 text-base"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Pedir por WhatsApp
            </a>

            <p className="text-xs text-gray-400 text-center">
              Coordina pago y envío directamente por WhatsApp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
