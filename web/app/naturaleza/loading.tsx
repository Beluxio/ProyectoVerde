import { ArticleCardSkeleton } from "@/components/ui/Skeleton";

export default function NaturalezaLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-10">
        <div className="h-10 w-80 bg-gray-200 rounded-xl animate-pulse mx-auto mb-3" />
        <div className="h-5 w-96 bg-gray-200 rounded animate-pulse mx-auto" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
