import { useMatchRoute } from "@tanstack/react-router";
import ActivityHeaderSkeleton from "./ActivityHeaderSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type CommentProps = {
  type: "comment";
};

type PostProps = {
  type: "post";
  withAttachment: boolean;
};

type Props = CommentProps | PostProps;

export default function ActivitySkeleton({ type, ...props }: Props) {
  const matchRoute = useMatchRoute();
  const isPostInfoPage = matchRoute({
    to: "/social/$userHandle/posts/$postId",
  });

  const postProps = type === "post" ? (props as PostProps) : undefined;

  return (
    <div
      className={cn("flex flex-col w-full gap-3", {
        "rounded-lg bg-socialPrimary px-3 py-4 sm:p-5": !isPostInfoPage,
      })}
    >
      <ActivityHeaderSkeleton />
      <div
        className={cn("flex flex-col gap-2", { "sm:pl-14": !isPostInfoPage })}
      >
        {postProps && postProps.withAttachment ? (
          <div className="flex flex-col gap-2">
            <div className="space-y-1">
              <Skeleton className="h-4 bg-gray-700 w-52 sm:h-5" />
            </div>
            <Skeleton className="w-full bg-gray-700 rounded-lg h-36 mobile-m:h-40 sm:h-44 md:h-48 xl:h-56" />
          </div>
        ) : (
          <Skeleton
            className={cn("w-56 h-4 bg-gray-700 sm:h-5", {
              "mt-2": type === "comment",
            })}
          />
        )}
        {postProps && <Skeleton className="w-32 h-4 bg-gray-700 sm:h-5" />}
      </div>
    </div>
  );
}
