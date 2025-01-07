import ActivitySkeleton from "./ActivitySkeleton";

export default function PostCommentsSkeleton() {
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex flex-col gap-8 px-3 py-4 pt-2 sm:p-5">
        {Array.from({ length: 2 }).map((_, i) => (
          <ActivitySkeleton key={i} type="comment" />
        ))}
      </div>
    </div>
  );
}
