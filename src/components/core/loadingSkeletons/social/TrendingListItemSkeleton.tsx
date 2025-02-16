import { Skeleton } from "@/components/ui/skeleton";

export default function TrendingListItemSkeleton() {
  return (
    <div className="flex flex-col w-full gap-2 px-5 py-4 hover:bg-socialPrimaryHover">
      <Skeleton className="font-medium bg-gray-700 line-clamp-1">
        Lorem ipsum dolor sit.
      </Skeleton>
      <Skeleton className="text-sm bg-gray-700">Lorem, ipsum.</Skeleton>
    </div>
  );
}
