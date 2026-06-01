"""
ProyectoVerde — RAG Service (FastAPI)
Expone el chatbot VerdBot como API HTTP para el frontend Next.js.

Endpoints:
  POST /chat      — Enviar mensaje al chatbot
  GET  /health    — Health check para Railway
"""
import os
import uuid
from contextlib import asynccontextmanager
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from dotenv import load_dotenv

from agent import chat

load_dotenv()


# ============================================================
# MODELOS DE REQUEST/RESPONSE
# ============================================================

class ChatMessage(BaseModel):
    role: str   # "user" | "assistant"
    content: str


class ChatRequest(BaseModel):
    message: str
    history: Optional[list[ChatMessage]] = []
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    session_id: str


# ============================================================
# APP FASTAPI
# ============================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🌱 VerdBot RAG Service iniciando...")
    yield
    print("🌿 VerdBot RAG Service detenido.")


app = FastAPI(
    title="ProyectoVerde — VerdBot RAG Service",
    description="API del chatbot experto en plantas de ProyectoVerde",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",           # Next.js local
        os.getenv("FRONTEND_URL", ""),     # URL de producción (Vercel)
    ],
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)


# ============================================================
# ENDPOINTS
# ============================================================

@app.get("/health")
async def health():
    """Health check para Railway y monitoreo."""
    return {"status": "ok", "service": "verdbot-rag", "version": "1.0.0"}


@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """
    Procesa un mensaje del usuario y retorna la respuesta de VerdBot.

    Body:
        message: Texto del usuario
        history: Historial previo de la conversación (opcional)
        session_id: ID de sesión para trazabilidad (opcional)
    """
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="El mensaje no puede estar vacío")

    session_id = request.session_id or str(uuid.uuid4())

    history = [{"role": msg.role, "content": msg.content} for msg in request.history]

    response = await chat(
        message=request.message,
        history=history,
        session_id=session_id,
    )

    return ChatResponse(response=response, session_id=session_id)


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
