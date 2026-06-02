export const runtime = "edge";

import { PlantGridSkeleton } from "@/components/ui/Skeleton";

export default function TiendaLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="h-9 w-48 bg-gray-200 rounded-xl animate-pulse mb-2" />
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="h-12 bg-gray-200 rounded-2xl animate-pulse mb-6" />
      <PlantGridSkeleton count={8} />
    </div>
  );
}
