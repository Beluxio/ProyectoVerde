import { NextResponse } from "next/server";

export async function GET() {
  let supabaseTest = "not_attempted";
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://oelzlufwnlwwzakbtzhk.supabase.co";
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
    const res = await fetch(`${url}/rest/v1/plants?select=id&limit=1`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    });
    supabaseTest = `status_${res.status}`;
  } catch (e) {
    supabaseTest = `error_${String(e).slice(0, 100)}`;
  }

  return NextResponse.json({
    ok: true,
    supabaseUrl: (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "NOT_SET").slice(0, 30),
    serviceKeySet: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    serviceKeyLen: (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").length,
    supabaseTest,
    nodeEnv: process.env.NODE_ENV,
  });
}
