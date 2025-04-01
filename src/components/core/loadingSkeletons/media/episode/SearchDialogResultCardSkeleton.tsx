import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type SearchDialogResultCardSkeletonProps = {
  className?: string;
};

export default function SearchDialogResultCardSkeleton({
  className,
}: SearchDialogResultCardSkeletonProps) {
  return (
    <div className={cn("flex w-full gap-4 px-3 py-2 bg-gray-800", className)}>
      <Skeleton className="aspect-[3/4] h-min w-[90px] bg-gray-700 rounded-md" />
      <div className="flex flex-col justify-center w-full gap-3">
        <Skeleton className="self-start text-lg font-semibold bg-gray-700 line-clamp-1">
          Lorem ipsum dolor
        </Skeleton>
        <div className="w-full space-y-3 text-sm">
          <div className="flex items-center gap-[6px]">
            <div className="bg-transparent rounded-full size-1" />
          </div>
          <div className="flex items-center gap-[6px]">
            <Skeleton className="bg-gray-700">2020</Skeleton>
            <div className="bg-transparent rounded-full size-1" />
            <Skeleton className="bg-gray-700">MOVIE</Skeleton>
            <div className="bg-transparent rounded-full size-1" />

            <div className="flex items-center gap-1">
              <Skeleton className="bg-gray-700 size-4 stroke-none" />
              <Skeleton className="bg-gray-700">20</Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
