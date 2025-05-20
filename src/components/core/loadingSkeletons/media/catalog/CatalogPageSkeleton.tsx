import { Skeleton } from "@/components/ui/skeleton";
import MediaCardSkeleton from "../MediaCardSkeleton";
import { SlidersHorizontal } from "lucide-react";

export default function CatalogPageSkeleton() {
  return (
    <main className="flex flex-col w-full min-h-screen gap-6 pt-32 pb-28">
      <header className="space-y-7 lg:space-y-8">
        <div className="flex items-center justify-between">
          <Skeleton className="text-lg bg-gray-700 font-semibold sm:text-xl md:text-2xl">
            Lorem, ipsum dolor.
          </Skeleton>
          <Skeleton className="flex bg-gray-700 items-center gap-2 px-3 py-2 rounded-full mobile-l:gap-3 mobile-l:px-4 md:px-5 md:py-3 group">
            <p className="text-xs font-medium transition-colors mobile-l:text-sm md:text-base">
              Filter
            </p>
            <SlidersHorizontal
              className="transition-colors opacity-0 size-3 sm:size-4"
              strokeWidth={3}
            />
          </Skeleton>
        </div>
      </header>
      <div className="grid w-full grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-4 xl:grid-cols-6 lg:gap-x-5 lg:gap-y-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <MediaCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}
