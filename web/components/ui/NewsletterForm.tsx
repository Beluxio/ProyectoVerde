"use client";
import { useState } from "react";
import { Mail, CheckCircle, Loader2 } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim() }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("¡Listo! Ya eres parte de la comunidad verde 🌱");
        setEmail("");
        setName("");
      } else if (res.status === 409) {
        setStatus("success");
        setMessage("¡Ya estás suscrito! Te tenemos en cuenta 💚");
      } else {
        throw new Error(data.error);
      }
    } catch {
      setStatus("error");
      setMessage("Algo salió mal. Intenta de nuevo.");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-4">
        <CheckCircle className="w-12 h-12 text-green-400" />
        <p className="text-white font-semibold text-lg text-center">{message}</p>
        <p className="text-green-200 text-sm text-center">
          Recibirás consejos de cuidado, novedades y contenido exclusivo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-md mx-auto">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tu nombre (opcional)"
        className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
      />
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex items-center gap-2 bg-white text-green-700 hover:bg-green-50 font-semibold px-5 py-3 rounded-xl transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Mail className="w-4 h-4" />
          )}
          {status === "loading" ? "..." : "Suscribirme"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-red-300 text-sm text-center">{message}</p>
      )}
      <p className="text-green-200 text-xs text-center">
        Sin spam. Solo contenido sobre plantas, cuidados y naturaleza. Cancela cuando quieras.
      </p>
    </form>
  );
}
