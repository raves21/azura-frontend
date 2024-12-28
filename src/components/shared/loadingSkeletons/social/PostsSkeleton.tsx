import { Skeleton } from "@/components/ui/skeleton";
import ActivitySkeleton from "./ActivitySkeleton";

type PostsSkeletonProps = {
  loadingType: "fetchingNextPage" | "loadingAllPosts";
};

export default function PostsSkeleton({ loadingType }: PostsSkeletonProps) {
  return (
    <div className="flex flex-col w-full gap-3 pb-24">
      <Skeleton className="flex items-center w-full gap-3 p-3 rounded-lg bg-socialPrimary mobile-m:py-4 sm:p-5">
        <Skeleton className="size-[38px] rounded-full md:size-11 bg-gray-700" />
        <Skeleton className="flex-grow text-transparent bg-gray-700 rounded-lg h-9 mobile-m:text-base md:p-3" />
      </Skeleton>
      <Skeleton className="flex w-full text-transparent rounded-lg h-9 bg-socialPrimary" />
      <div className="flex flex-col w-full gap-3">
        {loadingType === "fetchingNextPage" ? (
          <>
            <ActivitySkeleton type="post" withAttachment={false} />
            <ActivitySkeleton type="post" withAttachment />
          </>
        ) : (
          <>
            <ActivitySkeleton type="post" withAttachment />
            <ActivitySkeleton type="post" withAttachment={false} />
            <ActivitySkeleton type="post" withAttachment />
          </>
        )}
      </div>
    </div>
  );
}
