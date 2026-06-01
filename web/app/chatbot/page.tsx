"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Leaf, MessageCircle } from "lucide-react";
import type { ChatMessage } from "@/lib/types";

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "¡Hola! Soy **VerdBot** 🌿, tu experto en botánica y jardinería de ProyectoVerde.\n\n¿En qué puedo ayudarte?\n\n- 🌱 Cuidados de plantas\n- 🪲 Identificar plagas e insectos\n- 🌺 Usos medicinales\n- 🛒 Qué planta es perfecta para ti\n- 🌍 Botánica y conservación",
};

const SUGGESTION_PROMPTS = [
  "¿Cada cuánto debo regar mi cactus?",
  "Mi planta tiene manchas blancas en las hojas, ¿qué tiene?",
  "¿Qué planta recomiendas para una oficina con poca luz?",
  "Beneficios del aloe vera para la piel",
  "¿Qué plantas son tóxicas para gatos?",
];

function renderMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part.split("\n").map((line, j) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < part.split("\n").length - 1 && <br />}
      </span>
    ));
  });
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).slice(2));
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text = input) => {
    const content = text.trim();
    if (!content || loading) return;

    const userMsg: ChatMessage = { role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, history: messages.slice(-10), session_id: sessionId }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Tuve un problema al responder. ¿Puedes intentarlo de nuevo? 🌿" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-gray-900">VerdBot</h1>
          <p className="text-xs text-green-600">Experto en botánica y jardinería • ProyectoVerde</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-xs text-emerald-600">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          En línea
        </span>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto rounded-2xl bg-gray-50 border border-gray-100 p-4 space-y-1 mb-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-3`}>
            {msg.role === "assistant" && (
              <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                <Leaf className="w-4 h-4 text-white" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-green-600 text-white rounded-br-sm"
                : "bg-white text-gray-800 shadow-sm rounded-bl-sm border border-gray-100"
            }`}>
              {renderMarkdown(msg.content)}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start mb-3">
            <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center mr-2 mt-1">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Sugerencias */}
      {messages.length <= 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
          {SUGGESTION_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => sendMessage(p)}
              className="flex-shrink-0 text-xs bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-full px-3 py-1.5 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }}}
          placeholder="Escribe tu pregunta sobre plantas..."
          rows={1}
          className="flex-1 resize-none bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading || !input.trim()}
          className="bg-green-600 hover:bg-green-500 disabled:bg-gray-200 text-white p-3 rounded-2xl transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
      <p className="text-xs text-gray-400 text-center mt-2">
        VerdBot puede cometer errores. Para consejos médicos, consulta un profesional.
      </p>
    </div>
  );
}
