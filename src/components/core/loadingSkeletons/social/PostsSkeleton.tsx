import ActivitySkeleton from "./ActivitySkeleton";

type Props = {
  loadingType: "fetchingNextPage" | "loadingAllPosts";
};

export default function PostsSkeleton({ loadingType }: Props) {
  return (
    <div className="flex flex-col w-full gap-3 pb-24">
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
