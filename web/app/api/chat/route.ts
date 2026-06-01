import { NextRequest, NextResponse } from "next/server";

const RAG_SERVICE_URL = process.env.RAG_SERVICE_URL ?? "http://localhost:8000";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.message?.trim()) {
      return NextResponse.json({ error: "Mensaje vacío" }, { status: 400 });
    }

    // Proxy al microservicio Python RAG
    const ragRes = await fetch(`${RAG_SERVICE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: body.message,
        history: body.history ?? [],
        session_id: body.session_id,
      }),
      signal: AbortSignal.timeout(30_000), // 30s timeout
    });

    if (!ragRes.ok) {
      const error = await ragRes.text().catch(() => "Error desconocido");
      console.error("RAG service error:", error);
      return NextResponse.json(
        { error: "El chatbot no está disponible en este momento" },
        { status: 503 }
      );
    }

    const data = await ragRes.json();
    return NextResponse.json(data);
  } catch (err) {
    // Si el servicio RAG no está levantado, respuesta de fallback
    if (err instanceof TypeError && err.message.includes("fetch")) {
      return NextResponse.json({
        response:
          "El chatbot está iniciando... Por favor intenta en unos segundos. 🌱 Mientras tanto, puedes explorar la tienda o leer los artículos de naturaleza.",
        session_id: "",
      });
    }
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
