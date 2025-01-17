import { Skeleton } from "@/components/ui/skeleton";

export default function ActivityHeaderSkeleton() {
  return (
    <div className="flex items-start w-full gap-2 sm:gap-3">
      <Skeleton className="shrink-0 bg-gray-700 size-[38px] rounded-full mobile-m:size-10 sm:size-11" />
      <div className="flex flex-col gap-1 mr-auto">
        <div className="flex items-center gap-2 mobile-l:gap-3">
          <Skeleton className="h-4 bg-gray-700 sm:h-5 w-28" />
          <Skeleton className="w-24 h-4 bg-gray-700 sm:h-5" />
        </div>
        <div className="flex items-center gap-[6px] mobile-m:gap-2 mobile-m:mt-1">
          <Skeleton className="w-24 h-4 bg-gray-700 sm:h-5" />
        </div>
      </div>
    </div>
  );
}
