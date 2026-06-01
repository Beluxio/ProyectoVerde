import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const supabase = getServiceClient();
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email: email.toLowerCase(), name: name || null, source: "web" }]);

    if (error) {
      // Código 23505 = duplicate key (email ya registrado)
      if (error.code === "23505") {
        return NextResponse.json({ message: "Ya suscrito" }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({ message: "Suscrito correctamente" }, { status: 201 });
  } catch (err) {
    console.error("Newsletter error:", err);
    return NextResponse.json({ error: "Error al suscribir" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = getServiceClient();
    const { data, error, count } = await supabase
      .from("newsletter_subscribers")
      .select("id, email, name, created_at", { count: "exact" })
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ subscribers: data, total: count });
  } catch (err) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
