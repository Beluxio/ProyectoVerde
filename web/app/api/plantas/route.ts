import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("categoria") ?? undefined;
  const difficulty = searchParams.get("dificultad") ?? undefined;
  const slug = searchParams.get("slug");

  try {
    const supabase = getServiceClient();

    if (slug) {
      const { data, error } = await supabase
        .from("plants").select("*").eq("slug", slug).eq("is_active", true).single();
      if (error) return NextResponse.json({ error: "No encontrada" }, { status: 404 });
      return NextResponse.json(data);
    }

    let query = supabase
      .from("plants")
      .select("id,slug,name,scientific_name,price,stock,care_difficulty,category,size,tags,main_image,is_featured,is_active,description")
      .order("is_featured", { ascending: false });

    if (category) query = query.eq("category", category);
    if (difficulty) query = query.eq("care_difficulty", difficulty);

    // Sin filtro is_active para el admin — filtramos solo en la tienda pública
    const isAdmin = searchParams.get("admin") === "true";
    if (!isAdmin) query = query.eq("is_active", true);

    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error("Plantas GET error:", err);
    return NextResponse.json({ error: "Error al obtener plantas" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = getServiceClient();

    const { data, error } = await supabase
      .from("plants")
      .insert([body])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("Plantas POST error:", err);
    return NextResponse.json({ error: "Error al crear planta" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, ...updates } = await req.json();
    if (!id) return NextResponse.json({ error: "Falta id" }, { status: 400 });

    const supabase = getServiceClient();
    const { error } = await supabase.from("plants").update(updates).eq("id", id);
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Plantas PATCH error:", err);
    return NextResponse.json({ error: "Error al actualizar planta" }, { status: 500 });
  }
}
