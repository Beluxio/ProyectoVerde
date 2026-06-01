"""
Script de ingestion del RAG.
Lee los documentos de knowledge_base/, los divide en chunks,
genera embeddings y los guarda en Supabase via REST API (httpx).

USO: python rag/ingestion.py
"""
import os
import re
import asyncio
from pathlib import Path
from typing import Optional
from dotenv import load_dotenv
import httpx
from openai import AsyncOpenAI

load_dotenv()

openai_client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

SUPABASE_URL = os.getenv("SUPABASE_URL", "").rstrip("/")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

KNOWLEDGE_BASE_DIR = Path(__file__).parent.parent / "knowledge_base"
CHUNK_SIZE = 500
CHUNK_OVERLAP = 50

CATEGORY_MAP = {
    "cuidado_plantas": "cuidado",
    "medicina_natural": "medicina",
    "plagas_y_remedios": "plagas",
    "botanica_general": "botanica",
}

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal",
}


def estimate_tokens(text: str) -> int:
    return len(text) // 4


def split_text(text: str) -> list[str]:
    paragraphs = [p.strip() for p in re.split(r"\n\s*\n", text) if p.strip()]
    chunks, current, current_tokens = [], [], 0

    for para in paragraphs:
        pt = estimate_tokens(para)
        if current_tokens + pt > CHUNK_SIZE and current:
            chunks.append("\n\n".join(current))
            overlap, ot = [], 0
            for p in reversed(current):
                if ot + estimate_tokens(p) <= CHUNK_OVERLAP:
                    overlap.insert(0, p)
                    ot += estimate_tokens(p)
                else:
                    break
            current, current_tokens = overlap, ot
        current.append(para)
        current_tokens += pt

    if current:
        chunks.append("\n\n".join(current))
    return chunks


async def embed_batch(texts: list[str]) -> list[list[float]]:
    resp = await openai_client.embeddings.create(
        model="text-embedding-3-small", input=texts
    )
    return [item.embedding for item in resp.data]


async def ingest_file(file_path: Path, category: str, client: httpx.AsyncClient) -> int:
    print(f"  📄 {file_path.name}")
    text = file_path.read_text(encoding="utf-8")
    chunks = split_text(text)
    plant_slug = file_path.stem.lower().replace("_", "-")

    all_embeddings: list[list[float]] = []
    for i in range(0, len(chunks), 10):
        embeddings = await embed_batch(chunks[i : i + 10])
        all_embeddings.extend(embeddings)

    records = [
        {
            "content": chunk,
            "embedding": emb,
            "source_file": str(file_path.relative_to(KNOWLEDGE_BASE_DIR)),
            "category": category,
            "plant_slug": plant_slug if len(plant_slug) > 3 else None,
            "chunk_index": idx,
        }
        for idx, (chunk, emb) in enumerate(zip(chunks, all_embeddings))
    ]

    resp = await client.post(
        f"{SUPABASE_URL}/rest/v1/plant_knowledge",
        headers=HEADERS,
        json=records,
    )
    resp.raise_for_status()
    print(f"     ✅ {len(records)} fragmentos cargados")
    return len(records)


async def ingest_all():
    print("🌱 ProyectoVerde — Ingestion del Knowledge Base RAG")
    print("=" * 50)

    total = 0
    async with httpx.AsyncClient(timeout=60.0) as client:
        for folder_name, category in CATEGORY_MAP.items():
            folder = KNOWLEDGE_BASE_DIR / folder_name
            if not folder.exists():
                continue

            md_files = list(folder.glob("*.md")) + list(folder.glob("*.txt"))
            if not md_files:
                print(f"📂 {folder_name}: sin archivos")
                continue

            print(f"\n📂 {folder_name} ({category}) — {len(md_files)} archivos")
            for fp in md_files:
                total += await ingest_file(fp, category, client)

    print(f"\n{'=' * 50}")
    print(f"✅ Ingestion completa: {total} fragmentos cargados")


if __name__ == "__main__":
    asyncio.run(ingest_all())
