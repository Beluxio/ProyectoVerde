import { getAllPlants } from "@/lib/supabase";
import TiendaClient from "@/components/plantas/TiendaClient";

export const revalidate = 3600;

interface SearchParams {
  categoria?: string;
  dificultad?: string;
}

export default async function TiendaPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const categoria = params.categoria || "";
  const dificultad = params.dificultad || "";

  const plants = await getAllPlants(categoria || undefined, dificultad || undefined).catch(() => []);

  return <TiendaClient plants={plants} categoria={categoria} dificultad={dificultad} />;
}
