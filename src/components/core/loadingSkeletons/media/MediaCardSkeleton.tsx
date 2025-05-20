import { Skeleton } from "@/components/ui/skeleton";

export default function MediaCardSkeleton() {
  return (
    <div className="space-y-2 group">
      <Skeleton className="relative aspect-[3/4] min-h-[130px] bg-gray-700 overflow-hidden rounded-md lg:rounded-xl">
        <img src="/no-image-2.jpg" className="opacity-0" />
      </Skeleton>
      <div className="space-y-1">
        <Skeleton className="text-xs bg-gray-700 mobile-l:text-sm font-medium line-clamp-2">
          Lorem ipsum
        </Skeleton>
      </div>
    </div>
  );
}
