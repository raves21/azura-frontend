import { Skeleton } from "@/components/ui/skeleton";

export default function MediaSkeleton() {
  return (
    <div className="block space-y-3 group">
      <Skeleton className="bg-gray-700 relative aspect-[3/4] min-h-[130px] overflow-hidden rounded-md lg:rounded-xl">
        <img
          src={"/no-image-2.jpg"}
          className="object-cover transition-all duration-300 size-full group-hover:scale-105 opacity-0"
        />
      </Skeleton>
      <div className="space-y-2 flex flex-col items-center">
        <Skeleton className="text-xs text-center mobile-l:text-sm font-medium bg-gray-700 line-clamp-2">
          Lorem, ipsum.
        </Skeleton>
        <Skeleton className="text-xs bg-gray-700">
          <p>lorem</p>
        </Skeleton>
      </div>
    </div>
  );
}
