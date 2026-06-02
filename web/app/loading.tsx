export const runtime = "edge";

import { PlantGridSkeleton } from "@/components/ui/Skeleton";

export default function HomeLoading() {
  return (
    <div>
      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-green-50 to-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-5 w-36 bg-green-200 rounded-full animate-pulse mb-6" />
          <div className="h-14 w-3/4 bg-gray-200 rounded-xl animate-pulse mb-4" />
          <div className="h-14 w-1/2 bg-gray-200 rounded-xl animate-pulse mb-6" />
          <div className="h-5 w-full max-w-lg bg-gray-200 rounded animate-pulse mb-3" />
          <div className="h-5 w-4/5 max-w-lg bg-gray-200 rounded animate-pulse mb-8" />
          <div className="flex gap-3">
            <div className="h-12 w-36 bg-green-200 rounded-xl animate-pulse" />
            <div className="h-12 w-44 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>

      {/* Plants skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="h-9 w-56 bg-gray-200 rounded-xl animate-pulse mb-8" />
        <PlantGridSkeleton count={6} />
      </div>
    </div>
  );
}
