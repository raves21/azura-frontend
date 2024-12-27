import ActivitySkeleton from "./ActivitySkeleton";

type PostsSkeletonProps = {
  loadingType: "fetchingNextPage" | "loadingAllPosts";
};

export default function PostsSkeleton({ loadingType }: PostsSkeletonProps) {
  return (
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
  );
}
