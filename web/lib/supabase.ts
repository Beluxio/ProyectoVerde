import { createClient } from "@supabase/supabase-js";
import type { Plant, NatureArticle } from "./types";

const SUPABASE_URL = "https://oelzlufwnlwwzakbtzhk.supabase.co";

let _publicClient: ReturnType<typeof createClient> | null = null;

// Cliente anon — lazy, para uso en el browser (client components)
export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_, prop) {
    if (!_publicClient) {
      _publicClient = createClient(
        SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
      );
    }
    return (_publicClient as Record<string, unknown>)[prop as string];
  },
});

// Cliente service role — lazy, para Server Components y API routes
function getServiceClient() {
  return createClient(
    SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
  );
}

// Exportar también para las API routes
export { getServiceClient };

// ============================================================
// HELPERS — todos usan service role (se llaman desde el servidor)
// ============================================================

export async function getFeaturedPlants(): Promise<Plant[]> {
  const { data, error } = await getServiceClient()
    .from("plants")
    .select("*")
    .eq("is_featured", true)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) throw error;
  return data ?? [];
}

export async function getAllPlants(
  category?: string,
  difficulty?: string
): Promise<Plant[]> {
  let query = getServiceClient()
    .from("plants")
    .select("id, slug, name, scientific_name, price, stock, care_difficulty, category, size, tags, main_image, is_featured, description, care_water, care_light, care_temp_min, care_temp_max, care_substrate, care_humidity, care_fertilizer, psychological_benefits, medicinal_uses, geographical_origin, fun_facts, harmful_pests, recommended_repellents, is_active, updated_at, created_at")
    .eq("is_active", true)
    .order("is_featured", { ascending: false });

  if (category) query = query.eq("category", category);
  if (difficulty) query = query.eq("care_difficulty", difficulty);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as unknown as Plant[];
}

export async function getPlantBySlug(slug: string): Promise<Plant | null> {
  const { data, error } = await getServiceClient()
    .from("plants")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) return null;
  return data;
}

export async function getPublishedArticles(category?: string): Promise<NatureArticle[]> {
  let query = getServiceClient()
    .from("nature_articles")
    .select("id, slug, title, excerpt, cover_image, category, tags, read_time, published_at, author, content, is_published, updated_at, created_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (category) query = query.eq("category", category);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as unknown as NatureArticle[];
}

export async function getArticleBySlug(slug: string): Promise<NatureArticle | null> {
  const { data, error } = await getServiceClient()
    .from("nature_articles")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) return null;
  return data;
}
