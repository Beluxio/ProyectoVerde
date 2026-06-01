"use client";
import { useState, useEffect } from "react";
import { Plus, Eye, EyeOff, Star, Loader2, CheckCircle, Mail, Users } from "lucide-react";

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
}

interface PlantRow {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  category: string;
  care_difficulty: string;
  is_active: boolean;
  is_featured: boolean;
}

const EMPTY_FORM = {
  name: "",
  slug: "",
  scientific_name: "",
  description: "",
  price: "",
  stock: "",
  category: "interior",
  size: "pequena",
  care_difficulty: "facil",
  care_water: "",
  care_light: "",
  psychological_benefits: "",
  medicinal_uses: "",
  geographical_origin: "",
  tags: "",
  main_image: "",
  is_active: true,
  is_featured: false,
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminPage() {
  const [plants, setPlants] = useState<PlantRow[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [subCount, setSubCount] = useState(0);
  const [activeTab, setActiveTab] = useState<"plantas" | "suscriptores">("plantas");
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchPlants = async () => {
    setLoading(true);
    const res = await fetch("/api/plantas");
    const data = await res.json();
    setPlants(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const fetchSubscribers = async () => {
    const res = await fetch("/api/newsletter");
    const data = await res.json();
    setSubscribers(data.subscribers ?? []);
    setSubCount(data.total ?? 0);
  };

  useEffect(() => { fetchPlants(); fetchSubscribers(); }, []);

  const handleNameChange = (name: string) => {
    setForm((f) => ({ ...f, name, slug: slugify(name) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      };
      await fetch("/api/plantas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setSaved(true);
      setForm(EMPTY_FORM);
      setShowForm(false);
      fetchPlants();
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const toggleField = async (id: string, field: "is_active" | "is_featured", value: boolean) => {
    await fetch("/api/plantas", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, [field]: !value }),
    });
    setPlants((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: !value } : p)));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Panel de administración</h1>
          <p className="text-gray-500 text-sm mt-1">ProyectoVerde — Gestión de plantas</p>
        </div>
        {activeTab === "plantas" && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-medium px-4 py-2 rounded-xl transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Nueva planta
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("plantas")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${activeTab === "plantas" ? "border-green-600 text-green-700" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          <Users className="w-4 h-4" />
          Plantas ({plants.length})
        </button>
        <button
          onClick={() => setActiveTab("suscriptores")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${activeTab === "suscriptores" ? "border-green-600 text-green-700" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          <Mail className="w-4 h-4" />
          Suscriptores ({subCount})
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 mb-6 text-sm">
          <CheckCircle className="w-4 h-4" />
          Planta guardada correctamente
        </div>
      )}

      {/* Formulario nueva planta */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">Agregar nueva planta</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nombre *</label>
              <input required value={form.name} onChange={(e) => handleNameChange(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Slug (auto)</label>
              <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nombre científico</label>
              <input value={form.scientific_name} onChange={(e) => setForm((f) => ({ ...f, scientific_name: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">URL de imagen principal</label>
              <input value={form.main_image} onChange={(e) => setForm((f) => ({ ...f, main_image: e.target.value }))}
                placeholder="https://..." className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Descripción *</label>
              <textarea required rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Precio (MXN) *</label>
              <input required type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Stock *</label>
              <input required type="number" min="0" value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Categoría</label>
              <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
                {["interior","exterior","suculenta","aromatica","medicinal","frutal","cactus","helecho","bambu"].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Dificultad</label>
              <select value={form.care_difficulty} onChange={(e) => setForm((f) => ({ ...f, care_difficulty: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
                <option value="facil">Fácil</option>
                <option value="media">Media</option>
                <option value="dificil">Difícil</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Guía de riego</label>
              <input value={form.care_water} onChange={(e) => setForm((f) => ({ ...f, care_water: e.target.value }))}
                placeholder="Ej: Riego semanal..." className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Guía de luz</label>
              <input value={form.care_light} onChange={(e) => setForm((f) => ({ ...f, care_light: e.target.value }))}
                placeholder="Ej: Luz indirecta..." className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Tags (separados por coma)</label>
              <input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                placeholder="facil_cuidado, purifica_aire..." className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm((f) => ({ ...f, is_featured: e.target.checked }))} className="rounded" />
                Destacada en inicio
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))} className="rounded" />
                Activa (visible)
              </label>
            </div>
            <div className="sm:col-span-2 flex gap-3 pt-2">
              <button type="submit" disabled={saving}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-300 text-white font-medium px-5 py-2 rounded-xl transition-colors text-sm">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                {saving ? "Guardando..." : "Guardar planta"}
              </button>
              <button type="button" onClick={() => setShowForm(false)}
                className="px-5 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab Suscriptores */}
      {activeTab === "suscriptores" && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">Suscriptores del newsletter ({subCount})</h2>
            <a
              href={`data:text/csv;charset=utf-8,Email,Nombre,Fecha\n${subscribers.map(s => `${s.email},${s.name || ""},${new Date(s.created_at).toLocaleDateString("es-MX")}`).join("\n")}`}
              download="suscriptores.csv"
              className="text-xs text-green-700 hover:underline flex items-center gap-1"
            >
              ↓ Exportar CSV
            </a>
          </div>
          {subscribers.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Mail className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p>Aún no hay suscriptores</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nombre</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {subscribers.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900">{s.email}</td>
                      <td className="px-4 py-3 text-gray-500">{s.name || "—"}</td>
                      <td className="px-4 py-3 text-gray-400">{new Date(s.created_at).toLocaleDateString("es-MX")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tabla de plantas */}
      {activeTab === "plantas" && (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Plantas ({plants.length})</h2>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-green-600" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nombre</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Categoría</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Precio</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Stock</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Visible</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Destacada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {plants.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <a href={`/tienda/${p.slug}`} target="_blank" className="font-medium text-gray-900 hover:text-green-700">
                        {p.name}
                      </a>
                      <p className="text-xs text-gray-400">{p.slug}</p>
                    </td>
                    <td className="px-4 py-3 capitalize text-gray-600">{p.category}</td>
                    <td className="px-4 py-3 text-right font-medium text-green-700">${p.price}</td>
                    <td className={`px-4 py-3 text-right font-medium ${p.stock === 0 ? "text-red-500" : "text-gray-700"}`}>
                      {p.stock}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => toggleField(p.id, "is_active", p.is_active)}
                        className={`p-1.5 rounded-lg transition-colors ${p.is_active ? "text-green-600 hover:bg-green-50" : "text-gray-300 hover:bg-gray-100"}`}>
                        {p.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => toggleField(p.id, "is_featured", p.is_featured)}
                        className={`p-1.5 rounded-lg transition-colors ${p.is_featured ? "text-yellow-500 hover:bg-yellow-50" : "text-gray-300 hover:bg-gray-100"}`}>
                        <Star className={`w-4 h-4 ${p.is_featured ? "fill-yellow-400" : ""}`} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      )}
    </div>
  );
}
