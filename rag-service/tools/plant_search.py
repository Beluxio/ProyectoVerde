"""
Herramienta: Buscar plantas en el catálogo de ProyectoVerde via Supabase REST API.
"""
import os
from typing import Optional
import httpx
from pydantic import BaseModel, Field


class PlantSearchInput(BaseModel):
    query: str = Field(description="Nombre, categoría o característica de la planta a buscar")
    category: Optional[str] = Field(default=None, description="Categoría: interior, exterior, suculenta, aromatica, medicinal, frutal, cactus")
    max_price: Optional[float] = Field(default=None, description="Precio máximo en MXN")


def _headers() -> dict:
    key = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
    return {"apikey": key, "Authorization": f"Bearer {key}"}


def search_plants(query: str, category: Optional[str] = None, max_price: Optional[float] = None) -> str:
    """
    Busca plantas disponibles en el catálogo de ProyectoVerde.
    Retorna información de precio, disponibilidad y cuidados básicos.
    """
    base_url = os.getenv("SUPABASE_URL", "").rstrip("/")
    params = {
        "select": "name,scientific_name,price,stock,care_difficulty,care_water,care_light,description,slug,category",
        "is_active": "eq.true",
        "order": "is_featured.desc",
        "limit": "5",
    }

    if category:
        params["category"] = f"eq.{category}"
    if max_price:
        params["price"] = f"lte.{max_price}"
    if query and query.lower() not in ("todas", "all", "cualquier"):
        params["name"] = f"ilike.*{query}*"

    try:
        resp = httpx.get(
            f"{base_url}/rest/v1/plants",
            headers=_headers(),
            params=params,
            timeout=10.0,
        )
        resp.raise_for_status()
        plants = resp.json()
    except Exception as e:
        return f"No pude consultar el catálogo en este momento: {e}"

    if not plants:
        return "No encontré plantas que coincidan con esa búsqueda en nuestro catálogo actual."

    lines = [f"🌱 **Plantas disponibles en ProyectoVerde** ({len(plants)} resultados):\n"]
    for p in plants:
        stock_text = f"✅ En stock ({p['stock']} disponibles)" if p.get("stock", 0) > 0 else "❌ Sin stock"
        lines.append(
            f"**{p['name']}** (*{p.get('scientific_name') or ''}*)\n"
            f"  💰 ${p['price']:.2f} MXN — {stock_text}\n"
            f"  🏷️ Dificultad: {p.get('care_difficulty', 'N/A')} | Categoría: {p.get('category', 'N/A')}\n"
            f"  🔗 Ver más: /tienda/{p['slug']}\n"
        )

    return "\n".join(lines)
