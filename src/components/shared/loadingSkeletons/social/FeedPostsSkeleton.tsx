import { Skeleton } from "@/components/ui/skeleton";

export default function FeedPostsSkeleton() {
  return (
    <div className="flex flex-col w-full gap-3">
      <Skeleton className="flex items-center w-full gap-3 p-3 rounded-lg bg-socialPrimary mobile-m:py-4 sm:p-5">
        <Skeleton className="size-[38px] rounded-full md:size-11 bg-gray-700" />
        <Skeleton className="flex-grow text-transparent bg-gray-700 rounded-lg h-9 mobile-m:text-base md:p-3" />
      </Skeleton>
      <Skeleton className="flex w-full text-transparent rounded-lg h-9 bg-socialPrimary" />
    </div>
  );
}
