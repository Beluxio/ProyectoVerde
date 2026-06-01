"""
Búsqueda vectorial en Supabase pgvector via REST API (httpx, sin cliente supabase).
Recibe una pregunta, genera su embedding y devuelve los fragmentos más relevantes.
"""
import os
from typing import Optional
import httpx
from openai import AsyncOpenAI

openai_client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def _supabase_headers() -> dict:
    key = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
    return {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
    }


async def embed_text(text: str) -> list[float]:
    """Genera el embedding de un texto usando OpenAI text-embedding-3-small."""
    response = await openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=text.strip(),
    )
    return response.data[0].embedding


async def search_knowledge(
    query: str,
    match_count: int = 5,
    match_threshold: float = 0.70,
    category: Optional[str] = None,
) -> list[dict]:
    """
    Busca en el knowledge base los fragmentos más relevantes para una consulta.
    Llama a la función RPC search_plant_knowledge de Supabase via REST.
    """
    embedding = await embed_text(query)
    base_url = os.getenv("SUPABASE_URL", "").rstrip("/")

    payload = {
        "query_embedding": embedding,
        "match_threshold": match_threshold,
        "match_count": match_count,
    }
    if category:
        payload["filter_category"] = category

    async with httpx.AsyncClient(timeout=20.0) as client:
        resp = await client.post(
            f"{base_url}/rest/v1/rpc/search_plant_knowledge",
            headers=_supabase_headers(),
            json=payload,
        )
        resp.raise_for_status()
        return resp.json() or []


def format_context(fragments: list[dict]) -> str:
    """Formatea los fragmentos recuperados como contexto para el prompt de Claude."""
    if not fragments:
        return ""

    parts = []
    for i, frag in enumerate(fragments, 1):
        source = frag.get("source_file", "knowledge base")
        parts.append(f"[Fragmento {i} — Fuente: {source}]\n{frag['content']}")

    return "\n\n---\n\n".join(parts)
